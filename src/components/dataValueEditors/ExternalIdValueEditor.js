import * as Shapes from '../../model/Shapes';
import React, { Component } from 'react';
import PropertyDescription from '../../core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from '../core.css';

export default class ExternalIdValueEditor extends Component {

  render() {
    const { datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles.wef_string,
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    if ( datavalue ) {
      params.value = datavalue.value;
    }

    return <table className={styles.wef_external_id_table}>
      <tbody>
        <tr>
          <td>
            <input {...params} />
          </td>
          <td>
            <span>{datavalue ? propertyDescription.formatUrl( datavalue.value ) : ''}</span>
          </td>
        </tr>
      </tbody>
    </table>;
  }

}

ExternalIdValueEditor.propTypes = {
  datavalue: PropTypes.shape( Shapes.DataValue ),
  onChange: PropTypes.func.isRequired,
  propertyDescription: PropTypes.instanceOf( PropertyDescription ),
};
