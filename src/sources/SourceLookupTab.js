import React, { PureComponent } from 'react';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import { getWikidataApi } from 'core/ApiUtils';
import PropTypes from 'prop-types';
import SourceItem from './SourceItem';
import styles from './styles.css';

const MAX_ITEMS = 15;

export default class SourceLookupTab extends PureComponent {

  static propTypes = {
    onInsert: PropTypes.func.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.state = {
      searchTerm: '',
      searchTermScheduled: '',
      searchResult: [],
    };

    this.handleChangeTerm = event => {
      const newSearchTerm = event.target.value || '';
      this.setState( { searchTerm: newSearchTerm } );
      setTimeout( this.search( newSearchTerm.trim() ), 0.5 );
    };
  }

  search( searchTerm ) {
    const { searchTermScheduled } = this.state;
    if ( searchTerm === searchTermScheduled ) return;
    this.setState( { searchTermScheduled: searchTerm } );

    if ( searchTerm === '' ) this.setState( { searchResult: [] } );

    const result = [];
    const resultSet = new Set();

    DEFAULT_LANGUAGES.forEach( languageCode => {
      if ( result.size >= MAX_ITEMS ) return;

      getWikidataApi().get( {
        action: 'wbsearchentities',
        language: languageCode,
        strictlanguage: false,
        type: 'item',
        limit: MAX_ITEMS,
        search: searchTerm,
      } ).done( ( { search } ) => {
        search.forEach( ( { id } ) => {
          if ( !resultSet.has( id ) ) {
            result.push( id );
            resultSet.add( id );
          }
        } );

        if ( this.state.searchTermScheduled !== searchTerm ) return;
        this.setState( { searchResult: result } );
      }
      );
    } );
  }

  handleClickF( entityId ) {
    return () => this.props.onInsert( entityId );
  }

  render() {
    const { searchTerm, searchResult } = this.state;

    return <div className={styles.sourceLookupTab}>
      <input
        className={styles.searchTermInput}
        onChange={this.handleChangeTerm}
        placeholder="Текст (название, описание) для поиска существующего источника в Викиданных"
        value={searchTerm} />
      { searchResult.map( entityId =>
        <SourceItem
          entityId={entityId}
          key={entityId}
          onClick={this.handleClickF( entityId )} />
      ) }
    </div>;
  }

}
