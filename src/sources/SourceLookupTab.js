// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import { getWikidataApi } from 'core/ApiUtils';
import SourceItem from './SourceItem';
import styles from './styles.css';

const MAX_ITEMS = 15;

type PropsType = {
  onInsert : string => any,
};

type StateType = {
  searchInProgress : boolean,
  searchResult : string[],
  searchTerm : string,
  searchTermScheduled : string,
};

export default class SourceLookupTab
  extends PureComponent<PropsType, StateType> {

  state = {
    searchInProgress: false,
    searchTerm: '',
    searchTermScheduled: '',
    searchResult: [],
  };

  @boundMethod
  handleChangeTerm( { currentTarget: { value } } : SyntheticEvent< HTMLInputElement > ) {
    const newSearchTerm = value || '';
    this.setState( { searchTerm: newSearchTerm } );
    setTimeout( () => this.search( newSearchTerm.trim() ), 0.5 );
  }

  search( searchTerm : string ) {
    const { searchTermScheduled } = this.state;
    if ( searchTerm === searchTermScheduled ) return;
    this.setState( {
      searchInProgress: true,
      searchTermScheduled: searchTerm,
    } );

    if ( searchTerm === '' ) this.setState( {
      searchInProgress: false,
      searchResult: [],
    } );

    const result = [];
    const resultSet = new Set();

    const wikidataApi = getWikidataApi();
    const allPromises = DEFAULT_LANGUAGES.map( languageCode => wikidataApi.getPromise( {
      action: 'wbsearchentities',
      language: languageCode,
      strictlanguage: false,
      type: 'item',
      limit: MAX_ITEMS,
      search: searchTerm,
    } ).then( ( { search } ) => {
      search.forEach( ( { id } ) => {
        if ( !resultSet.has( id ) ) {
          result.push( id );
          resultSet.add( id );
        }
      } );

      if ( this.state.searchTermScheduled !== searchTerm ) return;
      this.setState( { searchResult: result } );
    } ) );

    Promise.all( allPromises ).then(
      () => this.setState( {
        searchInProgress: false,
      } )
    );
  }

  handleClickF( entityId : string ) {
    return () => this.props.onInsert( entityId );
  }

  render() {
    const { searchTerm, searchInProgress, searchTermScheduled, searchResult } = this.state;

    return <div className={styles.sourceLookupTab}>
      <input
        className={styles.searchTermInput}
        onChange={this.handleChangeTerm}
        placeholder="Текст (название, описание) для поиска существующего источника в Викиданных"
        value={searchTerm} />
      { searchInProgress
        ? <div style={{ padding: '1em' }}>{'Идёт поиск источников по строке «' + searchTermScheduled + '»'}</div>
        : searchResult.length !== 0
          ? null
          : searchTerm
            ? <div style={{ padding: '1em' }}>{'Источников по строке «' + searchTermScheduled + '» не найдено'}</div>
            : null}
      { searchResult.map( entityId =>
        <SourceItem
          entityId={entityId}
          key={entityId}
          onClick={this.handleClickF( entityId )} />
      ) }
    </div>;
  }

}
