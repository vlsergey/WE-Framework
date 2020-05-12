// @flow

import assert from 'assert';
import Q1367759 from './Q1367759';
import Q2262932 from './Q2262932';
import Q30 from './Q30';
import Q56222548 from './Q56222548';
import Q652 from './Q652';
import Q752285 from './Q752285';

function assertOk( entity : EntityType ) {
  assert.ok( entity );
}

describe( 'Flow Definitions', () => {
  it( 'Q1367759 conforms to EntityType flow definition', () => assertOk( Q1367759 ) );
  it( 'Q2262932 conforms to EntityType flow definition', () => assertOk( Q2262932 ) );
  it( 'Q30 conforms to EntityType flow definition', () => assertOk( Q30 ) );
  it( 'Q56222548 conforms to EntityType flow definition', () => assertOk( Q56222548 ) );
  it( 'Q652 conforms to EntityType flow definition', () => assertOk( Q652 ) );
  it( 'Q752285 conforms to EntityType flow definition', () => assertOk( Q752285 ) );
} );
