// @flow

export default function( dispatch ) {
  const identityF = x => x;
  const itemValue = numericId => ( { 'entity-type': 'item', 'numeric-id': '' + numericId, 'id': 'Q' + numericId } );

  const doFillClaim = ( property, datatype, datavalue, normalizeF ) =>
    dispatch( { type: 'CLAIMS_FILL', property, datatype, datavalue, normalizeF } );

  const doFillItemClaim = ( property, numericId, normilizeF ) =>
    doFillClaim( property, 'wikibase-item', { type: 'wikibase-entityid', value: itemValue( numericId ) }, normilizeF || identityF );
  const doFillMonolingualTextClaim = ( property, language, text ) =>
    doFillClaim( property, 'monolingualtext', { type: 'monolingualtext', value: { language, text } }, identityF );
  const doFillTimeClaim = ( property, time ) =>
    doFillClaim( property, 'time', { type: 'time', value: {
      time, timezone: 0, before: 0, after: 0, precision: 11,
      calendarmodel: 'http://www.wikidata.org/entity/Q1985727',
    } }, identityF );
  const doFillStringClaim = ( property, value ) =>
    doFillClaim( property, 'string', { type: 'string', value }, identityF );
  const doFillUrlClaim = ( property, value ) =>
    doFillClaim( property, 'url', { type: 'string', value }, identityF );

  return { doFillItemClaim, doFillMonolingualTextClaim, doFillStringClaim, doFillTimeClaim, doFillUrlClaim };
}
