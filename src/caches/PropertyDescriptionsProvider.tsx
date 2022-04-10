import React, {useMemo} from 'react';

import PropertyData from '../core/PropertyData';
import PropertyDescription from '../core/PropertyDescription';
import {usePropertiesData} from './propertyDataCache';
import {CacheData as StringPropertyValuesCache, useStringPropertyValues} from './stringPropertyValuesCache';

const EMPTY_ARRAY = [] as const;

function mergeToPropertyDescriptions (
    propertyIds: readonly string[],
    propertyDataCacheData: Record<string, PropertyData>,
    countriesCacheData: StringPropertyValuesCache,
    languagesCacheData: StringPropertyValuesCache
): Record<string, PropertyDescription> {
  const echancedCache: Record< string, PropertyDescription > = {};
  for (const propertyId of propertyIds) {
    const propertyData = propertyDataCacheData[propertyId];
    if (!propertyData) continue;

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

    const result = new PropertyDescription(
      propertyData,
      countryFlags,
      languageCodes,
      languageIds
    );

    echancedCache[propertyId] = result;
  }
  return echancedCache;
}

interface PropsType {
  children: (result: Record<string, PropertyDescription>) => any;
  propertyIds: readonly string[];
}

const PropertyDescriptionsProvider = ({
  children, propertyIds
}: PropsType) => {

  const propertiesData = usePropertiesData(propertyIds);

  const countryIds = useMemo(() =>
    propertyIds.flatMap(propertyId => propertiesData[propertyId]?.countries || EMPTY_ARRAY)
  , [propertyIds, propertiesData]);

  const countriesData = useStringPropertyValues(countryIds);

  const countriesOfficialLanguagesIds = useMemo(() =>
    countryIds.flatMap<string>(countryEntityId => countriesData[countryEntityId]?.P37 || EMPTY_ARRAY)
  , [countryIds, countriesData]);

  const sourceWebsitesLanguages = useMemo(() =>
    propertyIds.flatMap(propertyId => propertiesData[propertyId]?.sourceWebsitesLanguages || EMPTY_ARRAY)
  , [propertyIds, propertiesData]);

  const allLanguageIds = useMemo(() =>
    [...new Set([...countriesOfficialLanguagesIds, ...sourceWebsitesLanguages])]
  , [countriesOfficialLanguagesIds, sourceWebsitesLanguages]);

  const languagesData = useStringPropertyValues(allLanguageIds);

  const propertyDescriptions = useMemo(() =>
    mergeToPropertyDescriptions(propertyIds, propertiesData, countriesData, languagesData)
  , [propertyIds, propertiesData, countriesData, languagesData]);

  return children(propertyDescriptions);
};

export default React.memo(PropertyDescriptionsProvider);
