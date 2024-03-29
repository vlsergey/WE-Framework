import React, {ChangeEvent, PureComponent} from 'react';

import {getWikidataApi} from '../core/ApiUtils';
import {DEFAULT_LANGUAGES} from '../utils/I18nUtils';
import SourceItem from './SourceItem';
import styles from './styles.css';

const MAX_ITEMS = 15;

interface PropsType {
  onInsert: (entityId: string) => any;
}

interface StateType {
  searchInProgress: boolean;
  searchResult: string[];
  searchTerm: string;
  searchTermScheduled: string;
}

export default class SourceLookupTab
  extends PureComponent<PropsType, StateType> {

  override state = {
    searchInProgress: false,
    searchTerm: '',
    searchTermScheduled: '',
    searchResult: [],
  };

  handleChangeTerm = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    const newSearchTerm = value || '';
    this.setState({searchTerm: newSearchTerm});
    setTimeout(() => void this.search(newSearchTerm.trim()), 0.5);
  };

  search = async (searchTerm: string) => {
    const {searchTermScheduled} = this.state;
    if (searchTerm === searchTermScheduled) return;
    this.setState({
      searchInProgress: true,
      searchTermScheduled: searchTerm,
    });

    if (searchTerm === '') this.setState({
      searchInProgress: false,
      searchResult: [],
    });

    const result = [] as string[];
    const resultSet = new Set();

    const wikidataApi = getWikidataApi();
    const allPromises = DEFAULT_LANGUAGES.map(async (languageCode: string) => {
      const actionResult = await wikidataApi.getPromise<WbSearchEntitiesActionResult>({
        action: 'wbsearchentities',
        language: languageCode,
        strictlanguage: false,
        type: 'item',
        limit: MAX_ITEMS,
        search: searchTerm,
      });
      const {search} = actionResult;
      search.forEach(({id}) => {
        if (!resultSet.has(id)) {
          result.push(id);
          resultSet.add(id);
        }
      });
      if (this.state.searchTermScheduled !== searchTerm)
        return;
      this.setState({searchResult: result});
    });

    await Promise.all(allPromises);
    this.setState({
      searchInProgress: false,
    });
  };

  handleClickF (entityId: string) {
    return () => this.props.onInsert(entityId);
  }

  override render () {
    const {searchTerm, searchInProgress, searchTermScheduled, searchResult} = this.state;

    return <div className={styles.sourceLookupTab}>
      <input
        className={styles.searchTermInput}
        onChange={this.handleChangeTerm}
        placeholder="Текст (название, описание) для поиска существующего источника в Викиданных"
        value={searchTerm} />
      { searchInProgress
        ? <div style={{padding: '1em'}}>{'Идёт поиск источников по строке «' + searchTermScheduled + '»'}</div>
        : searchResult.length !== 0
          ? null
          : searchTerm
            ? <div style={{padding: '1em'}}>{'Источников по строке «' + searchTermScheduled + '» не найдено'}</div>
            : null}
      { searchResult.map(entityId =>
        <SourceItem
          entityId={entityId}
          key={entityId}
          onClick={this.handleClickF(entityId)} />
      ) }
    </div>;
  }

}
