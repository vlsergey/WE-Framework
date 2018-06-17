import * as Shapes from '../../model/Shapes';
import React, { Component } from 'react';
import PropertyDescription from '../../core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from '../core.css';

export default class StringDataValueEditor extends Component {

  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  };

  render() {
    const { onDataValueChange, datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles[ 'wef_' + propertyDescription.datatype ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.value = datavalue ? datavalue.value : '';
    params.onChange = ( event ) => {
      onDataValueChange( {
        type: datavalue ? datavalue.type : 'string',
        value: event.target.value,
      } );
    };

    return <td colSpan={12}><input {...params} /></td>;
  }

}
