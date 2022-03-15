import React, {ComponentType, PureComponent} from 'react';

import PropertyDescription from '../../../core/PropertyDescription';
import {COLUMNS_FOR_DATA_VALUE_EDITOR} from '../../TableColSpanConstants';
import BoundariesValueEditor from './BoundariesValueEditor';
import ExactValueEditor from './ExactValueEditor';
import ModeSelect from './ModeSelect';
import {ModeType} from './ModeType';
import PlusMinusValueEditor from './PlusMinusValueEditor';
import styles from './Quantity.css';
import UnitSelect from './UnitSelect';

interface Mode {
  canBeUsedForValue: (value: QuantityValue) => boolean;
  component: ComponentType< any >;
}

const DEFAULT_MODE: ModeType = 'exact';

export const MODES: Record<ModeType, Mode> = {
  exact: {component: ExactValueEditor, canBeUsedForValue: ExactValueEditor.canBeUsedForValue},
  plusMinus: {component: PlusMinusValueEditor, canBeUsedForValue: PlusMinusValueEditor.canBeUsedForValue},
  boundaries: {component: BoundariesValueEditor, canBeUsedForValue: BoundariesValueEditor.canBeUsedForValue},
};

function detectAppropriateMode (datavalue: DataValueType | null): ModeType {
  if (datavalue === undefined || datavalue === null
    || datavalue.value === undefined || datavalue.value === null) {
    return DEFAULT_MODE;
  }

  const value: QuantityValue = datavalue.value;
  return Object.entries(MODES)
    .find(([_key, mode]) => mode.canBeUsedForValue(value))?.[0] as ModeType || DEFAULT_MODE;
}

interface PropsType {
  buttonCells: any[];
  datavalue: DataValueType | null;
  onDataValueChange: (datavalue: DataValueType | null) => any;
  propertyDescription: PropertyDescription;
  readOnly: boolean;
}

interface StateType {
  mode: ModeType;
}

export default class QuantityDataValueEditor extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
    buttonCells: [],
  };

  constructor (props: PropsType) {
    super(props);

    this.state = {
      mode: detectAppropriateMode(this.props.datavalue),
    };
  }

  handleModeChange = (mode: ModeType) => { this.setState({mode}); };

  handleValueChange = (value: QuantityValue) => {
    this.props.onDataValueChange({
      ...this.props.datavalue,
      type: 'quantity',
      value: {
        ...value,
        unit: value && value.unit ? value.unit : '1',
      },
    });
  };

  override render () {
    const {datavalue, propertyDescription, readOnly, buttonCells} = this.props;
    const {mode} = this.state;

    const editor = MODES[mode].component;

    const value = (datavalue || {}).value || {};
    const unit = value.unit || '1';

    const classNames = [styles.wef_datavalue_quantity];

    if (readOnly) {
      return <React.Fragment>
        <td className={classNames.join(' ')} colSpan={12}>
          {React.createElement(editor, {
            onValueChange: this.handleValueChange,
            readOnly: true,
            value,
          })}
          <a
            href={unit}
            rel="noopener noreferrer"
            target="_blank">
            <UnitSelect
              propertyDescription={propertyDescription}
              readOnly
              value={value} />
          </a>
        </td>
      </React.Fragment>;
    }

    return <React.Fragment>
      <td className={classNames.join(' ')} colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR - buttonCells.length}>
        <table>
          <tbody>
            <tr>
              <td className={styles.modeselect}>
                <ModeSelect mode={mode} onSelect={this.handleModeChange} value={value} />
              </td>
              {React.createElement(editor, {
                onValueChange: this.handleValueChange,
                value,
              })}
              { propertyDescription.quantityUnitEnabled
                && <td className={styles.unitselect}>
                  <UnitSelect
                    onValueChange={this.handleValueChange}
                    propertyDescription={propertyDescription}
                    value={value} />
                </td>
              }
            </tr>
          </tbody>
        </table>
      </td>
      { buttonCells }
    </React.Fragment>;
  }

}
