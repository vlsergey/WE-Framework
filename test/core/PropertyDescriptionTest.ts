import {assert} from 'chai';
import P1670 from '../entities/P1670';
import P1971 from '../entities/P1971';
import P2044 from '../entities/P2044';
import P21 from '../entities/P21';
import P345 from '../entities/P345';
import P85 from '../entities/P85';
import PropertyData from '../../src/core/PropertyData';
import PropertyDescription from '../../src/core/PropertyDescription';

describe( 'PropertyDescription', () => {

  const pd21 = new PropertyDescription( new PropertyData( P21 ) );
  const pd85 = new PropertyDescription( new PropertyData( P85 ) );
  const pd345 = new PropertyDescription( new PropertyData( P345 ) );
  const pd1670 = new PropertyDescription( new PropertyData( P1670 ) );
  const pd1971 = new PropertyDescription( new PropertyData( P1971 ) );
  const pd2044 = new PropertyDescription( new PropertyData( P2044 ) );

  it( 'allowedQualifiers: should provide', () => {
    assert.deepEqual(
      pd345.allowedQualifiers,
      [ 'P1932', 'P2241', 'P17', 'P1810' ] );
  } );

  it( 'countries: shall provide', () => {
    assert.deepEqual( pd345.countries, [ 'Q30' ] );
  } );

  it( 'formatUrl: P345 Correctly format URLs', () => {
    assert.equal( pd345.formatUrl( null ), '' );
    assert.equal( pd345.formatUrl( '' ), '' );
    assert.equal( pd345.formatUrl( 'tt0068646' ),
      'https://tools.wmflabs.org/wikidata-externalid-url/?p=345&url_prefix=http://www.imdb.com/&id=tt0068646' );
  } );

  it( 'formatUrl: P1670 Correctly format URLs', () => {
    assert.equal( pd1670.formatUrl( null ), '' );
    assert.equal( pd1670.formatUrl( '' ), '' );
    assert.equal( pd1670.formatUrl( 'abc' ),
      'https://www.collectionscanada.gc.ca/canadiana-authorities/index/view?index_name=cdnAutNbr&search_text=abc&page=1&cdnAutNbr=abc' );
  } );

  it( 'label: shall provide', () => {
    assert.equal( pd345.label, 'IMDb ID' );
  } );

  it( 'oneOf is empty if no consrain', () => {
    assert.isEmpty ( pd345.oneOf );
    assert.isEmpty( pd1971.oneOf );
    assert.isEmpty( pd2044.oneOf );
  } );

  it( 'oneOf is correctly parsed', () => {
    assert.deepEqual( pd21.oneOf, [ 'Q6581097',
      'Q6581072',
      'Q1097630',
      'Q303479',
      'Q189125',
      'Q1052281',
      'Q2449503',
      'Q48270',
      'Q1399232',
      'Q3277905',
      'Q746411',
      'Q350374',
      'Q660882',
      'Q44148',
      'Q43445',
      'Q207959',
      'Q301702',
      'Q27679766',
      'Q27679684',
      'Q3177577',
      'Q28873047',
      'Q505371' ] );
  } );

  it( 'Regexp shall be parsed', () => {
    assert.equal( pd345.regexp, '|ev\\d{7}\\/(19|20)\\d{2}(-\\d)?|(ch|co|ev|nm|tt)\\d{7}|ni\\d{8}' );
  } );

  it( 'quantityUnits is undefined if no constraints', () => {
    assert.isEmpty( pd345.quantityUnits );
  } );
  it( 'quantityUnitEnabled is false if no constraints', () => {
    assert.equal( pd345.quantityUnitEnabled, false );
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

  it( 'Source Websites parsed ', () => {
    assert.deepEqual( pd345.sourceWebsites, [ 'http://www.imdb.com/' ] );
  } );

  it( 'valueTypeConstraint: shall provide if defined', () => {
    assert.deepEqual( pd85.valueTypeConstraint, {
      instanceOf: [ 'Q207628' ],
    } );
  } );

} );
