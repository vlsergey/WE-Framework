// @flow

import { parseJustLinks } from 'enhancements/viaf/ViafPropertyDataValueEditor';
import { parseResponse } from 'enhancements/viaf/queryViafProperties';
import viafResponse from './viafResponse';
import wqsResponse from './wqsResponse';

describe( 'enhancements/viaf/ViafPropertyDataValueEditor', () => {

  describe( 'parseJustLinks', () => {

    it( 'Can parse Puskin result', () => {
      const viaf2Property = parseResponse( wqsResponse );
      parseJustLinks( viaf2Property, viafResponse, ( propertyId, value ) =>
        console.debug( 'For property ' + propertyId + ' new value is ' + value ) );
    } );

  } );

} );
