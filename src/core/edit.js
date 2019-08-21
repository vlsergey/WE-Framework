import { applyMiddleware, createStore } from 'redux';
import { getWikidataApi, purge } from './ApiUtils';
import buildReducers from './reducers';
import EditorApp from 'components/EditorApp';
import expect from 'expect';
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

export function renderEditor( resolve, reject, editorDescription, oldEntity, newEntity ) {
  expect( editorDescription ).toBeAn( 'object' );
  expect( oldEntity ).toBeAn( 'object' );
  expect( newEntity ).toBeAn( 'object' );

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

export function openEditor( editorDescription, oldEntity, newEntity ) {
  expect( editorDescription ).toBeAn( 'object' );
  expect( oldEntity ).toBeAn( 'object' );
  expect( newEntity ).toBeAn( 'object' );

  let appDiv;
  return new Promise( ( resolve, reject ) => {
    appDiv = renderEditor( resolve, reject, editorDescription, oldEntity, newEntity );
  } )
    .then( entityId => {
      if ( appDiv ) destroyEditor( appDiv );
      return entityId;
    } )
    .catch( reason => {
      mw.log.warn( reason );
      if ( appDiv ) destroyEditor( appDiv );
      return Promise.reject( reason );
    } );
}

export function onNewElementClick( editorDescription, classEntityId ) {
  expect( editorDescription ).toBeAn( 'object' );
  expect( classEntityId ).toBeAn( 'string' );

  const oldEntity = {};
  const newEntity = {};

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

export function onEditorLinkClick( editorDescription, entityId ) {
  expect( editorDescription ).toBeAn( 'object' );

  if ( typeof entityId !== 'string' ) {

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
    expect( entityId ).toBeA( 'string' );

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
