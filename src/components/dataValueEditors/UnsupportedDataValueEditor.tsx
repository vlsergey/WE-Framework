import React, {PureComponent} from 'react';

import * as ApiUtils from '../../core/ApiUtils';
import PropertyDescription from '../../core/PropertyDescription';
import styles from './UnsupportedDataValueEditor.css';

interface PropsType {
  datavalue?: DataValueType;
  propertyDescription: PropertyDescription;
}

interface StateType {
  html: string | null;
}

export default class UnsupportedDataValueEditor
  extends PureComponent<PropsType, StateType> {

  WIKIDATA_ROOT = '//www.wikidata.org/';

  wikidataApi = ApiUtils.getWikidataApi();

  constructor (props: PropsType) {
    super(props);

    this.state = {
      html: null,
    };

    // initial loading
    this.loadHtml();
  }

  override componentDidUpdate (prevProps: PropsType) {
    if (prevProps.datavalue !== this.props.datavalue) {
      this.setState({html: null});
      this.loadHtml();
    }
  }

  loadHtml = () => {
    const {datavalue, propertyDescription} = this.props;
    if (!datavalue || !propertyDescription)
      return;

    this.wikidataApi.postPromise({
      action: 'wbformatvalue',
      datavalue: JSON.stringify(datavalue),
      datatype: propertyDescription.datatype,
      format: 'json',
      generate: 'text/html',
    }).then((result: any) => {
      let html = result.result;
      html = html.replace('href="/', 'href="' + this.WIKIDATA_ROOT);
      this.setState({html});
    });
  };

  override render () {
    const {datavalue, propertyDescription, ...etc} = this.props;
    const {datatype} = propertyDescription;

    const className = (styles as unknown as Record<string, string>)['wef_datavalue_' + propertyDescription.datatype] + ' ' + styles.wef_datavalue_unsupported;

    if (!this.state.html) {
      return <td {...etc} className={className} colSpan={12}>
        <span>datatype {datatype} is not supported yet</span>
      </td>;
    }

    return <td {...etc} className={className} colSpan={12}>
      <div dangerouslySetInnerHTML={{__html: this.state.html}} />
    </td>;
  }

}
