import {PureComponent} from 'react';

import PropertyDescription from '../../core/PropertyDescription';

/* eslint react/no-unused-prop-types : 0 */
interface PropsType {
  buttons?: any[];
  datavalue?: StringDataValue | null;
  onDataValueChange: (dataValue: StringDataValue | null) => any;
  propertyDescription: PropertyDescription;
  readOnly?: boolean;
}

export default class AbstractStringBasedDataValueEditor
  extends PureComponent<PropsType> {

  handleValueChange = (value: string | null) => {
    const {datavalue, onDataValueChange} = this.props;

    if (value) {
      onDataValueChange({
        ...datavalue,
        type: 'string',
        value,
      });
    } else {
      onDataValueChange(null);
    }
  };

}
