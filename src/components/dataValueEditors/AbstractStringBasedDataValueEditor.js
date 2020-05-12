// @flow

import { boundMethod } from 'autobind-decorator';
import PropertyDescription from 'core/PropertyDescription';
import { PureComponent } from 'react';

/* eslint react/no-unused-prop-types : 0 */
type PropsType = {
  buttons? : any[],
  datavalue? : DataValueType,
  onDataValueChange : ?DataValueType => any,
  propertyDescription : PropertyDescription,
  readOnly? : boolean,
};

export default class AbstractStringBasedDataValueEditor
  extends PureComponent<PropsType> {

  static DATAVALUE_TYPE = 'string';

  static defaultProps = {
    readOnly: false,
  };

  @boundMethod
  handleValueChange( value : ?string ) : void {
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
