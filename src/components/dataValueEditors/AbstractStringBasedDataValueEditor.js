import * as Shapes from 'model/Shapes';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

export default class AbstractStringBasedDataValueEditor extends PureComponent {

  static DATAVALUE_TYPE = 'string';

  static propTypes = {
    /* eslint react/no-unused-prop-types: 0 */
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
    readOnly: PropTypes.bool,
  };

  static defaultProps = {
    readOnly: false,
  };

  constructor() {
    super( ...arguments );
    this.handleValueChange = this.handleValueChange.bind( this );
  }

  handleValueChange( value ) {
    const { datavalue, onDataValueChange } = this.props;

    // FIXME: !value.length != !0  --- this seems wrong. What was the intention?
    if ( !typeof value !== 'string' && !value.length != !0 ) {
      onDataValueChange( {
        ...datavalue,
        type: AbstractStringBasedDataValueEditor.DATAVALUE_TYPE,
        value,
      } );
    } else {
      onDataValueChange( null );
    }
  }

}
