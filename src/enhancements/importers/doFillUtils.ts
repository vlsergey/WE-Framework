import {toWikibaseEntityIdValue} from '../../model/ModelUtils';

export default function (dispatch: any) {
  const identityF = <T>(x: T) => x;

  const doFillClaim = <T>(property: string, datatype: string, datavalue: DataValueType, normalizeF: (value: T) => T | null) =>
    dispatch({type: 'CLAIMS_FILL', property, datatype, datavalue, normalizeF});

  const doFillItemClaim = (property: string, entityId: string, normilizeF: ((value: WikibaseEntityIdValue) => WikibaseEntityIdValue) | null) =>
    doFillClaim(property, 'wikibase-item', {type: 'wikibase-entityid', value: toWikibaseEntityIdValue(entityId)}, normilizeF || ((x: WikibaseEntityIdValue) => x));
  const doFillMonolingualTextClaim = (property: string, language: string, text: string) =>
    doFillClaim(property, 'monolingualtext', {type: 'monolingualtext', value: {language, text}}, identityF);
  const doFillTimeClaim = (property: string, time: string) =>
    doFillClaim(property, 'time', {type: 'time', value: {
      time, timezone: 0, before: 0, after: 0, precision: 11,
      calendarmodel: 'http://www.wikidata.org/entity/Q1985727',
    }}, identityF);
  const doFillStringClaim = (property: string, value: string) =>
    doFillClaim(property, 'string', {type: 'string', value}, identityF);
  const doFillUrlClaim = (property: string, value: string) =>
    doFillClaim(property, 'url', {type: 'string', value}, identityF);

  return {doFillItemClaim, doFillMonolingualTextClaim, doFillStringClaim, doFillTimeClaim, doFillUrlClaim};
}
