import * as Shapes from '../../model/Shapes';
import React, { Component } from 'react';
import PropertyDescription from '../../core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from '../core.css';

export default class StringDataValueEditor extends Component {

  render() {
    const { onChange, datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles[ 'wef_' + propertyDescription.datatype ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.value = datavalue ? datavalue.value : '';
    params.onChange = ( event ) => {
      onChange( {
        type: datavalue ? datavalue.type : 'string',
        value: event.target.value
      } );
    };

    return <td colSpan={12}><input {...params} /></td>;
  }

}

StringDataValueEditor.propTypes = {
  datavalue: PropTypes.shape( Shapes.DataValue ),
  onChange: PropTypes.func.isRequired,
  propertyDescription: PropTypes.instanceOf( PropertyDescription ),
};
