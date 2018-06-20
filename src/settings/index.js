import DialogWrapper from 'wrappers/DialogWrapper';
import expect from 'expect';
import i18n from './i18n';
import React from 'react';
import ReactDOM from 'react-dom';

export const { linkTitle } = i18n;

const editors = [];

export function registerEditor( editorDescription ) {
  expect( editorDescription ).toBeAn( 'object' );
  expect( editorDescription.linkTitle ).toBeA( 'string' );
  expect( editorDescription.title ).toBeA( 'string' );
  expect( editorDescription.tabs ).toBeAn( 'array' );

  editors.push( editorDescription );
}

export function getEnabledEditors() {
  return editors;
}

export function start() {
  const appDiv = document.createElement( 'div' );
  document.body.appendChild( appDiv );

  /* eslint react/jsx-no-bind: 0 */
  const element = <DialogWrapper onClose={ () => console.log( 'Dialog was closed' ) } title={i18n.windowTitle}>
    <p>Settings here</p>
  </DialogWrapper>;
  ReactDOM.render( element, appDiv );
}
