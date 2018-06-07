import * as Shapes from '../model/Shapes';
import React, { Component } from 'react';
import expect from 'expect';
import PropTypes from 'prop-types';
import StringDataValueEditor from './dataValueEditors/StringDataValueEditor';
import propertiesCacheContext from '../core/propertiesCacheContext';

export default class SnakEditorTableRowPart extends Component {

  render() {
    const { snak } = this.props;
    expect( snak.property ).toBeA( 'string' );

    return <typesCacheContext.Consumer>
      { typesCacheContext => {
        const property = propertiesCacheContext.getOrQueue( snak.property );
        if ( !property || !property.datatype ) {
          return <td>
            <span>Loading property description for {snak.property}</span>
          </td>;
        }

        switch ( dataType ) {
        // case "commonsMedia":
        case 'external-id':
          return <ExternalIdValueEditor datavalue={snak.datavalue} property={property} />;
        case 'string':
          return <StringDataValueEditor datavalue={snak.datavalue} property={property} />;
          // case "url":
          // case "wikibase-item":
        default:
          return <span>Data type {dataType} is not supported yet</span>;
        }
      } }
    </typesCacheContext.Consumer>;
  }

}

SnakEditorTableRowPart.propTypes = {
  mode: PropTypes.string,
  snak: PropTypes.shape( Shapes.Snak ),
};
