import React, {ChangeEvent, useCallback, useMemo, useRef, useState} from 'react';
import Autosuggest from 'react-autosuggest';

import {useLabelDescription} from '../../caches/labelDescriptionCache';
import * as ApiUtils from '../../core/ApiUtils';
import {DEFAULT_LANGUAGES} from '../../utils/I18nUtils';
import LocalizedWikibaseItemInput from './LocalizedWikibaseItemInput';
import styles from './styles.css';
import Suggestion from './Suggestion';
import WikibaseItemInput from './WikibaseItemInput';

const NUMBER_OF_SUGGESTIONS_PER_LANGUAGE = 5;

interface PropsType {
  onSelect: (value: null | string) => any;
  readOnly?: boolean;
  testSuggestionsProvider?: (_: string) => string[];
  value: null | string;
}

interface SuggestedValue {
  entityId: string;
}

const PREFIX = 'SuggestedValue/';

const wikidataApi = ApiUtils.getWikidataApi();
const getSuggestionValue = (data: SuggestedValue) => PREFIX + data.entityId;
const renderSuggestion = (data: SuggestedValue) => <Suggestion entityId={data.entityId} />;

const AutocompleteMode = ({
  onSelect,
  readOnly,
  testSuggestionsProvider,
  value
}: PropsType) => {
  console.debug('AutocompleteMode');

  const wikibaseItemInputRef = useRef<WikibaseItemInput>();

  const [suggestions, setSuggestions] = useState<SuggestedValue[]>(value ? [{entityId: value}] : []);
  const [textEntityId, setTextEntityId] = useState<string | undefined>(undefined);
  const [textValue, setTextValue] = useState<string>(value || '');

  const labelDescription = useLabelDescription(textEntityId);

  const handleSuggestionsClearRequested = useCallback(() => { setSuggestions([]); }, [setSuggestions]);
  const handleSuggestionsFetchRequested = useCallback(({value}: {value: string}) => {
    if (testSuggestionsProvider) {
      setSuggestions(testSuggestionsProvider(value).map(entityId => ({entityId})));
      return;
    }

    const resultMap: Map<string, SuggestedValue> = new Map();
    const requestedValue = value;
    DEFAULT_LANGUAGES.forEach(async language => {
      const result = await wikidataApi.getPromise<WbSearchEntitiesActionResult>({
        action: 'wbsearchentities',
        language,
        limit: NUMBER_OF_SUGGESTIONS_PER_LANGUAGE,
        search: value,
        type: 'item',
      });

      // may be out of sync, another string already required
      if (requestedValue !== value) return;

      result.search.forEach(item => resultMap.set(item.id, {entityId: item.id}));
      setSuggestions(Array.from(resultMap.values()));
    });
  }, [setSuggestions, testSuggestionsProvider]);

  const handleChange = useCallback((
    _event: ChangeEvent< HTMLElement >,
    {method, newValue, ...etc}: {method: string; newValue: string}
  ) => {
    console.debug('AutocompleteMode', 'handleChange', method, newValue, etc);
    if (newValue.startsWith(PREFIX))
      newValue = newValue.substring(PREFIX.length);

    switch (method) {
    case 'type': {
      if (!newValue || newValue.trim() === '') {
        onSelect(null);
        break;
      }
      setTextEntityId(undefined);
      setTextValue(newValue);
      if (/^Q\d+$/.test(newValue.trim())) {
        onSelect(newValue.trim());
      }
      break;
    }
    default: {
      onSelect(newValue);
      setTextEntityId(newValue);
      setTextValue(newValue);
      break;
    }
    }
  }, [onSelect, setTextEntityId, setTextValue]);

  const renderInput = useCallback((inputProps: any) => {
    const {value, onChange, ref, ...etc} = inputProps;

    return <LocalizedWikibaseItemInput
      {...etc}
      inputRef={ref}
      onChange={onChange}
      value={textValue}
      wikibaseItemInputRef={wikibaseItemInputRef} />;
  }, [textValue, wikibaseItemInputRef]);

  const inputProps = useMemo(() => ({
    entityId: value || undefined,
    onChange: handleChange,
    readOnly,
    type: 'text',
    value: labelDescription?.label || textValue,
  }), [handleChange, labelDescription, readOnly, textValue, value]);

  return <Autosuggest<SuggestedValue>
    getSuggestionValue={getSuggestionValue}
    inputProps={inputProps as any}
    onSuggestionsClearRequested={handleSuggestionsClearRequested}
    onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
    renderInputComponent={renderInput}
    renderSuggestion={renderSuggestion}
    suggestions={suggestions}
    theme={styles} />;
};

export default AutocompleteMode;
