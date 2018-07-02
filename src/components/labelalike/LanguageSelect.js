import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LanguageAutocomplete from 'components/languages/LanguageAutocomplete';
import { listLabelalikeLanguages } from 'core/selectors.js';
import PropTypes from 'prop-types';

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
