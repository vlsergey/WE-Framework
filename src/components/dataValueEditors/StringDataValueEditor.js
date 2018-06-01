import * as Shapes from '../../model/Shapes';
import * as Utils from '../Utils';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../core.css';

export default class StringDataValueEditor extends Component {

  render() {
    const { datavalue, pattern } = this.props;

    const params = {
      type: 'text',
      className: styles.wef_string,
    };

    if ( pattern ) {
      params.pattern = Utils.regexpGetHtmlPattern( pattern );
    }

    if ( datavalue ) {
      params.value = datavalue.value;
    }

    return <input {...params}/>;
  }

}

StringDataValueEditor.propTypes = {
  datavalue: PropTypes.shape( Shapes.DataValue ),
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,
};
