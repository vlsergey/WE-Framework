import assert from 'assert';
import P1971 from '../entities/P1971';
import P2044 from '../entities/P2044';
import P345 from '../entities/P345';
import PropertyDescription from 'core/PropertyDescription';

describe( 'PropertyDescription', () => {

  const pd345 = new PropertyDescription( P345 );
  const pd1971 = new PropertyDescription( P1971 );
  const pd2044 = new PropertyDescription( P2044 );

  it( 'Label shall be parsed', () => {
    assert.equal( pd345.label, 'IMDb ID' );
  } );

  it( 'Countries shall be parsed', () => {
    assert.deepEqual( pd345.countries, [ 'Q30' ] );
  } );

  it( 'Regexp shall be parsed', () => {
    assert.equal( pd345.regexp, '|ev\\d{7}\\/(19|20)\\d{2}(-\\d)?|(ch|co|ev|nm|tt)\\d{7}|ni\\d{8}' );
  } );

  it( 'quantityUnitEnabled is undefined if no consrain', () => {
    assert.equal( pd345.quantityUnitEnabled, undefined );
  } );

  it( 'quantityUnitEnabled is true if constrain is "novalue"', () => {
    assert.equal( pd1971.quantityUnitEnabled, false );
  } );

  it( 'quantityUnitEnabled is false if has list of allowed units', () => {
    assert.equal( pd2044.quantityUnitEnabled, true );
  } );

  it( 'Quantity Units parsed if has list of allowed units', () => {
    assert.deepEqual( pd2044.quantityUnits, [ 'Q11573', 'Q828224', 'Q3710' ] );
  } );

  it( 'Correctly format URLs', () => {
    assert.equal( pd345.formatUrl( null ), '' );
    assert.equal( pd345.formatUrl( '' ), '' );
    assert.equal( pd345.formatUrl( 'tt0068646' ),
      'https://tools.wmflabs.org/wikidata-externalid-url/?p=345&url_prefix=http://www.imdb.com/&id=tt0068646' );
  } );

  it( 'Should provide allowed qualifiers', () => {
    assert.deepEqual(
      pd345.allowedQualifiers,
      [ 'P1932', 'P2241', 'P17', 'P1810' ] );
  } );

} );
