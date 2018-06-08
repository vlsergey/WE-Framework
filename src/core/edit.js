import * as ApiUtils from './ApiUtils';
import EditorApp from '../components/EditorApp';
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';

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
  } ).then( entity => {
    const appDiv = document.createElement( 'div' );
    document.body.appendChild( appDiv );

    ReactDOM.render( <EditorApp description={editorDescription} entity={entity} />, appDiv );    
  } ) ;
}
