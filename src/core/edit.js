import * as ApiUtils from './ApiUtils';
// import { applyMiddleware, createStore } from 'redux';
import buildReducers from './reducers';
import { createStore } from 'redux';
import EditorApp from '../components/EditorApp';
import expect from 'expect';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

// const actionLogger = store => next => action => {
//   console.log( 'dispatching', action );
//   const result = next( action );
//   console.log( 'next state', store.getState() );
//   return result;
// };

function onClose( appDiv ) {
  ReactDOM.unmountComponentAtNode( appDiv );
  document.body.removeChild( appDiv );
}

export function openEditor( editorDescription, entity ) {
  expect( editorDescription ).toBeAn( 'object' );
  expect( entity ).toBeAn( 'object' );
  expect( entity.id ).toBeA( 'string' );

  const appDiv = document.createElement( 'div' );
  document.body.appendChild( appDiv );

  const reducers = buildReducers( entity );
  // const store = createStore( reducers, applyMiddleware( actionLogger ) );
  const store = createStore( reducers );

  ReactDOM.render( <Provider store={store}>
    <EditorApp description={editorDescription} entity={entity} onClose={ () => onClose( appDiv ) } />
  </Provider>, appDiv );
}

export function onEditorLinkClick( editorDescription, entityId ) {
  expect ( editorDescription ).toBeAn( 'object' );
  expect ( entityId ).toBeA( 'string' );

  mw.notify( 'Get Wikidata entity content for ' + entityId + '...' );
  ApiUtils.getWikidataApi().get( {
    action: 'wbgetentities',
    ids: entityId,
    format: 'json'
  } ).then( ( result ) => {
    if ( typeof result === 'undefined'
      || typeof result.entities === 'undefined'
      || typeof result.entities[ entityId ] === 'undefined'
      || typeof result.entities[ entityId ].claims === 'undefined'
    ) {
      mw.notify( 'Wikidata answer format is not expected one' );
      throw new Error( 'Wikidata answer format is not expected one' );
    }
    return result.entities[ entityId ];
  } ).then( entity => openEditor( editorDescription, entity ) ) ;
}
