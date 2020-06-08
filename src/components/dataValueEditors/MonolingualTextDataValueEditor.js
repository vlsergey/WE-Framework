// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import LanguageAutocomplete from 'components/languages/LanguageAutocomplete';
import styles from './MonolingualText.css';

type PropsType = {
  datavalue? : DataValueType,
  onDataValueChange : ?DataValueType => any,
  readOnly? : boolean,
};

export default class MonolingualTextDataValueEditor
  extends PureComponent<PropsType> {

  @boundMethod
  handleLanguageChange( value : string ) {
    const { datavalue, onDataValueChange } = this.props;

    return onDataValueChange( {
      ...datavalue,
      value: {
        ...datavalue ? datavalue.value : undefined,
        language: value,
      },
      type: 'monolingualtext',
    } );
  }

  @boundMethod
  handleTextChange( { currentTarget: { value } } : SyntheticEvent< HTMLInputElement > ) {
    const { datavalue, onDataValueChange } = this.props;

    return onDataValueChange( {
      ...datavalue,
      value: {
        // set language of current content language if no specified yet AND some text entered
        language: value ? mw.config.get( 'wgContentLanguage' ) : undefined,
        ...datavalue ? datavalue.value : undefined,
        text: value,
      },
      type: 'monolingualtext',
    } );
  }

  render() {
    const { datavalue, readOnly } = this.props;
    const language = datavalue && datavalue.value && datavalue.value.language ? datavalue.value.language : '';
    const text = datavalue && datavalue.value && datavalue.value.text ? datavalue.value.text : '';

    if ( readOnly ) {
      if ( language ) {
        return <td colSpan={12}>
          <span>{language}: {text}</span>
        </td>;
      }
      return null;

    }

    return <td className={styles.wef_monolingualtext} colSpan={12}>
      <table>
        <tbody>
          <tr>
            <td className={styles.wef_monolingualtext_language}>
              <LanguageAutocomplete onChange={this.handleLanguageChange} provided={[]} value={language} />
            </td>
            <td className={styles.wef_monolingualtext_text}>
              <input onChange={this.handleTextChange} value={text} />
            </td>
          </tr>
        </tbody>
      </table>
    </td>;
  }

}
