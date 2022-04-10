import React, {useMemo} from 'react';
import {defaultMemoize} from 'reselect';

import PropertyDescription from '../../core/PropertyDescription';
import compare from '../../utils/compare';
import compareLanguageCodes from '../../utils/compareLanguageCodes';
import stableSort from '../../utils/stableSort';

const compareByLabel = (a: TempItemToSort, b: TempItemToSort) =>
  compare(a.label, b.label);
const compareByLanguageCodes = (a: TempItemToSort, b: TempItemToSort) =>
  compareLanguageCodes(a.languageCodes, b.languageCodes);

interface TempItemToSort {
  label?: string;
  languageCodes: readonly string[];
  propertyId: string;
}

const sort = defaultMemoize((
  cache: Record< string, PropertyDescription >,
  propertyIds: readonly string[],
  sortBy: readonly string[]
) => {
  const toSort = propertyIds.map<TempItemToSort>(propertyId => ({
    propertyId,
    label: cache[propertyId]?.label || '',
    languageCodes: cache[propertyId]?.languageCodes || [],
  }));

  for (let sortByIndex = sortBy.length - 1; sortByIndex >= 0; sortByIndex--) {
    const sortMethod = sortBy[sortByIndex];
    if (!sortMethod) continue;

    switch (sortMethod) {
    case 'language': stableSort(toSort, compareByLanguageCodes); break;
    case 'label': stableSort(toSort, compareByLabel); break;
    default: mw.log('Unknown sort method: ' + sortMethod); break;
    }
  }
  return toSort.map(item => item.propertyId);
});

interface PropsType {
  children: (propertyIds: readonly string[]) => any;
  propertyIds: readonly string[];
  propertyDescriptionCache: Record< string, PropertyDescription >;
  sortBy: string[];
}

// TODO: replace with hook
const FieldsSortBy = ({
  children, propertyIds, propertyDescriptionCache, sortBy
}: PropsType) => {
  const sorted = useMemo(() =>
    !!sortBy && sortBy.length > 0 ? sort(propertyDescriptionCache, propertyIds, sortBy) : propertyIds
  , [sortBy, propertyDescriptionCache, propertyIds]);
  return children(sorted);
};

export default React.memo(FieldsSortBy);
