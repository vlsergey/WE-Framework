import * as ApiUtils from 'core/ApiUtils';
import * as Shapes from 'model/Shapes';
import React, { Component } from 'react';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './UnsupportedDataValueEditor.css';

export default class UnsupportedDataValueEditor extends Component {

  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  }

  constructor() {
    super( ...arguments );

    this.state = {
      html: null,
    };

    this.loadHtml = this.loadHtml.bind( this );

    // initial loading
    this.loadHtml();
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.datavalue !== this.props.datavalue ) {
      this.setState( { html: null } );
      this.loadHtml();
    }
  }

  loadHtml() {
    const { datavalue, propertyDescription } = this.props;
    if ( !datavalue || !propertyDescription )
      return;

    ApiUtils.getWikidataApi().post( {
      action: 'wbformatvalue',
      datavalue: JSON.stringify( datavalue ),
      datatype: propertyDescription.datatype,
      format: 'json',
      generate: 'text/html',
    } ).done( result => {
      let html = result.result;
      html = html.replace( 'href="/', 'href="//www.wikidata.org/' );
      this.setState( { html } );
    } );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "datavalue" }] */
    const { datavalue, propertyDescription, ...other } = this.props;
    const { datatype } = propertyDescription;

    const className = styles[ 'wef_datavalue_' + propertyDescription.datatype ] + ' ' + styles.wef_datavalue_unsupported;

    if ( !this.state.html ) {
      return <td className={className} colSpan={12} {...other}>
        <span>datatype {datatype} is not supported yet</span>
      </td>;
    }

    return <td className={className} colSpan={12} {...other}>
      <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
    </td>;
  }

}
