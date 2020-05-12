// @flow

import { add } from './LruStore';
import AdditionalArgumentsDialog from './AdditionalArgumentsDialog';
import { getBody } from 'utils/DomUtils';
import React from 'react';
import ReactDOM from 'react-dom';
import registerTool from 'utils/registerTool';
import WikidataSourceDialog from './WikidataSourceDialog';

function showWikidataSourceDialog() {
  const body : HTMLBodyElement = getBody();

  /* eslint react/jsx-no-bind: 0 */
  const appDiv : HTMLDivElement = document.createElement( 'div' );
  body.appendChild( appDiv );

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode( appDiv );
    body.removeChild( appDiv );
  };

  const insert = ( entityId : string ) => {
    add( entityId );

    ReactDOM.unmountComponentAtNode( appDiv );
    body.removeChild( appDiv );
    showAdditionalArgumentsDialog( entityId );
  };

  ReactDOM.render( <WikidataSourceDialog
    onClose={handleClose}
    onInsert={insert} />, appDiv );
}

function showAdditionalArgumentsDialog( entityId : string ) {
  const body : HTMLBodyElement = getBody();

  /* eslint react/jsx-no-bind: 0 */
  const appDiv : HTMLDivElement = document.createElement( 'div' );
  body.appendChild( appDiv );

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode( appDiv );
    body.removeChild( appDiv );
  };

  const handleInsert = ( text : string ) => {
    ReactDOM.unmountComponentAtNode( appDiv );
    body.removeChild( appDiv );
    encapsulateSelection( text );
  };

  ReactDOM.render( <AdditionalArgumentsDialog
    entityId={entityId}
    onClose={handleClose}
    onInsert={handleInsert} />, appDiv );
}

function encapsulateSelection( textToInsert ) {
  $( '#wpTextbox1' ).textSelection( 'encapsulateSelection', {
    post: textToInsert,
  } );
}

export default function wikieditorIntegration() {

  if ( mw.config.get( 'wgDBname' ) === 'ruwiki' ) {
    registerTool( {
      name: 'addWikidataSourceRef',
      position: 200,
      title: 'Добавить источник с Викиданных',
      label: 'Найти (или создать) источник на Викиданных и вставить ссылку в статью',
      callback: showWikidataSourceDialog,
      classic: {
        icon: '//upload.wikimedia.org/wikipedia/commons/c/cf/Toolbar_insert_reference.png',
      },
      visual: {
        icon: '//upload.wikimedia.org/wikipedia/commons/b/b8/Bouton_Faut_sourcer.png',
        modes: [ 'source' ],
      },
    } );
  }


}
