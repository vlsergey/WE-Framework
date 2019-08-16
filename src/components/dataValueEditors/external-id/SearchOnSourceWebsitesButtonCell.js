import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import { defaultMemoize } from 'reselect';
import i18n from './i18n';
import PropTypes from 'prop-types';

const ok = x => x !== undefined && x !== null;
const NOOP = () => {};

class SearchOnSourceWebsitesButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    labels: PropTypes.object,
    languageCodes: PropTypes.arrayOf( PropTypes.string ).isRequired,
    sourceWebsites: PropTypes.arrayOf( PropTypes.string ).isRequired,
  };

  memoizeUrl = defaultMemoize( ( labels, languageCodes, sourceWebsites ) => {
    const languageSet = new Set( languageCodes );

    let qLabels = Object.values( labels ).filter( ok )
      .filter( label => languageSet.has( label.language ) )
      .map( label => label.value )
      .filter( value => value !== undefined && value !== null && value.trim() !== '' );

    if ( qLabels.length === 0 ) {
      qLabels = Object.values( labels ).filter( ok )
        .filter( label => DEFAULT_LANGUAGES.indexOf( label.language ) !== -1 )
        .map( label => label.value )
        .filter( value => value !== undefined && value !== null && value.trim() !== '' );
    }
    qLabels = [ ...new Set( qLabels ) ];

    const qSites = sourceWebsites.filter( ok )
      .filter( value => value !== undefined && value !== null && value.trim() !== '' )
      .map( site => site.trim() )
      .map( site => site.startsWith( 'http://' ) ? site.substr( 'http://'.length ) : site )
      .map( site => site.startsWith( 'https://' ) ? site.substr( 'https://'.length ) : site )
      .map( site => 'site:' + site );

    if ( qSites.length === 0 || qLabels === 0 ) return null;

    return '//google.com/search?sourceid=vlsergey_wef&ie=UTF-8&q='
      + encodeURIComponent(
        ( qSites.length > 1 ? '(' + qSites.join( ' OR ' ) + ')' : qSites )
        + ' '
        + ( qLabels.length > 1 ? '(' + qLabels.join( ' OR ' ) + ')' : qLabels )
      );
  } );

  render() {
    const { disabled, labels, languageCodes, sourceWebsites } = this.props;
    const url = this.memoizeUrl( labels, languageCodes, sourceWebsites );

    return <ButtonCell
      disabled={disabled || !url}
      icon="ui-icon-search"
      label={i18n.buttonSearchOnWebsites}
      onClick={NOOP}>
      { children => <a href={url ? url : '#'}
        rel="noopener noreferrer"
        target="_blank">{children}</a>}
    </ButtonCell>;
  }

}

const EMPTY_OBJECT = {};

const mapStateToProps = state => ( {
  labels: state.entity.labels || EMPTY_OBJECT,
} );

const SearchOnSourceWebsitesButtonCellConnected = connect( mapStateToProps )( SearchOnSourceWebsitesButtonCell );
export default SearchOnSourceWebsitesButtonCellConnected;
