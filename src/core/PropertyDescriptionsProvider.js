import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
import deepEqual from 'deep-equal';
import { defaultMemoize } from 'reselect';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import { propertyDescriptionQueue } from 'caches/actions';
import PropTypes from 'prop-types';
import StringPropertyValuesProvider from 'caches/StringPropertyValuesProvider';

const EMPTY_ARRAY = [];

const intern = x => Array.isArray( x ) && x.length === 0 ? EMPTY_ARRAY : x;

const calcCountryFlags = ( countriesCache, countries ) => intern( countries
  .map( country => countriesCache[ country ] )
  .filter( cacheItem => !!cacheItem )
  .flatMap( cacheItem => cacheItem.P41 || EMPTY_ARRAY ) );

const calcCountryLanguageIds = ( countriesCache, countries ) => intern( countries
  .map( country => countriesCache[ country ] )
  .filter( cacheItem => !!cacheItem )
  .flatMap( cacheItem => cacheItem.P37 || EMPTY_ARRAY ) );

export default class PropertyDescriptionsProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    propertyIds: PropTypes.arrayOf( PropTypes.string ).isRequired,
  }

  propertyDescriptionMemoizeCache = {};

  memoize = defaultMemoize(
    ( propertyIds, propertyDescriptionCache, countriesCache, languagesCache ) => {
      // TODO: report bug in eslint!
      /* eslint no-invalid-this: 0 */
      const echancedCache = {};

      propertyIds.forEach( propertyId => {
        const propertyDescription = propertyDescriptionCache[ propertyId ];
        if ( propertyDescription == null )
          return null;
        expect( propertyDescription ).toBeA( PropertyDescription );

        const countryFlags = calcCountryFlags( countriesCache, propertyDescription.countries );
        const countryLanguageIds = calcCountryLanguageIds( countriesCache, propertyDescription.countries );

        let languageIds = propertyDescription.sourceWebsitesLanguages;
        if ( !languageIds || languageIds.length === 0 ) {
          languageIds = countryLanguageIds;
        }

        const languageCodes = intern( languageIds
          .filter( entityId => !!languagesCache[ entityId ] )
          .filter( entityId => !!languagesCache[ entityId ].P424 )
          .flatMap( entityId => languagesCache[ entityId ].P424 ) );

        const result = {
          ...propertyDescription,
          countryFlags,
          languageIds,
          languageCodes,
        };
        Object.setPrototypeOf( result, PropertyDescription.prototype );

        const perPropertyCache = this.propertyDescriptionMemoizeCache;
        const previous = perPropertyCache[ propertyId ];
        if ( !!previous && deepEqual( previous, result ) ) {
          echancedCache[ propertyId ] = previous;
        } else {
          echancedCache[ propertyId ] = result;
          perPropertyCache[ propertyId ] = result;
        }
      } );
      return echancedCache;
    }
  );

  memoizeAllLanguageIds = defaultMemoize( ( ids1, ids2 ) =>
    intern( [ ...new Set( [ ...ids1, ...ids2 ] ) ] )
  );

  memoizeAllCountriesLanguageIds = defaultMemoize( ( countriesCache, countries ) =>
    intern( calcCountryLanguageIds( countriesCache, countries ) )
  );

  memoizeCountries = defaultMemoize ( ( propertyIds, cache ) =>
    intern( propertyIds
      .filter( propertyId => !!cache[ propertyId ] )
      .map( propertyId => cache[ propertyId ] )
      .flatMap( propertyDescription => propertyDescription.countries ) )
  );

  memoizeSourceWebsitesLanguages = defaultMemoize ( ( propertyIds, cache ) =>
    intern( propertyIds
      .filter( propertyId => !!cache[ propertyId ] )
      .map( propertyId => cache[ propertyId ] )
      .flatMap( propertyDescription => propertyDescription.sourceWebsitesLanguages ) )
  );

  render() {
    const { children, propertyIds } = this.props;

    return <CacheValuesProvider
      action={propertyDescriptionQueue}
      cacheKeys={propertyIds}
      type={'PROPERTYDESCRIPTIONS'}>
      { propertyDescriptionCache => {
        if ( !propertyDescriptionCache )
          return children( null );

        const countries = this.memoizeCountries( propertyIds, propertyDescriptionCache );
        return <StringPropertyValuesProvider entityIds={countries}>
          { countriesCache => {
            const countriesOfficialLanguagesIds = this.memoizeAllCountriesLanguageIds( countriesCache, countries );
            expect( countriesOfficialLanguagesIds ).toBeAn( 'array' );

            const sourceWebsitesLanguagesIds = this.memoizeSourceWebsitesLanguages( propertyIds, propertyDescriptionCache );
            expect( countriesOfficialLanguagesIds ).toBeAn( 'array' );

            const allLanguageIds = this.memoizeAllLanguageIds( countriesOfficialLanguagesIds, sourceWebsitesLanguagesIds );
            expect( countriesOfficialLanguagesIds ).toBeAn( 'array' );

            return <StringPropertyValuesProvider entityIds={allLanguageIds}>
              { languagesCache =>
                children( this.memoize( propertyIds, propertyDescriptionCache, countriesCache, languagesCache ) )
              }
            </StringPropertyValuesProvider>;
          } }
        </StringPropertyValuesProvider>;
      } }
    </CacheValuesProvider>;
  }
}
