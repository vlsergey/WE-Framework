// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import { connect } from 'react-redux';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import { defaultMemoize } from 'reselect';
import i18n from './i18n';
import { values } from 'utils/ObjectUtils';

const ok = x => x !== undefined && x !== null;
const EMPTY_OBJECT : any = Object.freeze( {} );
const NOOP = () => {};

const mapStateToProps = state => ( {
  labels: state.entity.labels || EMPTY_OBJECT,
} );

type PropsType = {
  disabled? : ?boolean,
  labels? : LabelsType,
  languageCodes : string[],
  sourceWebsites : string[],
};

export default
@connect( mapStateToProps )
class SearchOnSourceWebsitesButtonCell extends PureComponent<PropsType> {

  memoizeUrl = defaultMemoize( ( labels : ?LabelsType, languageCodes : string[], sourceWebsites : string[] ) => {
    if ( !labels ) return null;
    const languageSet : Set< string > = new Set( languageCodes );

    let qLabels : string[] = values( labels ).filter( ok )
      .filter( label => languageSet.has( label.language ) )
      .map( label => label.value )
      .filter( value => value !== undefined && value !== null && value.trim() !== '' );

    if ( qLabels.length === 0 ) {
      qLabels = values( labels ).filter( ok )
        .filter( label => DEFAULT_LANGUAGES.indexOf( label.language ) !== -1 )
        .map( label => label.value )
        .filter( value => value !== undefined && value !== null && value.trim() !== '' );
    }
    qLabels = Array.from( new Set( qLabels ) );

    const qSites : string[] = sourceWebsites.filter( ok )
      .filter( value => value !== undefined && value !== null && value.trim() !== '' )
      .map( site => site.trim() )
      .map( site => site.startsWith( 'http://' ) ? site.substr( 'http://'.length ) : site )
      .map( site => site.startsWith( 'https://' ) ? site.substr( 'https://'.length ) : site )
      .map( site => 'site:' + site );

    if ( qSites.length === 0 || qLabels.length === 0 ) return null;

    return '//google.com/search?sourceid=vlsergey_wef&ie=UTF-8&q='
      + encodeURIComponent(
        ( qSites.length > 1 ? '(' + qSites.join( ' OR ' ) + ')' : qSites[ 0 ] )
        + ' '
        + ( qLabels.length > 1 ? '(' + qLabels.join( ' OR ' ) + ')' : qLabels[ 0 ] )
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
