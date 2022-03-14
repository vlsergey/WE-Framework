import React, { PureComponent } from 'react';
import DialogWrapper from '../wrappers/DialogWrapper';
import type { EditorDefType } from '../editors/EditorDefModel';
import i18n from './i18n';
import styles from './SettingsDialog.css';

const { localStorage } = window;

type PropsType = {
  editors : EditorDefType[],
};

export default class SettingsDialog extends PureComponent<PropsType> {

  handleTrigger( editor : EditorDefType ) {
    return () => {
      const key = 'WEF_DISABLED_EDITOR_' + editor.id;
      const value = !!localStorage.getItem( key );

      if ( value ) {
        localStorage.removeItem( key );
      } else {
        localStorage.setItem( key, '1' );
      }
    };
  }

  override render() {
    return <DialogWrapper
      minWidth={600}
      title={i18n.dialogTitle}>
      <p>{i18n.fieldSetEditors}</p>
      <ul>
        { this.props.editors.map( editor => {
          let input;
          if ( !localStorage ) {
            input = <input checked disabled type="checkbox" />;
          } else {
            const key = 'WEF_DISABLED_EDITOR_' + editor.id;
            const value = !localStorage.getItem( key );

            input = <input
              defaultChecked={value}
              onChange={this.handleTrigger( editor )}
              type="checkbox" />;
          }

          return <li className={styles.editorItem} key={editor.id}>
            <label>
              {input}
              <b>{editor.linkText}</b>
              {editor.description && ': ' + editor.description}
            </label>
          </li>;
        } ) }
      </ul>
    </DialogWrapper>;
  }

}
