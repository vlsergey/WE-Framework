// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import i18n from './i18n';
import { MODES } from './QuantityDataValueEditor';
import type { ModeType } from './ModeType';
import styles from './ModeSelect.css';

type PropsType = {
  mode : ModeType,
  onSelect : ModeType => any,
  value? : ?QuantityValueType,
};

export default class ModeSelect extends PureComponent<PropsType> {

  @boundMethod
  handleModeChange( { target: { value } } : { target : { value : ModeType } } ) {
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
