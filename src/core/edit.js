// @flow

import { applyMiddleware, createStore } from 'redux';
import { getWikidataApi, purge } from './ApiUtils';
import buildReducers from './reducers';
import EditorApp from 'components/EditorApp';
import generateRandomString from 'utils/generateRandomString';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import reduxPerformanceMark from 'utils/reduxPerformanceMark';
import thunk from 'redux-thunk';

export function destroyEditor( appDiv ) {
  ReactDOM.unmountComponentAtNode( appDiv );
  document.body.removeChild( appDiv );
}

export function renderEditor(
    resolve : string => any,
    reject : string => any,
    editorDescription : EditorDefType,
    oldEntity : EntityType,
    newEntity : EntityType ) {
  const appDiv = document.createElement( 'div' );
  document.body.appendChild( appDiv );

  const reducers = buildReducers( oldEntity, newEntity );
  const store = createStore( reducers, applyMiddleware( reduxPerformanceMark, thunk ) );

  ReactDOM.render( <Provider store={store}>
    <EditorApp
      description={editorDescription}
      entity={newEntity}
      reject={reject}
      resolve={resolve} />
  </Provider>, appDiv );

  return appDiv;
}

export function openEditor(
    editorDescription : EditorDefType,
    oldEntity : EntityType,
    newEntity : EntityType
) : Promise< string > {
  let appDiv;
  return new Promise( ( resolve, reject ) => {
    appDiv = renderEditor( resolve, reject, editorDescription, oldEntity, newEntity );
  } )
    .then( ( entityId : string ) => {
      if ( appDiv ) destroyEditor( appDiv );
      return entityId;
    } )
    .catch( ( reason : any ) => {
      mw.log.warn( reason );
      if ( appDiv ) destroyEditor( appDiv );
      return Promise.reject( reason );
    } );
}

export function onNewElementClick(
    editorDescription : EditorDefType,
    classEntityId : ?string ) : Promise< string > {
  const oldEntity : EntityType = {};
  const newEntity : EntityType = {};

  if ( classEntityId ) {
    newEntity.claims = {
      P31: [ {
        mainsnak: {
          snaktype: 'value',
          property: 'P31',
          hash: generateRandomString(),
          datavalue: {
            value: {
              'entity-type': 'item',
              'numeric-id': classEntityId.substr( 1 ),
              'id': classEntityId,
            },
            type: 'wikibase-entityid',
          },
          datatype: 'wikibase-item',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      } ],
    };
  }

  return openEditor( editorDescription, oldEntity, newEntity );
}

export function onEditorLinkClick(
    editorDescription : EditorDefType,
    entityId : ?string ) {

  if ( !entityId ) {
    const oldEntity = {};
    const newEntity = {
      labels: {
        [ mw.config.get( 'wgContentLanguage' ) ]: {
          language: mw.config.get( 'wgContentLanguage' ),
          value: mw.config.get( 'wgTitle' ),
        },
      },
      sitelinks: {
        [ mw.config.get( 'wgDBname' ) ]: {
          site: mw.config.get( 'wgDBname' ),
          title: mw.config.get( 'wgPageName' ),
          badges: [],
        },
      },
    };

    const instanceOf = editorDescription.newEntityInstanceOf;
    if ( instanceOf ) {
      newEntity.claims = {
        P31: [ {
          mainsnak: {
            snaktype: 'value',
            property: 'P31',
            hash: generateRandomString(),
            datavalue: {
              value: {
                'entity-type': 'item',
                'numeric-id': instanceOf.substr( 1 ),
                'id': instanceOf,
              },
              type: 'wikibase-entityid',
            },
            datatype: 'wikibase-item',
          },
          type: 'statement',
          id: generateRandomString(),
          rank: 'normal',
        } ],
      };
    }

    openEditor( editorDescription, oldEntity, newEntity )
      .then( purge );

  } else {
    mw.notify( 'Get Wikidata entity content for ' + entityId + '...' );
    getWikidataApi().getPromise( {
      action: 'wbgetentities',
      ids: entityId,
      format: 'json',
    } ).then( result => {
      if ( typeof result === 'undefined'
      || typeof result.entities === 'undefined'
      || typeof result.entities[ entityId ] === 'undefined'
      || typeof result.entities[ entityId ].claims === 'undefined'
      ) {
        mw.notify( 'Wikidata answer format is not expected one' );
        throw new Error( 'Wikidata answer format is not expected one' );
      }
      return result.entities[ entityId ];
    } )
      .then( entity => openEditor( editorDescription, entity, entity ) )
      .then( purge );

  }
}
