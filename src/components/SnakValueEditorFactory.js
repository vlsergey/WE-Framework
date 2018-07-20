import * as Shapes from 'model/Shapes';
import React, { PureComponent } from 'react';
import CommonsMediaDataValueEditor from './dataValueEditors/CommonsMediaDataValueEditor';
import enhancementsFactory from 'enhancements/enhancementsFactory';
import expect from 'expect';
import ExternalIdDataValueEditor from './dataValueEditors/ExternalIdDataValueEditor';
import MonolingualTextDataValueEditor from './dataValueEditors/MonolingualTextDataValueEditor';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
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

export default class SnakValueEditorFactory extends PureComponent {

  static TABLE_COLUMNS = 12;

  static propTypes = {
    readOnly: PropTypes.bool,
    onSnakChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    snak: PropTypes.shape( Shapes.Snak ),
  }

  static defaultProps = {
    readOnly: false,
  }

  constructor() {
    super( ...arguments );
    this.handleDataValueChange = this.handleDataValueChange.bind( this );
  }

  handleDataValueChange( datavalue ) {
    const { propertyDescription, snak } = this.props;

    expect( snak ).toBeAn( 'object' );
    expect( propertyDescription.datatype ).toBeA( 'string' );

    this.props.onSnakChange( {
      ...snak,
      datavalue,
      datatype: propertyDescription.datatype,
    } );
  }

  render() {
    const { propertyDescription, readOnly, snak } = this.props;
    const dataType = propertyDescription.datatype;
    expect( propertyDescription.datatype ).toBeA( 'string' );

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
