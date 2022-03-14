import PropertyDescription from '../../core/PropertyDescription';
import { PureComponent } from 'react';

/* eslint react/no-unused-prop-types : 0 */
type PropsType = {
  buttons? : any[],
  datavalue? : DataValueType,
  onDataValueChange : (dataValue : DataValueType | null) => any,
  propertyDescription : PropertyDescription,
  readOnly? : boolean,
};

export default class AbstractStringBasedDataValueEditor
  extends PureComponent<PropsType> {

  static DATAVALUE_TYPE = 'string';

  static defaultProps = {
    readOnly: false,
  };

  handleValueChange = ( value : string | null ) => {
    const { datavalue, onDataValueChange } = this.props;

    if ( value ) {
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
