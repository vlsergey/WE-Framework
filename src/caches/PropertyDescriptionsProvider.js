// @flow

import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
import deepEqual from 'utils/deepEqual';
import { defaultMemoize } from 'reselect';
import PropertyDescription from 'core/PropertyDescription';
import propertyDescriptionCacheController from 'caches/propertyDescriptionCache';
import StringPropertyValuesProvider from 'caches/StringPropertyValuesProvider';

const EMPTY_ARRAY : any[] = Object.freeze( [] );
const EMPTY_OBJECT : any = Object.freeze( {} );
const EMPTY_MAP : Map< string, PropertyDescription > = Object.freeze( new Map() );

const intern = x => Array.isArray( x ) && x.length === 0 ? EMPTY_ARRAY : x;

const calcCountryFlags = (
  countriesCacheData : any,
  countries : string[]
) => intern( countries.flatMap<string>(
  ( countryEntityId : string ) => ( countriesCacheData[ countryEntityId ] || EMPTY_OBJECT ).P41 || EMPTY_ARRAY )
);

const calcCountryLanguageIds = (
  countriesCacheData : any,
  countries : string[]
) => intern( countries.flatMap<string>(
  ( countryEntityId : string ) => ( countriesCacheData[ countryEntityId ] || EMPTY_OBJECT ).P37 || EMPTY_ARRAY )
);

type PropsType = {
  children : Map< string, PropertyDescription > => any,
  propertyIds : string[],
};

export default class PropertyDescriptionsProvider
  extends PureComponent<PropsType> {

  propertyDescriptionMemoizeCache = {};

  memoize = defaultMemoize(
    ( propertyIds : string[],
      propertyDescriptionCacheData : any,
      countriesCacheData : any,
      languagesCacheData : any
    ) => {
      // TODO: report bug in eslint!
      /* eslint no-invalid-this: 0 */
      const echancedCache : Map< string, PropertyDescription > = new Map();

      propertyIds.forEach( propertyId => {
        const propertyDescription : ?PropertyDescription = propertyDescriptionCacheData[ propertyId ];
        if ( !propertyDescription ) return null;

        const countryFlags = calcCountryFlags( countriesCacheData, propertyDescription.countries );
        const countryLanguageIds = calcCountryLanguageIds( countriesCacheData, propertyDescription.countries );

        let languageIds = propertyDescription.sourceWebsitesLanguages;
        if ( !languageIds || languageIds.length === 0 ) {
          languageIds = countryLanguageIds;
        }

        const languageCodes = intern( languageIds
          .flatMap<string>( entityId => ( languagesCacheData[ entityId ] || EMPTY_OBJECT ).P424 || EMPTY_ARRAY ) );

        const result : PropertyDescription = Object.create( propertyDescription );
        result.countryFlags = countryFlags;
        result.languageIds = languageIds;
        result.languageCodes = languageCodes;

        const perPropertyCache = this.propertyDescriptionMemoizeCache;
        const previous = perPropertyCache[ propertyId ];
        if ( !!previous && deepEqual( previous, result ) ) {
          echancedCache.set( propertyId, previous );
        } else {
          echancedCache.set( propertyId, result );
          perPropertyCache[ propertyId ] = result;
        }
      } );
      return echancedCache;
    }
  );

  memoizeAllLanguageIds = defaultMemoize( ( ids1 : string[], ids2 : string[] ) =>
    intern( [ ...new Set( [ ...ids1, ...ids2 ] ) ] )
  );

  memoizeAllCountriesLanguageIds = defaultMemoize( ( countriesCacheData : any, countries : string[] ) =>
    intern( calcCountryLanguageIds( countriesCacheData, countries ) )
  );

  memoizeCountries = defaultMemoize( (
    propertyIds : string[],
    cacheData : any
  ) => intern( propertyIds
    .filter( propertyId => !!cacheData[ propertyId ] )
    .map( propertyId => cacheData[ propertyId ] )
    .flatMap<string>( propertyDescription => propertyDescription.countries || EMPTY_ARRAY ) )
  );

  memoizeSourceWebsitesLanguages = defaultMemoize( (
    propertyIds : string[],
    cacheData : any
  ) => intern( propertyIds
    .filter( propertyId => !!cacheData[ propertyId ] )
    .map( propertyId => cacheData[ propertyId ] )
    .flatMap<string>( propertyDescription => propertyDescription.sourceWebsitesLanguages || EMPTY_ARRAY ) )
  );

  render() {
    const { children, propertyIds } = this.props;

    return <CacheValuesProvider
      cache={propertyDescriptionCacheController}
      cacheKeys={propertyIds}>
      { propertyDescriptionCache => {
        if ( !propertyDescriptionCache )
          return children( EMPTY_MAP );

        const countries = this.memoizeCountries( propertyIds, propertyDescriptionCache );
        return <StringPropertyValuesProvider entityIds={countries}>
          { ( countriesCacheData : any ) => {
            const countriesOfficialLanguagesIds : any[] = this.memoizeAllCountriesLanguageIds( countriesCacheData, countries );
            const sourceWebsitesLanguagesIds : any[] = this.memoizeSourceWebsitesLanguages( propertyIds, propertyDescriptionCache );
            const allLanguageIds : any[] = this.memoizeAllLanguageIds( countriesOfficialLanguagesIds, sourceWebsitesLanguagesIds );

            return <StringPropertyValuesProvider entityIds={allLanguageIds}>
              { ( languagesCacheData : any ) =>
                children( this.memoize( propertyIds, propertyDescriptionCache, countriesCacheData, languagesCacheData ) )
              }
            </StringPropertyValuesProvider>;
          } }
        </StringPropertyValuesProvider>;
      } }
    </CacheValuesProvider>;
  }
}
