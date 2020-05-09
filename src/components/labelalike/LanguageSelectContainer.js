// @flow

import React, { PureComponent } from 'react';
import Controller from './Controller';
import i18n from 'components/core.i18n';
import LanguageSelect from './LanguageSelect';
import styles from 'components/core.css';

type StateType = {
  language : ?string,
};

export default class LanguageSelectContainer
  extends PureComponent<any, StateType> {

  constructor() {
    super( ...arguments );
    this.state = {
      language: mw.config.get( 'wgContentLanguage' ),
    };

    this.handleLanguageChange = this.handleLanguageChange.bind( this );
  }

  handleLanguageChange( langCode : string ) {
    this.setState( {
      language: langCode,
    } );
  }

  render() {
    const { language } = this.state;

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
