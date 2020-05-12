// @flow

import type { EditorDefType } from 'editors/EditorDefModel';
import i18n from './i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import SettingsDialog from './SettingsDialog';

export const { linkText } = i18n;
const { localStorage } = window;

const editors : EditorDefType[] = [];

export function registerEditor( editorDescription : EditorDefType ) {
  editors.push( editorDescription );
}

export function getEnabledEditors() : EditorDefType[] {
  return editors
    .filter( editor => !localStorage || !localStorage.getItem( 'WEF_DISABLED_EDITOR_' + editor.id ) );
}

export function start() {
  const body : ?HTMLBodyElement = document.body;
  if ( !body ) {
    console.warn( 'body is missing in document' );
    return;
  }

  const appDiv : HTMLDivElement = document.createElement( 'div' );
  body.appendChild( appDiv );

  /* eslint react/jsx-no-bind: 0 */
  const element = <SettingsDialog editors={editors} />;
  ReactDOM.render( element, appDiv );
}
