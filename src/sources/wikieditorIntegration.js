import { add } from './LruStore';
import AdditionalArgumentsDialog from './AdditionalArgumentsDialog';
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import registerTool from 'utils/registerTool';
import WikidataSourceDialog from './WikidataSourceDialog';

function showWikidataSourceDialog() {
  /* eslint react/jsx-no-bind: 0 */
  const appDiv = document.createElement( 'div' );
  document.body.appendChild( appDiv );

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode( appDiv );
    document.body.removeChild( appDiv );
  };

  const insert = entityId => {
    expect( entityId ).toBeA( 'string' );
    add( entityId );

    ReactDOM.unmountComponentAtNode( appDiv );
    document.body.removeChild( appDiv );
    showAdditionalArgumentsDialog( entityId );
  };

  ReactDOM.render( <WikidataSourceDialog
    onClose={handleClose}
    onInsert={insert} />, appDiv );
}

function showAdditionalArgumentsDialog( entityId ) {
  /* eslint react/jsx-no-bind: 0 */
  const appDiv = document.createElement( 'div' );
  document.body.appendChild( appDiv );

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode( appDiv );
    document.body.removeChild( appDiv );
  };

  const handleInsert = text => {
    expect( text ).toBeA( 'string' );
    ReactDOM.unmountComponentAtNode( appDiv );
    document.body.removeChild( appDiv );
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
