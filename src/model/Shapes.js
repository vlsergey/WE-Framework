import expect from 'expect';
import PropTypes from 'prop-types';

export const Claim = {
  mainsnak: PropTypes.shape( Snak ),
};

let claimIdCounters = 0;

export function newStatementClaim( propertyId, datatype ) {
  expect( propertyId ).toBeA( 'string' );
  expect( datatype ).toBeA( 'string' );

  return {
    id: 'new#' + claimIdCounters++,
    mainsnak: {
      ...emptySnak(),
      snaktype: 'value',
      property: propertyId,
      datatype,
    },
    rank: 'normal',
    type: 'statement',
  };
}

export const DataValue = {
  type: PropTypes.string,
  value: PropTypes.any,
};

export const Entity = {
  claims: PropTypes.object,
};

export const Snak = {
  snaktype: PropTypes.oneOf( [ 'value', 'novalue', 'somevalue' ] ),
  property: PropTypes.string,
  hash: PropTypes.string,
  datavalue: PropTypes.shape( DataValue ),
  type: PropTypes.string,
  id: PropTypes.string,
  rank: PropTypes.oneOf( [ 'preferred', 'normal', 'deprecated' ] ),
};

export function emptySnak( ) {
  return {

  };
}
