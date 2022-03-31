import React, {PureComponent} from 'react';
import {defaultMemoize} from 'reselect';

import PropertyData from '../core/PropertyData';
import PropertyDescription from '../core/PropertyDescription';
import deepEqual from '../utils/deepEqual';
import CacheValuesProvider, {CacheType} from './CacheValuesProvider';
import propertyDataCacheController from './propertyDataCache';
import {CacheData as StringPropertyValuesCache, StringPropertyValuesProvider} from './stringPropertyValuesCache';

const EMPTY_ARRAY = [] as const;

const intern = (x?: readonly string[]) => !!x && x.length !== 0 ? x : EMPTY_ARRAY;

const calcCountryFlags = (
  countriesCacheData: any,
  countries: readonly string[]
) => intern(countries.flatMap<string>(
  (countryEntityId: string) => countriesCacheData[countryEntityId]?.P41 || EMPTY_ARRAY)
);

const calcCountryLanguageIds = (
  countriesCacheData: any,
  countries: readonly string[]
) => intern(countries.flatMap<string>(
  (countryEntityId: string) => countriesCacheData[countryEntityId]?.P37 || EMPTY_ARRAY)
);

interface PropsType {
  children: (result: CacheType<PropertyDescription>) => any;
  propertyIds: readonly string[];
}

export default class PropertyDescriptionsProvider
  extends PureComponent<PropsType> {

  propertyDescriptionMemoizeCache: Record<string, PropertyDescription> = {};

  memoize = defaultMemoize(
    (propertyIds: readonly string[],
      propertyDataCacheData: Record<string, PropertyData>,
      countriesCacheData: any,
      languagesCacheData: StringPropertyValuesCache
    ): Record<string, PropertyDescription> => {
      // TODO: report bug in eslint!
      /* eslint no-invalid-this: 0 */
      const echancedCache: Record< string, PropertyDescription > = {};

      propertyIds.forEach(propertyId => {
        const propertyData = propertyDataCacheData[propertyId];
        if (!propertyData) return;

        const countryFlags = calcCountryFlags(countriesCacheData, propertyData.countries);
        const countryLanguageIds = calcCountryLanguageIds(countriesCacheData, propertyData.countries);

        let languageIds = propertyData.sourceWebsitesLanguages;
        if (!languageIds || languageIds.length === 0) {
          languageIds = countryLanguageIds;
        }

        const languageCodes = intern(languageIds
          .flatMap(entityId => languagesCacheData[entityId]?.P424 || EMPTY_ARRAY));

        const result = new PropertyDescription(
          propertyData,
          countryFlags,
          languageCodes,
          languageIds
        );

        const perPropertyCache = this.propertyDescriptionMemoizeCache;
        const previous = perPropertyCache[propertyId];
        if (!!previous && deepEqual(previous, result)) {
          echancedCache[propertyId] = previous;
        } else {
          echancedCache[propertyId] = result;
          perPropertyCache[propertyId] = result;
        }
      });
      return echancedCache;
    }
  );

  memoizeAllLanguageIds = defaultMemoize((ids1: readonly string[], ids2: readonly string[]) =>
    intern([...new Set([...ids1, ...ids2])])
  );

  memoizeAllCountriesLanguageIds = defaultMemoize((countriesCacheData: any, countries: readonly string[]) =>
    intern(calcCountryLanguageIds(countriesCacheData, countries))
  );

  memoizeCountries = defaultMemoize((
    propertyIds: readonly string[],
    propertyDataCacheData: any
  ) => intern(propertyIds
    .filter(propertyId => !!propertyDataCacheData[propertyId])
    .map(propertyId => propertyDataCacheData[propertyId])
    .flatMap<string>((propertyData: PropertyData) => propertyData.countries || EMPTY_ARRAY))
  );

  memoizeSourceWebsitesLanguages = defaultMemoize((
    propertyIds: readonly string[],
    cacheData: any
  ) => intern(propertyIds
    .filter(propertyId => !!cacheData[propertyId])
    .map(propertyId => cacheData[propertyId])
    .flatMap<string>(propertyData => propertyData.sourceWebsitesLanguages || EMPTY_ARRAY))
  );

  override render () {
    const {children, propertyIds} = this.props;

    return <CacheValuesProvider
      cache={propertyDataCacheController}
      cacheKeys={propertyIds}>
      { propertyDataCache => {
        if (!propertyDataCache)
          return children({});

        const countries = this.memoizeCountries(propertyIds, propertyDataCache);
        return <StringPropertyValuesProvider cacheKeys={countries}>
          { countriesCacheData => {
            const countriesOfficialLanguagesIds = this.memoizeAllCountriesLanguageIds(countriesCacheData, countries);
            const sourceWebsitesLanguagesIds = this.memoizeSourceWebsitesLanguages(propertyIds, propertyDataCache);
            const allLanguageIds = this.memoizeAllLanguageIds(countriesOfficialLanguagesIds, sourceWebsitesLanguagesIds);

            return <StringPropertyValuesProvider cacheKeys={allLanguageIds}>
              { languagesCacheData =>
                children(this.memoize(propertyIds, propertyDataCache, countriesCacheData, languagesCacheData))
              }
            </StringPropertyValuesProvider>;
          } }
        </StringPropertyValuesProvider>;
      } }
    </CacheValuesProvider>;
  }
}
