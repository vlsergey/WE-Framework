import * as Shapes from 'model/Shapes';
import React, { PureComponent } from 'react';
import LanguageAutocomplete from 'components/languages/LanguageAutocomplete';
import PropTypes from 'prop-types';
import styles from './MonolingualText.css';

export default class MonolingualTextDataValueEditor extends PureComponent {

  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
  }

  constructor() {
    super( ...arguments );

    this.handleLanguageChange = this.handleLanguageChange.bind( this );
    this.handleTextChange = this.handleTextChange.bind( this );
  }

  handleLanguageChange( value ) {
    const { datavalue, onDataValueChange } = this.props;

    onDataValueChange( {
      ...datavalue,
      value: {
        ...datavalue ? datavalue.value : undefined,
        language: value,
      },
      type: 'monolingualtext',
    } );
  }

  handleTextChange( event ) {
    const { datavalue, onDataValueChange } = this.props;

    onDataValueChange( {
      ...datavalue,
      value: {
        // set language of current content language if no specified yet AND some text entered
        language: event.target.value.trim() !== '' ? mw.config.get( 'wgContentLanguage' ) : undefined,
        ...datavalue ? datavalue.value : undefined,
        text: event.target.value,
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
      } else {
        return null;
      }
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
