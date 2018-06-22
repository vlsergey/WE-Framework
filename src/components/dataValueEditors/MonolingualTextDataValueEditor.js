import * as Shapes from 'model/Shapes';
import React, { Component } from 'react';
import LanguageAutocomplete from 'components/languages/LanguageAutocomplete';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './MonolingualText.css';

export default class MonolingualTextDataValueEditor extends Component {

  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
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
        ...datavalue.value,
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
        ...datavalue.value,
        text: event.target.value,
      },
      type: 'monolingualtext',
    } );
  }

  render() {
    const { datavalue } = this.props;

    const language = datavalue && datavalue.value && datavalue.value.language ? datavalue.value.language : '';
    const text = datavalue && datavalue.value && datavalue.value.text ? datavalue.value.text : '';

    return <td className={styles.wef_monolingualtext} colSpan={12}>
      <table>
        <tbody>
          <tr>
            <td className={styles.wef_monolingualtext_language}>
              <LanguageAutocomplete onChange={this.handleLanguageChange} provided={[]} value={language} />
            </td>
            <td className={styles.wef_monolingualtext_text}>
              <input nChange={this.handleTextChange} value={text} />
            </td>
          </tr>
        </tbody>
      </table>
    </td>;
  }

}
