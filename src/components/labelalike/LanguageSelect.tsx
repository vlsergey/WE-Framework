import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {DEFAULT_LANGUAGES} from '../../utils/I18nUtils';
import LanguageAutocomplete from '../languages/LanguageAutocomplete';

const EMPTY_OBJECT: any = Object.freeze({});

const listLabelalikeLanguages = createSelector(
  (entity: EntityType) => Object.keys(entity.labels || EMPTY_OBJECT),
  (entity: EntityType) => Object.keys(entity.descriptions || EMPTY_OBJECT),
  (entity: EntityType) => Object.keys(entity.draftAliases || EMPTY_OBJECT),
  (entity: EntityType) => Object.keys(entity.aliases || EMPTY_OBJECT),
  (fromLabels, fromDescriptions, fromDraftAliases, fromAliases) => {
    const result = [...DEFAULT_LANGUAGES];

    const languages: Set<string> = new Set();
    fromLabels.forEach(langCode => languages.add(langCode));
    fromDescriptions.forEach(langCode => languages.add(langCode));
    fromDraftAliases.forEach(langCode => languages.add(langCode));
    fromAliases.forEach(langCode => languages.add(langCode));

    // remove DEFAULT_LANGUAGES from set
    result.forEach(langCode => languages.delete(langCode));
    const sorted = Array.from(languages);
    sorted.sort();

    sorted.forEach(langCode => result.push(langCode));
    return result;
  });

interface PropsType {
  onChange: (value: string) => any;
  provided: string[];
  value: string;
}

class LanguageSelect extends PureComponent<PropsType> {

  override render () {
    const {onChange, provided, value} = this.props;
    return <LanguageAutocomplete
      onChange={onChange}
      provided={provided}
      value={value} />;
  }
}

const mapStateToProps = (state: any) => ({
  provided: listLabelalikeLanguages(state.entity),
});

const LanguageSelectConnected = connect(mapStateToProps)(LanguageSelect);
export default LanguageSelectConnected;
export {LanguageSelect as LanguageSelectImpl};
