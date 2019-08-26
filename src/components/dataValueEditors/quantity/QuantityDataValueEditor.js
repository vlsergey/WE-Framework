import React, { PureComponent } from 'react';
import BoundariesValueEditor from './BoundariesValueEditor';
import { COLUMNS_FOR_DATA_VALUE_EDITOR } from 'components/TableColSpanConstants';
import ExactValueEditor from './ExactValueEditor';
import ModeSelect from './ModeSelect';
import PlusMinusValueEditor from './PlusMinusValueEditor';
import PropertyDescription from 'core/PropertyDescription';
import styles from './Quantity.css';
import UnitSelect from './UnitSelect';

type Mode = {
  canBeUsedForValue : QuantityValueType => boolean,
  component : Class< PureComponent< any, any > >,
};

const DEFAULT_MODE : string = 'exact';

export const MODES : { [string] : Mode } = {
  exact: { component: ExactValueEditor, canBeUsedForValue: ExactValueEditor.canBeUsedForValue },
  plusMinus: { component: PlusMinusValueEditor, canBeUsedForValue: PlusMinusValueEditor.canBeUsedForValue },
  boundaries: { component: BoundariesValueEditor, canBeUsedForValue: BoundariesValueEditor.canBeUsedForValue },
};

function detectAppropriateMode( datavalue : DataValueType ) : string {
  if ( datavalue === undefined || datavalue === null
    || datavalue.value === undefined || datavalue.value === null ) {
    return DEFAULT_MODE;
  }

  const value : QuantityValueType = datavalue.value;
  return Object.keys( MODES ).find( modeKey => MODES[ modeKey ].canBeUsedForValue( value ) ) || DEFAULT_MODE;
}

type PropsType = {
  buttonCells? : any[],
  datavalue : DataValueType,
  onDataValueChange : any => any,
  propertyDescription? : ?PropertyDescription,
  readOnly? : ?boolean,
};

type StateType = {
  mode : string,
};

export default class QuantityDataValueEditor extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
    buttonCells: [],
  };

  constructor() {
    super( ...arguments );

    this.state = {
      mode: detectAppropriateMode( this.props.datavalue ),
    };

    this.handleModeChange = this.handleModeChange.bind( this );
    this.handleValueChange = this.handleValueChange.bind( this );
  }

  handleModeChange( mode : string ) {
    this.setState( { mode } );
  }

  handleValueChange( value ) {
    this.props.onDataValueChange( {
      ...this.props.datavalue,
      type: 'quantity',
      value: {
        ...value,
        unit: value && value.unit ? value.unit : '1',
      },
    } );
  }

  render() {
    const { datavalue, propertyDescription, readOnly, buttonCells } = this.props;
    const { mode } = this.state;

    const editor : Class< PureComponent< any, any > > = MODES[ mode ].component;

    const value = ( datavalue || {} ).value || {};
    const unit = value.unit || '1';

    const classNames = [ styles.wef_datavalue_quantity ];
    if ( readOnly ) classNames.push( styles.wef_datavalue_quantity_readonly );

    if ( readOnly ) {
      return <React.Fragment>
        <td className={classNames.join( ' ' )} colSpan={12}>
          {React.createElement( editor, {
            onValueChange: this.handleValueChange,
            readOnly: true,
            value,
          } )}
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
      <td className={classNames.join( ' ' )} colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR - buttonCells.length}>
        <table>
          <tbody>
            <tr>
              <td className={styles.modeselect}>
                <ModeSelect mode={mode} onSelect={this.handleModeChange} value={value} />
              </td>
              {React.createElement( editor, {
                onValueChange: this.handleValueChange,
                value,
              } )}
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
