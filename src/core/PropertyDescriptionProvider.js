import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import { defaultMemoize } from 'reselect';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import { propertyDescriptionQueue } from 'caches/actions';
import PropTypes from 'prop-types';
import StringPropertyValuesProvider from 'caches/StringPropertyValuesProvider';

export default class PropertyDescriptionProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    propertyId: PropTypes.string.isRequired,
  }

  memoize = defaultMemoize( ( propertyDescription, stringValuesCache ) => {
    expect( propertyDescription ).toBeA( PropertyDescription );

    const countries = propertyDescription.countries;
    if ( !countries || countries.length === 0 || !stringValuesCache )
      return propertyDescription;

    //TODO: replace with flatMap as soon as awailable
    const countryFlags = [];
    countries.map( country => {
      const entity = stringValuesCache[ country ];
      if ( !entity || !entity.P41 ) return [];
      entity.P41.forEach( value => countryFlags.push( value ) );
    } );

    const result = {
      ...propertyDescription,
      countryFlags,
    };
    Object.setPrototypeOf( result, PropertyDescription.prototype );
    return result;
  } );

  render() {
    const { children, propertyId } = this.props;

    return <CacheValueProvider
      action={propertyDescriptionQueue}
      cacheKey={propertyId}
      type={'PROPERTYDESCRIPTIONS'}>
      { propertyDescription => {
        if ( !propertyDescription )
          return children( null );

        const countries = propertyDescription.countries;
        return <StringPropertyValuesProvider entityIds={countries}>
          { stringValuesCache => children( this.memoize( propertyDescription, stringValuesCache ) ) }
        </StringPropertyValuesProvider>;
      } }
    </CacheValueProvider>;
  }
}
