import { collectClaimUpdates, collectEntityUpdates } from '../../src/core/save';
import assert from 'assert';
import Q2262932 from '../entities/Q2262932';

describe( 'save.js', () => {

  it( 'Should be able to report no changes for same objects', () => {

    const data = collectEntityUpdates( Q2262932, Q2262932 );
    assert.deepEqual( data, {} );

  } );

  it( 'Should be able to report no changes in claims for same objects', () => {

    const noChanges = collectClaimUpdates( Q2262932, Q2262932 );
    assert.deepEqual( noChanges, [] );

  } );

  it( 'Should be able to report changes in existing description', () => {

    const newEntity = {
      ...Q2262932,
      descriptions: {
        ...Q2262932.descriptions,
        en: {
          ...Q2262932.descriptions.en,
          value: 'Some new description',
        },
      },
    };

    const data = collectEntityUpdates( Q2262932, newEntity );
    assert.deepEqual( data, {
      descriptions: {
        en: {
          language: 'en',
          value: 'Some new description',
        },
      },
    } );

  } );

  it( 'Should be able to save without changes if datavalue is different instance with the same values', () => {
    const newEntity = {
      ...Q2262932,
      claims: {
        ...Q2262932.claims,
        P345: [
          {
            ...Q2262932.claims.P345[ 0 ],
            mainsnak: {
              ...Q2262932.claims.P345[ 0 ].mainsnak,
              datavalue: {
                ...Q2262932.claims.P345[ 0 ].mainsnak.datavalue,
                value: Q2262932.claims.P345[ 0 ].mainsnak.datavalue.value,
              },
            },
          },
        ],
      },
    };

    const noChanges = collectClaimUpdates( Q2262932, newEntity );
    assert.deepEqual( noChanges, [] );

  } );

  it( 'Should be able to find updated claim', () => {

    const newEntity = {
      ...Q2262932,
      claims: {
        ...Q2262932.claims,
        P345: [
          {
            ...Q2262932.claims.P345[ 0 ],
            mainsnak: {
              ...Q2262932.claims.P345[ 0 ].mainsnak,
              datavalue: {
                ...Q2262932.claims.P345[ 0 ].mainsnak.datavalue,
                value: 'tt9999999',
              },
            },
          },
        ],
      },
    };

    const singleChange = collectClaimUpdates( Q2262932, newEntity );
    assert.equal( 1, singleChange.length );
    assert.equal( 'tt9999999', singleChange[ 0 ].mainsnak.datavalue.value );
  } );

  it( 'Should be able to find replaced claim', () => {

    const newEntity = {
      ...Q2262932,
      claims: {
        ...Q2262932.claims,
        P345: [
          {
            ...Q2262932.claims.P345[ 0 ],
            id: 'somenewnonexistingid',
            mainsnak: {
              ...Q2262932.claims.P345[ 0 ].mainsnak,
              datavalue: {
                ...Q2262932.claims.P345[ 0 ].mainsnak.datavalue,
                value: 'tt9999999',
              },
            },
          },
        ],
      },
    };

    const singleChange = collectClaimUpdates( Q2262932, newEntity );
    assert.equal( 2, singleChange.length );
    // new claim
    assert.equal( 'undefined', typeof singleChange[ 0 ].id );
    assert.equal( 'tt9999999', singleChange[ 0 ].mainsnak.datavalue.value );
    // deleted claim
    assert.equal( Q2262932.claims.P345[ 0 ].id, singleChange[ 1 ].id );
    assert.equal( '', singleChange[ 1 ].remove );
  } );

} );
