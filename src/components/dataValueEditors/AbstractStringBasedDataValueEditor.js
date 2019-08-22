import PropertyDescription from 'core/PropertyDescription';
import { PureComponent } from 'react';

/* eslint react/no-unused-prop-types : 0 */
type PropsType = {
  datavalue? : DataValueType,
  onDataValueChange : ?DataValueType => any,
  propertyDescription? : PropertyDescription,
  readOnly? : boolean,
};

export default class AbstractStringBasedDataValueEditor
  extends PureComponent<PropsType> {

  static DATAVALUE_TYPE = 'string';

  static defaultProps = {
    readOnly: false,
  };

  constructor() {
    super( ...arguments );
    this.handleValueChange = this.handleValueChange.bind( this );
  }

  handleValueChange( value ) {
    const { datavalue, onDataValueChange } = this.props;

    if ( typeof value === 'string' && value.length !== 0 ) {
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
