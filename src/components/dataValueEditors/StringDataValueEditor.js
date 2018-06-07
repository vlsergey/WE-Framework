import * as Shapes from '../../model/Shapes';
import React, { Component } from 'react';
import PropertyDescription from '../../core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from '../core.css';

export default class StringDataValueEditor extends Component {

  render() {
    const { datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles[ 'wef_' + propertyDescription.datatype ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    if ( datavalue ) {
      params.value = datavalue.value;
    }

    return <input {...params} />;
  }

}

StringDataValueEditor.propTypes = {
  datavalue: PropTypes.shape( Shapes.DataValue ),
  onChange: PropTypes.func.isRequired,
  propertyDescription: PropTypes.instanceOf( PropertyDescription ),
};
