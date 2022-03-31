import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {defaultMemoize} from 'reselect';

import {DEFAULT_LANGUAGES} from '../../../utils/I18nUtils';
import isOkay from '../../../utils/isOkay';
import ButtonCell from '../../ButtonCell';
import i18n from './i18n';

const EMPTY_OBJECT = Object.freeze({});

interface PropsType {
  disabled?: boolean;
  labels: LabelsType | null;
  languageCodes?: readonly string[];
  sourceWebsites?: readonly string[];
}

class SearchOnSourceWebsitesButtonCell extends PureComponent<PropsType> {

  memoizeUrl = defaultMemoize((labels: LabelsType | null, languageCodes?: readonly string[], sourceWebsites?: readonly string[]) => {
    if (!labels) return null;
    const languageSet: Set< string > = new Set(languageCodes || []);

    let qLabels: string[] = Object.values(labels).filter(isOkay)
      .filter(label => languageSet.has(label.language))
      .map(label => label.value)
      .filter(value => value !== undefined && value !== null && value.trim() !== '');

    if (qLabels.length === 0) {
      qLabels = Object.values(labels).filter(isOkay)
        .filter(label => DEFAULT_LANGUAGES.includes(label.language))
        .map(label => label.value)
        .filter(value => value !== undefined && value !== null && value.trim() !== '');
    }
    qLabels = Array.from(new Set(qLabels));

    const qSites: string[] = (sourceWebsites || []).filter(isOkay)
      .filter(value => value !== undefined && value !== null && value.trim() !== '')
      .map(site => site.trim())
      .map(site => site.startsWith('http://') ? site.substr('http://'.length) : site)
      .map(site => site.startsWith('https://') ? site.substr('https://'.length) : site)
      .map(site => 'site:' + site);

    if (qSites.length === 0 || qLabels.length === 0) return null;

    return '//google.com/search?sourceid=vlsergey_wef&ie=UTF-8&q='
      + encodeURIComponent(
        (qSites.length > 1 ? '(' + qSites.join(' OR ') + ')' : qSites[0])
        + ' '
        + (qLabels.length > 1 ? '(' + qLabels.join(' OR ') + ')' : qLabels[0])
      );
  });

  override render () {
    const {disabled, labels, languageCodes, sourceWebsites} = this.props;
    const url = this.memoizeUrl(labels, languageCodes, sourceWebsites);

    return <ButtonCell
      disabled={disabled || !url}
      icon="ui-icon-search"
      label={i18n.buttonSearchOnWebsites}>
      { (children: any) => <a href={url ? url : '#'}
        rel="noopener noreferrer"
        target="_blank">{children}</a>}
    </ButtonCell>;
  }

}


const mapStateToProps = (state: any) => ({
  labels: state.entity.labels || EMPTY_OBJECT,
});
export default connect(mapStateToProps)(SearchOnSourceWebsitesButtonCell);
