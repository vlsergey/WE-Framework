let claimIdCounters = 0;

export function newStatementClaim(
    propertyId : string,
    datatype : string
) : ClaimType {
  return {
    id: 'new#' + claimIdCounters++,
    mainsnak: {
      snaktype: 'value',
      property: propertyId,
      datatype,
    },
    rank: 'normal',
    type: 'statement',
  };
}
