import React, { PureComponent } from 'react';
import BoundariesValueEditor from './BoundariesValueEditor';
import { COLUMNS_FOR_DATA_VALUE_EDITOR } from 'components/TableColSpanConstants';
import { DataValue } from 'model/Shapes';
import ExactValueEditor from './ExactValueEditor';
import expect from 'expect';
import ModeSelect from './ModeSelect';
import PlusMinusValueEditor from './PlusMinusValueEditor';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './Quantity.css';
import UnitSelect from './UnitSelect';

interface Mode {
  +canBeUsedForValue : QuantityValueType => boolean,
}

export const MODES : {[string] : Mode} = {
  exact: ExactValueEditor,
  plusMinus: PlusMinusValueEditor,
  boundaries: BoundariesValueEditor,
};

function detectAppropriateMode( datavalue : DataValueType ) {
  if ( datavalue === undefined || datavalue === null
    || datavalue.value === undefined || datavalue.value === null ) {
    return 'exact';
  }

  const value : QuantityValueType = datavalue.value;
  return Object.keys( MODES ).find( mode => MODES[ mode ].canBeUsedForValue( value ) );
}

export default class QuantityDataValueEditor extends PureComponent {

  static propTypes = {
    datavalue: PropTypes.shape( DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
    readOnly: PropTypes.bool,
  };

  static defaultProps = {
    readOnly: false,
  };

  constructor() {
    super( ...arguments );

    this.state = {
      mode: detectAppropriateMode( this.props.datavalue ),
    };

    this.handleModeChange = this.handleModeChange.bind( this );
    this.handleValueChange = this.handleValueChange.bind( this );
  }

  handleModeChange( newMode ) {
    expect( newMode ).toBeA( 'string' );
    this.setState( {
      mode: newMode,
    } );
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
    const { datavalue, propertyDescription, readOnly } = this.props;
    const { mode } = this.state;

    const editor = MODES[ mode ];
    expect( editor ).toBeA( 'function' );

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

    expect( propertyDescription.quantityUnitEnabled ).toBeA( 'boolean' );

    const buttons = this.renderButtonCells();
    expect( buttons ).toBeAn( 'array' );

    return <React.Fragment>
      <td className={classNames.join( ' ' )} colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR - buttons.length}>
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
      { buttons }
    </React.Fragment>;
  }

  renderButtonCells() {
    return [];
  }

}
