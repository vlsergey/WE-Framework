import * as ApiUtils from './ApiUtils';
import { applyMiddleware, createStore } from 'redux';
import buildReducers from './reducers';
import EditorApp from 'components/EditorApp';
import expect from 'expect';
import generateRandomString from 'utils/generateRandomString';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
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
  const store = createStore( reducers, applyMiddleware( thunk ) );

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
  let appDiv;
  return new Promise( ( resolve, reject ) => {
    appDiv = renderEditor( resolve, reject, editorDescription, oldEntity, newEntity );
  } )
    .then( () => {
      if ( appDiv ) destroyEditor( appDiv );
    } )
    .catch( reason => {
      mw.log( reason );
      if ( appDiv ) destroyEditor( appDiv );
      return Promise.reject( reason );
    } );
}

export function onEditorLinkClick( editorDescription, entityId ) {
  expect ( editorDescription ).toBeAn( 'object' );

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

    if ( editorDescription.newEntityInstanceOf ) {
      newEntity.claims = {
        P31: [ {
          mainsnak: {
            snaktype: 'value',
            property: 'P31',
            hash: generateRandomString(),
            datavalue: {
              value: {
                'entity-type': 'item',
                'numeric-id': editorDescription.newEntityInstanceOf.substr( 1 ),
                'id': editorDescription.newEntityInstanceOf,
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
      .then( ApiUtils.purge );

  } else {
    expect ( entityId ).toBeA( 'string' );

    mw.notify( 'Get Wikidata entity content for ' + entityId + '...' );
    ApiUtils.getWikidataApi().getPromise( {
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
      .then( ApiUtils.purge );

  }
}
