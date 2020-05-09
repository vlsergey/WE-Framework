// @flow

import * as ApiUtils from 'core/ApiUtils';
import React, { PureComponent } from 'react';
import PropertyDescription from 'core/PropertyDescription';
import styles from './UnsupportedDataValueEditor.css';

type PropsType = {
  datavalue? : DataValueType,
  propertyDescription : PropertyDescription,
};

type StateType = {
  html : ?string,
};

export default class UnsupportedDataValueEditor
  extends PureComponent<PropsType, StateType> {

  WIKIDATA_ROOT = '//www.wikidata.org/';

  constructor() {
    super( ...arguments );

    this.state = {
      html: null,
    };

    this.loadHtml = this.loadHtml.bind( this );
    this.wikidataApi = ApiUtils.getWikidataApi();

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

    this.wikidataApi.postPromise( {
      action: 'wbformatvalue',
      datavalue: JSON.stringify( datavalue ),
      datatype: propertyDescription.datatype,
      format: 'json',
      generate: 'text/html',
    } ).then( result => {
      let html = result.result;
      html = html.replace( 'href="/', 'href="' + this.WIKIDATA_ROOT );
      this.setState( { html } );
    } );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "datavalue" }] */
    const { datavalue, propertyDescription, ...etc } = this.props;
    const { datatype } = propertyDescription;

    const className = styles[ 'wef_datavalue_' + propertyDescription.datatype ] + ' ' + styles.wef_datavalue_unsupported;

    if ( !this.state.html ) {
      return <td {...etc} className={className} colSpan={12}>
        <span>datatype {datatype} is not supported yet</span>
      </td>;
    }

    return <td {...etc} className={className} colSpan={12}>
      <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
    </td>;
  }

}
