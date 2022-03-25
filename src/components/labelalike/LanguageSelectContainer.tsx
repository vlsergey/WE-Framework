import React, {PureComponent} from 'react';

import styles from '../core.css';
import i18n from '../core.i18n';
import Controller from './Controller';
import LanguageSelect from './LanguageSelect';

interface StateType {
  language: string;
}

export default class LanguageSelectContainer
  extends PureComponent<any, StateType> {

  override state : StateType = {
    language: mw.config.get('wgContentLanguage'),
  };

  handleLanguageChange = (langCode: string) => {
    this.setState({
      language: langCode,
    });
  };

  override render () {
    const {language} = this.state;

    return (
      <fieldset className={styles.wef_fieldset + ' ' + styles.wef_labels_description_area}>
        <legend>
          {i18n.labelLabels}
          {':\u00A0\u00A0\u00A0'}
          <LanguageSelect onChange={this.handleLanguageChange} value={language} />
        </legend>
        <Controller language={language} />
      </fieldset>
    );
  }

}
