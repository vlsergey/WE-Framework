// @flow

import i18n from './i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import SettingsDialog from './SettingsDialog';

export const { linkText } = i18n;
const { localStorage } = window;

const editors = [];

export function registerEditor( editorDescription : EditorDefType ) {
  editors.push( editorDescription );
}

export function getEnabledEditors() {
  return editors
    .filter( editor => !localStorage || !localStorage.getItem( 'WEF_DISABLED_EDITOR_' + editor.id ) );
}

export function start() {
  const appDiv = document.createElement( 'div' );
  document.body.appendChild( appDiv );

  /* eslint react/jsx-no-bind: 0 */
  const element = <SettingsDialog editors={editors} />;
  ReactDOM.render( element, appDiv );
}
