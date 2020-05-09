// @flow

import React, { PureComponent } from 'react';
import i18n from './i18n';
import { MODES } from './QuantityDataValueEditor';
import styles from './ModeSelect.css';

type PropsType = {
  mode : string,
  onSelect : string => any,
  value? : ?QuantityValueType,
};

export default class ModeSelect extends PureComponent<PropsType> {

  constructor() {
    super( ...arguments );

    this.handleModeChange = this.handleModeChange.bind( this );
  }

  handleModeChange( { target: { value } } : { target : { value : string } } ) {
    this.props.onSelect( value );
  }

  render() {
    const { mode, value } = this.props;

    return <select onChange={this.handleModeChange} value={mode}>
      {Object.keys( MODES ).map( m => {
        const compatible = !!value && MODES[ m ].canBeUsedForValue( value );
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
