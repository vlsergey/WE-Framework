import * as Shapes from '../../model/Shapes';
import React, { Component } from 'react';
import PropertyDescription from '../../core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from '../core.css';

export default class ExternalIdValueEditor extends Component {

  render() {
    const { onChange, datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles[ 'wef_' + propertyDescription.datatype ],
    };

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

    const url = datavalue && datavalue.value ? propertyDescription.formatUrl( datavalue.value ) : null;
    
    return [
      <td colSpan={5} key="input"><input {...params} /></td>,
      <td className={styles.wef_external_links_url_cell} colSpan={7} key="url">
        <div className={styles.wef_external_links_url_div}>{url ? <a className={styles.wef_external_links_url_a} href={url} rel="noopener noreferrer" target="_blank">{url}</a> : ''}</div>
      </td>, 
    ];
  }

}

ExternalIdValueEditor.propTypes = {
  datavalue: PropTypes.shape( Shapes.DataValue ),
  onChange: PropTypes.func.isRequired,
  propertyDescription: PropTypes.instanceOf( PropertyDescription ),
};
