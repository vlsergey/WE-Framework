import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGE_TITLES } from '../../utils/I18nUtils';
import { listLabelalikeLanguages } from '../../core/selectors.js';
import PropTypes from 'prop-types';

class LanguageSelect extends Component {

  static propTypes = {
    languages: PropTypes.arrayOf( PropTypes.string ),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleLanguageChange = this.handleLanguageChange.bind( this );
  }

  handleLanguageChange( event ) {
    this.props.onChange( event.target.value );
  }

  render() {

    return <select onChange={this.handleLanguageChange} value={this.props.value}>
      { this.props.languages.map( langCode =>
        <option key={langCode} value={langCode}>
          {langCode}
          {LANGUAGE_TITLES[ langCode ] && ' — ' + LANGUAGE_TITLES[ langCode ]}
        </option>
      ) }
    </select>;
  }
}

const mapStateToProps = ( state ) => ( {
  languages: listLabelalikeLanguages( state.entity ),
} );

const LanguageSelectConnected = connect( mapStateToProps )( LanguageSelect );
export default LanguageSelectConnected;
