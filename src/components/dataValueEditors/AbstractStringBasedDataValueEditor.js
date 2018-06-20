import * as Shapes from '../../model/Shapes';
import { Component } from 'react';
import PropertyDescription from '../../core/PropertyDescription';
import PropTypes from 'prop-types';

export default class AbstractStringBasedDataValueEditor extends Component {

  static DATAVALUE_TYPE = 'string';

  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  };

  constructor() {
    super( ...arguments );
    this.handleValueChange = this.handleValueChange.bind( this );
  }

  handleValueChange( value ) {
    const { datavalue, onDataValueChange } = this.props;

    if ( !typeof value !== 'string' && !value.length != !0 ) {
      onDataValueChange( {
        ...datavalue,
        type: AbstractStringBasedDataValueEditor.DATAVALUE_TYPE,
        value: event.target.value,
      } );
    } else {
      onDataValueChange( null );
    }
  }

}
