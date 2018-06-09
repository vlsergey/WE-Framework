import * as Shapes from '../model/Shapes';
import React, { PureComponent } from 'react';
import expect from 'expect';
import ExternalIdValueEditor from './dataValueEditors/ExternalIdValueEditor';
import propertiesCacheContext from '../core/propertiesCacheContext';
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
    const { snak } = this.props;
    expect( snak.property ).toBeA( 'string' );

    return <propertiesCacheContext.Consumer>
      { propertiesCacheContext => {
        const propertyDescription = propertiesCacheContext.getOrQueue( snak.property );
        if ( !propertyDescription || !propertyDescription.datatype ) {
          return <td colSpan={12}><span>Loading property description for {snak.property}</span></td>;
        }

        const dataType = propertyDescription.datatype;
        switch ( dataType ) {
        case 'external-id':
          return <ExternalIdValueEditor datavalue={snak.datavalue} onChange={this.handleChange} propertyDescription={propertyDescription} />;
        case 'commonsMedia':
        case 'string':
        case 'url':
          return <StringDataValueEditor datavalue={snak.datavalue} onChange={this.handleChange} propertyDescription={propertyDescription} />;
          // case "wikibase-item":
        default:
          return <td colSpan={12}><span>Data type {dataType} is not supported yet</span></td>;
        }
      } }
    </propertiesCacheContext.Consumer>;
  }

}

SnakValueEditorFactory.propTypes = {
  mode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  snak: PropTypes.shape( Shapes.Snak ),
};
