import React, {ChangeEvent, PureComponent} from 'react';

import i18n from './i18n';
import styles from './ModeSelect.css';
import {ModeType} from './ModeType';
import {MODES} from './QuantityDataValueEditor';

interface PropsType {
  mode: ModeType;
  onSelect: (mode: ModeType) => any;
  value: null | QuantityValue;
}

export default class ModeSelect extends PureComponent<PropsType> {

  handleModeChange ({target: {value}}: ChangeEvent<HTMLSelectElement>) {
    this.props.onSelect(value as ModeType);
  }

  override render () {
    const {mode, value} = this.props;

    return <select onChange={this.handleModeChange} value={mode}>
      {Object.entries(MODES).map(([m, modeDef]) => {
        const compatible = !!value && modeDef.canBeUsedForValue(value);
        return <option
          className={compatible ? styles.compatible : styles.incompatible}
          disabled={!compatible}
          key={m}
          title={!compatible ? 'not compatble with current values' : ''}
          value={m}>
          {i18n.modes[m]}
        </option>;
      })}
    </select>;
  }

}
