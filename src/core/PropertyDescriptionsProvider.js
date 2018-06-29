import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
import { defaultMemoize } from 'reselect';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import { propertyDescriptionQueue } from 'caches/actions';
import PropTypes from 'prop-types';
import StringPropertyValuesProvider from 'caches/StringPropertyValuesProvider';

export default class PropertyDescriptionsProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    propertyIds: PropTypes.arrayOf( PropTypes.string ).isRequired,
  }

  memoize = defaultMemoize(
    ( propertyIds, propertyDescriptionCache, countriesCache, languagesCache ) => {
      const echancedCache = {};

      propertyIds.forEach( propertyId => {
        const propertyDescription = propertyDescriptionCache[ propertyId ];
        if ( propertyDescription == null )
          return null;
        expect( propertyDescription ).toBeA( PropertyDescription );

        //TODO: replace with flatMap as soon as awailable
        const countries = propertyDescription.countries;
        const countryFlags = [];
        countries.map( country => {
          const entity = countriesCache[ country ];
          if ( !entity || !entity.P41 ) return [];
          entity.P41.forEach( value => countryFlags.push( value ) );
        } );

        let languageCodes = [];
        if ( propertyDescription.sourceWebsitesLanguages.length > 0 ) {
          languageCodes = propertyDescription.sourceWebsitesLanguages
            .filter( entityId => !!languagesCache[ entityId ] )
            .filter( entityId => !!languagesCache[ entityId ].P424 )
            .map( entityId => languagesCache[ entityId ].P424 )
            .reduce( ( acc, cur ) => [ ...acc, ...cur ], [] );
        }

        const result = {
          ...propertyDescription,
          countryFlags,
          languageCodes,
        };
        Object.setPrototypeOf( result, PropertyDescription.prototype );

        echancedCache[ propertyId ] = result;
      } );
      return echancedCache;
    }
  );

  memoizeCountries = defaultMemoize ( ( propertyIds, cache ) =>
    propertyIds
      .filter( propertyId => !!cache[ propertyId ] )
      .map( propertyId => cache[ propertyId ] )
      .map( propertyDescription => propertyDescription.countries )
      .reduce( ( acc, cur ) => [ ...acc, ...cur ], [] )
  );

  memoizeSourceWebsitesLanguages = defaultMemoize ( ( propertyIds, cache ) =>
    propertyIds
      .filter( propertyId => !!cache[ propertyId ] )
      .map( propertyId => cache[ propertyId ] )
      .map( propertyDescription => propertyDescription.sourceWebsitesLanguages )
      .reduce( ( acc, cur ) => [ ...acc, ...cur ], [] )
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
            const sourceWebsitesLanguages = this.memoizeSourceWebsitesLanguages( propertyIds, propertyDescriptionCache );
            return <StringPropertyValuesProvider entityIds={sourceWebsitesLanguages}>
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
