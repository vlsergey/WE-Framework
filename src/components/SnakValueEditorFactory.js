import * as Shapes from '../model/Shapes';
import React, { Component } from 'react';
import expect from 'expect';
import PropTypes from 'prop-types';
import StringDataValueEditor from './dataValueEditors/StringDataValueEditor';
import typesCacheContext from '../core/typesCacheContext';

export default class SnakEditorTableRowPart extends Component {

  render() {
    const { snak } = this.props;
    expect( snak.property ).toBeA( 'string' );

    return <typesCacheContext.Consumer>
      { typesCacheContext => {
        if ( !typesCacheContext[ snak.property ] ) {
          return <span>Loading property type for {snak.property}</span>;
        }

        const dataType = typesCacheContext[ snak.property ];
        switch ( dataType ) {
        // case "commonsMedia":
        case 'string':
          return <StringDataValueEditor datavalue={snak.datavalue} />;
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
