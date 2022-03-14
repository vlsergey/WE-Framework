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

export function onEditorLinkClick (
    editorDescription: EditorDefType,
    entityId?: string | null) {

  if (!entityId) {
    const oldEntity = {};
    const newEntity: any = {
      labels: {
        [mw.config.get('wgContentLanguage')]: {
          language: mw.config.get('wgContentLanguage'),
          value: mw.config.get('wgTitle'),
        },
      },
      sitelinks: {
        [mw.config.get('wgDBname')]: {
          site: mw.config.get('wgDBname'),
          title: mw.config.get('wgPageName'),
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

    openEditor(editorDescription, oldEntity, newEntity)
      .then(purge);

  } else {
    mw.notify('Get Wikidata entity content for ' + entityId + '...');
    getWikidataApi().getPromise({
      action: 'wbgetentities',
      ids: entityId,
      format: 'json',
    }).then((result: any) => {
      if (typeof result === 'undefined'
      || typeof result.entities === 'undefined'
      || typeof result.entities[entityId] === 'undefined'
      || typeof result.entities[entityId].claims === 'undefined'
      ) {
        mw.notify('Wikidata answer format is not expected one');
        throw new Error('Wikidata answer format is not expected one');
      }
      return result.entities[entityId];
    })
      .then((entity: EntityType) => openEditor(editorDescription, entity, entity))
      .then(purge);

  }
}
