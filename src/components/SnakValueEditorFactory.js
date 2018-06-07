import * as Shapes from '../model/Shapes';
import React, { Component } from 'react';
import expect from 'expect';
import ExternalIdValueEditor from './dataValueEditors/ExternalIdValueEditor';
import propertiesCacheContext from '../core/propertiesCacheContext';
import PropTypes from 'prop-types';
import StringDataValueEditor from './dataValueEditors/StringDataValueEditor';

export default class SnakEditorTableRowPart extends Component {

  render() {
    const { snak } = this.props;
    expect( snak.property ).toBeA( 'string' );

    return <propertiesCacheContext.Consumer>
      { propertiesCacheContext => {
        const propertyDescription = propertiesCacheContext.getOrQueue( snak.property );
        if ( !propertyDescription || !propertyDescription.datatype ) {
          return <span>Loading property description for {snak.property}</span>;
        }

        const dataType = propertyDescription.datatype;
        switch ( dataType ) {
        // case "commonsMedia":
        case 'external-id':
          return <ExternalIdValueEditor datavalue={snak.datavalue} propertyDescription={propertyDescription} />;
        case 'string':
          return <StringDataValueEditor datavalue={snak.datavalue} propertyDescription={propertyDescription} />;
          // case "url":
          // case "wikibase-item":
        default:
          return <span>Data type {dataType} is not supported yet</span>;
        }
      } }
    </propertiesCacheContext.Consumer>;
  }

}

SnakEditorTableRowPart.propTypes = {
  mode: PropTypes.string,
  snak: PropTypes.shape( Shapes.Snak ),
};
