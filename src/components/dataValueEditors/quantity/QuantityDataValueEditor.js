import React, { PureComponent } from 'react';
import BoundariesValueEditor from './BoundariesValueEditor';
import { DataValue } from 'model/Shapes';
import EntityLabel from 'caches/EntityLabel';
import ExactValueEditor from './ExactValueEditor';
import expect from 'expect';
import ModeSelect from './ModeSelect';
import PlusMinusValueEditor from './PlusMinusValueEditor';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './Quantity.css';

export const MODES = {
  exact: ExactValueEditor,
  plusMinus: PlusMinusValueEditor,
  boundaries: BoundariesValueEditor,
};

function detectAppropriateMode( datavalue ) {
  if ( datavalue === undefined || datavalue === null
    || datavalue.value === undefined || datavalue.value === null ) {
    return 'exact';
  }

  const value = datavalue.value;
  return Object.keys( MODES ).find( mode => MODES[ mode ].canBeUsedForValue( value ) );
}

export default class QuantityDataValueEditor extends PureComponent {

  static propTypes = {
    datavalue: PropTypes.shape( DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    readOnly: false,
  }

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

    const classNames = [ styles[ 'wef_datavalue_quantity' ] ];
    if ( readOnly ) classNames.push( styles[ 'wef_datavalue_quantity_readonly' ] );

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
            <EntityLabel
              entityId={unit.substr( 'http://www.wikidata.org/entity/'.length )} />
          </a>
        </td>
      </React.Fragment>;
    }

    expect( propertyDescription.quantityUnitEnabled ).toBeA( 'boolean' );

    return <td className={classNames.join( ' ' )} colSpan={12}>
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
          </tr>
          { propertyDescription.quantityUnitEnabled && <td className={styles.unitselect} /> }
        </tbody>
      </table>
    </td>;
  }
}
