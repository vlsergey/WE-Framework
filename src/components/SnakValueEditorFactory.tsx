import React, {Component, PureComponent} from 'react';

import PropertyDescription from '../core/PropertyDescription';
import enhancementsFactory from '../enhancements/enhancementsFactory';
import CommonsMediaDataValueEditor from './dataValueEditors/CommonsMediaDataValueEditor';
import ExternalIdDataValueEditor from './dataValueEditors/external-id/ExternalIdDataValueEditor';
import MonolingualTextDataValueEditor from './dataValueEditors/MonolingualTextDataValueEditor';
import QuantityDataValueEditor from './dataValueEditors/quantity/QuantityDataValueEditor';
import StringDataValueEditor from './dataValueEditors/StringDataValueEditor';
import TimeDataValueEditor from './dataValueEditors/time/TimeDataValueEditor';
import UnsupportedDataValueEditor from './dataValueEditors/UnsupportedDataValueEditor';
import UrlDataValueEditor from './dataValueEditors/UrlDataValueEditor';
import WikibaseItemDataValueEditor from './dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';

const STANDARD = {
  'external-id': ExternalIdDataValueEditor,
  'commonsMedia': CommonsMediaDataValueEditor,
  'monolingualtext': MonolingualTextDataValueEditor,
  'quantity': QuantityDataValueEditor,
  'string': StringDataValueEditor,
  'time': TimeDataValueEditor,
  'url': UrlDataValueEditor,
  'wikibase-item': WikibaseItemDataValueEditor,
};

export const SUPPORTED_DATATYPES: string[] = Object.keys(STANDARD);

interface PropsType {
  onSnakChange: (snak: SnakType) => any;
  propertyDescription: PropertyDescription;
  readOnly?: boolean;
  snak: SnakType;
}

export default class SnakValueEditorFactory extends PureComponent<PropsType> {

  static defaultProps = {
    readOnly: false,
  };

  handleDataValueChange = (datavalue: DataValueType) => {
    const {propertyDescription, snak} = this.props;

    this.props.onSnakChange({
      ...snak,
      datavalue,
      datatype: propertyDescription.datatype,
    });
  };

  override render () {
    const {propertyDescription, readOnly, snak} = this.props;
    const dataType = propertyDescription.datatype;

    const dataValueEditorProps = {
      datavalue: snak.datavalue,
      readOnly,
      onDataValueChange: this.handleDataValueChange,
      propertyDescription,
    };

    const enhancedDataValueEditorClass = enhancementsFactory.findDataValueEditor(propertyDescription);
    // @ts-expect-error
    const standardDataValueEditorClass = STANDARD[dataType] as Component<any>;
    const dataValueEditorClass = enhancedDataValueEditorClass || standardDataValueEditorClass || null;
    if (dataValueEditorClass === null) {
      return <UnsupportedDataValueEditor datavalue={snak.datavalue} propertyDescription={propertyDescription} />;
    }

    return React.createElement(dataValueEditorClass, dataValueEditorProps);
  }

}
