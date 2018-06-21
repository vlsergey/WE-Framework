import * as Shapes from 'model/Shapes';
import React, { PureComponent } from 'react';
import CommonsMediaDataValueEditor from './dataValueEditors/CommonsMediaDataValueEditor';
import expect from 'expect';
import ExternalIdDataValueEditor from './dataValueEditors/ExternalIdDataValueEditor';
import MonolingualTextDataValueEditor from './dataValueEditors/MonolingualTextDataValueEditor';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import StringDataValueEditor from './dataValueEditors/StringDataValueEditor';
import UnsupportedDataValueEditor from './dataValueEditors/UnsupportedDataValueEditor';
import UrlDataValueEditor from './dataValueEditors/UrlDataValueEditor';

export default class SnakValueEditorFactory extends PureComponent {

  static TABLE_COLUMNS = 12;

  static propTypes = {
    mode: PropTypes.string,
    onSnakChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    snak: PropTypes.shape( Shapes.Snak ),
  }

  constructor() {
    super( ...arguments );
    this.handleDataValueChange = this.handleDataValueChange.bind( this );
  }

  handleDataValueChange( datavalue ) {
    this.props.onSnakChange( {
      ...this.props.snak,
      datavalue,
    } );
  }

  render() {
    const { propertyDescription, snak } = this.props;
    const dataType = propertyDescription.datatype;
    expect( propertyDescription.datatype ).toBeA( 'string' );

    const dataValueEditorProps = {
      datavalue: snak.datavalue,
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
    case 'string':
      return <StringDataValueEditor {...dataValueEditorProps} />;
    case 'url':
      return <UrlDataValueEditor {...dataValueEditorProps} />;
      // case "wikibase-item":
    default:
      return <UnsupportedDataValueEditor datavalue={snak.datavalue} propertyDescription={propertyDescription} />;
    }
  }

}
