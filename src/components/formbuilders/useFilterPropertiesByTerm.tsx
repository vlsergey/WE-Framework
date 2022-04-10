import {useMemo} from 'react';

import {usePropertiesData} from '../../caches/propertyDataCache';
import PropertyData from '../../core/PropertyData';
import {DEFAULT_LANGUAGES} from '../../utils/I18nUtils';

interface TempItemToFilter {
  descriptions?: Record<string, string>;
  labels?: Record<string, string>;
  property: string;
}

const filterByTerm = (
  cache: Record< string, PropertyData >,
  propertyIds: readonly string[],
  originalTerm: string | null
): readonly string[] => {
  if (!originalTerm || originalTerm.trim() === '') return propertyIds;
  const term = originalTerm.trim().toLowerCase();

  let toFilter = propertyIds.map<TempItemToFilter>(propertyId => ({
    property: propertyId,
    labels: cache[propertyId]?.labels,
    descriptions: cache[propertyId]?.descriptions,
  }));

  const tempResult: TempItemToFilter[] = [];

  type GetterType = (item: TempItemToFilter) => string | undefined;
  type CheckerType = (str: string) => boolean;

  const filterImpl = (fieldF: GetterType, checkF: CheckerType) => {
    toFilter = toFilter.filter(item => {
      const fieldValue = fieldF(item);
      if (typeof fieldValue === 'string' && checkF(fieldValue.toLowerCase())) {
        tempResult.push(item);
        return false;
      }
      return true;
    });
  };

  // TODO: aliases?
  filterImpl(item => item.property, value => value.startsWith(term));
  for (const language of DEFAULT_LANGUAGES) {
    filterImpl(item => item.labels?.[language], value => value.startsWith(term));
    filterImpl(item => item.descriptions?.[language], value => value.startsWith(term));
  }

  filterImpl(item => item.property, value => value.includes(term));
  for (const language of DEFAULT_LANGUAGES) {
    filterImpl(item => item.labels?.[language], value => value.includes(term));
    filterImpl(item => item.descriptions?.[language], value => value.includes(term));
  }

  return tempResult.map(item => item.property);
};

export default function useFilterPropertiesByTerm (
    propertyIds: readonly string[],
    term: string
): readonly string[] {
  const propertiesDataCache = usePropertiesData(propertyIds);
  return useMemo(() =>
    filterByTerm(propertiesDataCache, propertyIds, term)
  , [propertiesDataCache, propertyIds, term]);
}
