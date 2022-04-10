import {useMemo} from 'react';

import PropertyData from '../core/PropertyData';
import PropertyDescription from '../core/PropertyDescription';
import {usePropertyData} from './propertyDataCache';
import {CacheData as StringPropertyValuesCache, useStringPropertyValues} from './stringPropertyValuesCache';

const EMPTY_ARRAY = [] as const;

function mergeToPropertyDescriptions (
    propertyData: PropertyData | undefined,
    countriesCacheData: StringPropertyValuesCache,
    languagesCacheData: StringPropertyValuesCache
): (PropertyDescription | undefined) {
  if (!propertyData) return undefined;

  const countryFlags = propertyData.countries
    .flatMap(countryEntityId => countriesCacheData[countryEntityId]?.P41 || EMPTY_ARRAY);
  const countryLanguageIds = propertyData.countries
    .flatMap(countryEntityId => countriesCacheData[countryEntityId]?.P37 || EMPTY_ARRAY);

  let languageIds = propertyData.sourceWebsitesLanguages;
  if (!languageIds || languageIds.length === 0) {
    languageIds = countryLanguageIds;
  }

  const languageCodes = languageIds
    .flatMap(entityId => languagesCacheData[entityId]?.P424 || EMPTY_ARRAY);

  return new PropertyDescription(
    propertyData,
    countryFlags,
    languageCodes,
    languageIds
  );
}

export default function usePropertyDescription (propertyId: string | undefined) : (PropertyDescription | undefined) {
  const propertyData = usePropertyData(propertyId);

  const countryIds = propertyData?.countries || EMPTY_ARRAY;
  const countriesData = useStringPropertyValues(countryIds);

  const countriesOfficialLanguagesIds = useMemo(() =>
    countryIds.flatMap<string>(countryEntityId => countriesData[countryEntityId]?.P37 || EMPTY_ARRAY)
  , [countryIds, countriesData]);

  const sourceWebsitesLanguages = propertyData?.sourceWebsitesLanguages || EMPTY_ARRAY;

  const allLanguageIds = useMemo(() =>
    [...new Set([...countriesOfficialLanguagesIds, ...sourceWebsitesLanguages])]
  , [countriesOfficialLanguagesIds, sourceWebsitesLanguages]);

  const languagesData = useStringPropertyValues(allLanguageIds);

  const propertyDescription = useMemo(() =>
    mergeToPropertyDescriptions(propertyData, countriesData, languagesData)
  , [propertyData, countriesData, languagesData]);

  return propertyDescription;
}
