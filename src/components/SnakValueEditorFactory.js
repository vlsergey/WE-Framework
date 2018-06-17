import * as Shapes from '../model/Shapes';
import React, { PureComponent } from 'react';
import CommonsMediaDataValueEditor from './dataValueEditors/CommonsMediaDataValueEditor';
import expect from 'expect';
import ExternalIdDataValueEditor from './dataValueEditors/ExternalIdDataValueEditor';
import PropertyDescription from '../core/PropertyDescription';
import PropTypes from 'prop-types';
import StringDataValueEditor from './dataValueEditors/StringDataValueEditor';

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

    switch ( dataType ) {
    case 'external-id':
      return <ExternalIdDataValueEditor datavalue={snak.datavalue} onDataValueChange={this.handleDataValueChange} propertyDescription={propertyDescription} />;
    case 'commonsMedia':
      return <CommonsMediaDataValueEditor datavalue={snak.datavalue} onDataValueChange={this.handleDataValueChange} propertyDescription={propertyDescription} />;
    case 'string':
    case 'url':
      return <StringDataValueEditor datavalue={snak.datavalue} onDataValueChange={this.handleDataValueChange} propertyDescription={propertyDescription} />;
      // case "wikibase-item":
    default:
      return <td colSpan={SnakValueEditorFactory.TABLE_COLUMNS}><span>Data type {dataType} is not supported yet</span></td>;
    }
  }

}
