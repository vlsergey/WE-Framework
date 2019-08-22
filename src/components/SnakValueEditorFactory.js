import React, { PureComponent } from 'react';
import CommonsMediaDataValueEditor from './dataValueEditors/CommonsMediaDataValueEditor';
import enhancementsFactory from 'enhancements/enhancementsFactory';
import ExternalIdDataValueEditor from './dataValueEditors/external-id/ExternalIdDataValueEditor';
import MonolingualTextDataValueEditor from './dataValueEditors/MonolingualTextDataValueEditor';
import PropertyDescription from 'core/PropertyDescription';
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

export const SUPPORTED_DATATYPES = Object.keys( STANDARD );

type PropsType = {
  onSnakChange : SnakType => any,
  propertyDescription : PropertyDescription,
  readOnly? : boolean,
  snak? : SnakType,
};

export default class SnakValueEditorFactory extends PureComponent<PropsType> {

  static defaultProps = {
    readOnly: false,
  };

  constructor() {
    super( ...arguments );
    this.handleDataValueChange = this.handleDataValueChange.bind( this );
  }

  handleDataValueChange( datavalue ) {
    const { propertyDescription, snak } = this.props;

    this.props.onSnakChange( {
      ...snak,
      datavalue,
      datatype: propertyDescription.datatype,
    } );
  }

  render() {
    const { propertyDescription, readOnly, snak } = this.props;
    const dataType = propertyDescription.datatype;

    const dataValueEditorProps = {
      datavalue: snak.datavalue,
      readOnly,
      onDataValueChange: this.handleDataValueChange,
      propertyDescription,
    };

    const enhancedDataValueEditorClass = enhancementsFactory.findDataValueEditor( propertyDescription );
    const standardDataValueEditorClass = STANDARD[ dataType ];
    const dataValueEditorClass = enhancedDataValueEditorClass || standardDataValueEditorClass || null;
    if ( dataValueEditorClass === null ) {
      return <UnsupportedDataValueEditor datavalue={snak.datavalue} propertyDescription={propertyDescription} />;
    }

    return React.createElement( dataValueEditorClass, dataValueEditorProps );
  }

}
