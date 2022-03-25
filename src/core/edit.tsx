import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import EditorApp from '../components/EditorApp';
import {EditorDefType} from '../editors/EditorDefModel';
import {toWikibaseEntityIdValue} from '../model/ModelUtils';
import {getBody} from '../utils/DomUtils';
import generateRandomString from '../utils/generateRandomString';
import reduxPerformanceMark from '../utils/reduxPerformanceMark';
import {getWikidataApi, purge} from './ApiUtils';
import buildReducers from './reducers';

export function destroyEditor (appDiv: HTMLDivElement) {
  ReactDOM.unmountComponentAtNode(appDiv);
  getBody().removeChild(appDiv);
}

export function renderEditor (
    resolve: (entityId: string) => any,
    reject: (reason: string) => any,
    editorDescription: EditorDefType,
    oldEntity: EntityType,
    newEntity: EntityType): HTMLDivElement {
  const appDiv = document.createElement('div');
  getBody().appendChild(appDiv);

  const reducers = buildReducers(oldEntity, newEntity);
  const store = createStore(reducers, applyMiddleware(reduxPerformanceMark, thunk));

  ReactDOM.render(<Provider store={store}>
    <EditorApp
      description={editorDescription}
      reject={reject}
      resolve={resolve} />
  </Provider>, appDiv);

  return appDiv;
}

export async function openEditor (
    editorDescription: EditorDefType,
    oldEntity: EntityType,
    newEntity: EntityType
): Promise< string > {
  let appDiv: HTMLDivElement | null = null;
  try {
    const entityId = await new Promise<string>((resolve, reject) => {
      appDiv = renderEditor(resolve, reject, editorDescription, oldEntity, newEntity);
    });
    if (appDiv)
      destroyEditor(appDiv);
    return entityId;
  } catch (reason) {
    mw.log.warn(reason);
    if (appDiv)
      destroyEditor(appDiv);
    return await Promise.reject(reason);
  }
}

export function onNewElementClick (
    editorDescription: EditorDefType,
    classEntityId: string | null | undefined): Promise< string > {
  const oldEntity: EntityType = {};
  const newEntity: EntityType = {};

  if (classEntityId) {
    newEntity.claims = {
      P31: [{
        mainsnak: {
          snaktype: 'value',
          property: 'P31',
          hash: generateRandomString(),
          datavalue: {
            value: toWikibaseEntityIdValue(classEntityId),
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      }],
    };
  }

  return openEditor(editorDescription, oldEntity, newEntity);
}

export async function onEditorLinkClick (
    editorDescription: EditorDefType,
    entityId?: string | null) {

  if (!entityId) {
    const wgContentLanguage = mw.config.get('wgContentLanguage');
    const wgDBname = mw.config.get('wgDBname');
    const wgTitle = mw.config.get('wgTitle');
    const wgPageName = mw.config.get('wgPageName');

    const oldEntity = {};
    const newEntity: EntityType = {
      labels: {
        [wgContentLanguage]: {
          language: wgContentLanguage,
          value: wgTitle,
        },
      },
      sitelinks: {
        [wgDBname]: {
          site: wgDBname,
          title: wgPageName,
          badges: [],
        },
      },
      type: 'item',
    };

    const instanceOf = editorDescription.newEntityInstanceOf;
    if (instanceOf) {
      newEntity.claims = {
        P31: [{
          mainsnak: {
            snaktype: 'value',
            property: 'P31',
            hash: generateRandomString(),
            datavalue: {
              value: toWikibaseEntityIdValue(instanceOf),
              type: 'wikibase-entityid',
            },
            datatype: 'wikibase-item',
          },
          type: 'statement',
          id: generateRandomString(),
          rank: 'normal',
        }],
      };
    }

    await openEditor(editorDescription, oldEntity, newEntity);
    await purge();

  } else {
    mw.notify('Get Wikidata entity content for ' + entityId + '...');
    const result = await getWikidataApi().getPromise<WbGetEntitiesActionResult>({
      action: 'wbgetentities',
      ids: entityId,
      format: 'json',
    });

    const entity = result?.entities[entityId];
    if (!entity?.claims) {
      mw.notify('Wikidata answer format is not expected one');
      throw new Error('Wikidata answer format is not expected one');
    }
    await openEditor(editorDescription, entity, entity);
    await purge();
  }
}
