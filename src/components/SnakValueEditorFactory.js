import * as Shapes from '../model/Shapes';
import React, { PureComponent } from 'react';
import expect from 'expect';
import ExternalIdValueEditor from './dataValueEditors/ExternalIdValueEditor';
import PropertyDescription from '../core/PropertyDescription';
import PropTypes from 'prop-types';
import StringDataValueEditor from './dataValueEditors/StringDataValueEditor';

export default class SnakValueEditorFactory extends PureComponent {

  constructor() {
    super( ...arguments );
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( datavalue ) {
    this.props.onChange( {
      ...this.props.snak,
      datavalue: datavalue,
    } );
  }

  render() {
    const { propertyDescription, snak } = this.props;
    const dataType = propertyDescription.datatype;
    expect( propertyDescription.datatype ).toBeA( 'string' );

    switch ( dataType ) {
    case 'external-id':
      return <ExternalIdValueEditor datavalue={snak.datavalue} onChange={this.handleChange} propertyDescription={propertyDescription} />;
    case 'commonsMedia':
    case 'string':
    case 'url':
      return <StringDataValueEditor datavalue={snak.datavalue} onChange={this.handleChange} propertyDescription={propertyDescription} />;
      // case "wikibase-item":
    default:
      return <td colSpan={SnakValueEditorFactory.TABLE_COLUMNS}><span>Data type {dataType} is not supported yet</span></td>;
    }
  }

}

SnakValueEditorFactory.TABLE_COLUMNS = 12;

SnakValueEditorFactory.propTypes = {
  mode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
  snak: PropTypes.shape( Shapes.Snak ),
};
