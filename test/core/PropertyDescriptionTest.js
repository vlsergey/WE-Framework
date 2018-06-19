import assert from 'assert';
import p345 from '../entities/P345';
import PropertyDescription from '../../src/core/PropertyDescription';

describe( 'PropertyDescription', () => {
  describe( 'Should parse p345', () => {

    const propertyDescription = new PropertyDescription( p345 );

    it( 'Label shall be parsed', () => {
      assert.equal( propertyDescription.label, 'IMDb ID' );
    } );

    it( 'Regexp shall be parsed', () => {
      assert.equal( propertyDescription.regexp, '|ev\\d{7}\\/(19|20)\\d{2}(-\\d)?|(ch|co|ev|nm|tt)\\d{7}|ni\\d{8}' );
    } );

    it( 'Correctly format URLs', () => {
      assert.equal( propertyDescription.formatUrl( null ), '' );
      assert.equal( propertyDescription.formatUrl( '' ), '' );
      assert.equal( propertyDescription.formatUrl( 'tt0068646' ),
        'https://tools.wmflabs.org/wikidata-externalid-url/?p=345&url_prefix=http://www.imdb.com/&id=tt0068646' );
    } );

  } );
} );
