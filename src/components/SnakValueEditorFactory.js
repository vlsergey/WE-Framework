import * as Shapes from 'model/Shapes';
import React, { PureComponent } from 'react';
import CommonsMediaDataValueEditor from './dataValueEditors/CommonsMediaDataValueEditor';
import expect from 'expect';
import ExternalIdDataValueEditor from './dataValueEditors/ExternalIdDataValueEditor';
import MonolingualTextDataValueEditor from './dataValueEditors/MonolingualTextDataValueEditor';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import QuantityDataValueEditor from './dataValueEditors/quantity/QuantityDataValueEditor';
import StringDataValueEditor from './dataValueEditors/StringDataValueEditor';
import UnsupportedDataValueEditor from './dataValueEditors/UnsupportedDataValueEditor';
import UrlDataValueEditor from './dataValueEditors/UrlDataValueEditor';
import WikibaseItemDataValueEditor from './dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';

export const SUPPORTED_DATATYPES = [
  'external-id',
  'commonsMedia',
  'monolingualtext',
  'quantity',
  'string',
  'url',
  'wikibase-item',
];

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

    switch ( dataType ) {
    case 'external-id':
      return <ExternalIdDataValueEditor {...dataValueEditorProps} />;
    case 'commonsMedia':
      return <CommonsMediaDataValueEditor {...dataValueEditorProps} />;
    case 'monolingualtext':
      return <MonolingualTextDataValueEditor {...dataValueEditorProps} />;
    case 'quantity':
      return <QuantityDataValueEditor {...dataValueEditorProps} />;
    case 'string':
      return <StringDataValueEditor {...dataValueEditorProps} />;
    case 'url':
      return <UrlDataValueEditor {...dataValueEditorProps} />;
    case 'wikibase-item':
      return <WikibaseItemDataValueEditor {...dataValueEditorProps} />;
      // case "wikibase-item":
    default:
      return <UnsupportedDataValueEditor datavalue={snak.datavalue} propertyDescription={propertyDescription} />;
    }
  }

}
