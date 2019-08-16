import React, { PureComponent } from 'react';
import expect from 'expect';
import i18n from './i18n';
import { MODES } from './QuantityDataValueEditor';
import PropTypes from 'prop-types';
import styles from './ModeSelect.css';

export default class ModeSelect extends PureComponent {

  static propTypes = {
    mode: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.object,
  };

  constructor() {
    super( ...arguments );

    this.handleModeChange = this.handleModeChange.bind( this );
  }

  handleModeChange( event ) {
    const newMode = event.target.value;
    expect( newMode ).toBeA( 'string' );
    this.props.onSelect( newMode );
  }

  render() {
    const { mode, value } = this.props;

    return <select onChange={this.handleModeChange} value={mode}>
      {Object.keys( MODES ).map( m => {
        const compatible = MODES[ m ].canBeUsedForValue( value );
        return <option
          className={compatible ? styles.compatible : styles.incompatible}
          disabled={!compatible}
          key={m}
          title={!compatible ? 'not compatble with current values' : ''}
          value={m}>
          {i18n.modes[ m ]}
        </option>;
      } )}
    </select>;
  }

}
