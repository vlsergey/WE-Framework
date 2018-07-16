import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import LanguageAutocomplete from 'components/languages/LanguageAutocomplete';
import PropTypes from 'prop-types';

const EMPTY_OBJECT = {};

const listLabelalikeLanguages = createSelector(
  entity => Object.keys( entity.labels || EMPTY_OBJECT ),
  entity => Object.keys( entity.descriptions || EMPTY_OBJECT ),
  entity => Object.keys( entity.draftAliases || EMPTY_OBJECT ),
  entity => Object.keys( entity.aliases || EMPTY_OBJECT ),
  ( fromLabels, fromDescriptions, fromDraftAliases, fromAliases ) => {
    const result = [ ...DEFAULT_LANGUAGES ];

    const languages = new Set();
    fromLabels.forEach( langCode => languages.add( langCode ) );
    fromDescriptions.forEach( langCode => languages.add( langCode ) );
    fromDraftAliases.forEach( langCode => languages.add( langCode ) );
    fromAliases.forEach( langCode => languages.add( langCode ) );

    // remove DEFAULT_LANGUAGES from set
    result.forEach( langCode => languages.delete( langCode ) );
    const sorted = Array.from( languages );
    sorted.sort();

    sorted.forEach( langCode => result.push( langCode ) );
    return result;
  } );

class LanguageSelect extends PureComponent {

  static propTypes = {
    provided: PropTypes.arrayOf( PropTypes.string ),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  render() {
    const { onChange, provided, value } = this.props;
    return <LanguageAutocomplete onChange={onChange} provided={provided} value={value} />;
  }
}

const mapStateToProps = state => ( {
  provided: listLabelalikeLanguages( state.entity ),
} );

const LanguageSelectConnected = connect( mapStateToProps )( LanguageSelect );
export default LanguageSelectConnected;
