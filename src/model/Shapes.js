let claimIdCounters = 0;

export function newStatementClaim(
    propertyId : string,
    datatype : string
) : ClaimType {
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

export function emptySnak( ) : SnakType {
  return {
    rank: 'normal',
  };
}
