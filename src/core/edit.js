import EditorApp from '../components/EditorApp';
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';

export function onEditorLinkClick( editorDescription ) {
  expect ( editorDescription ).toBeAn( 'object' );

  const appDiv = document.createElement( 'div' );
  document.body.appendChild( appDiv );

  ReactDOM.render( <EditorApp description={editorDescription} />, appDiv );
}
