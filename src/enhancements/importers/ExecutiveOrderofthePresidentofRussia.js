import { Template } from 'wikitext-dom';

class Importer {

  key = 'ExecutiveOrderofthePresidentofRussia';

  canImport( dom ) {
    return dom.getChildByClass( Template )
      .filter( tpl => ( tpl.getTitleAsString() || '' ).trim() === 'Указ Президента РФ' )
      .length !== 0;
  }

  process( dispatch, dom ) {

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

    dom.getChildByClass( Template )
      .filter( tpl => ( tpl.getTitleAsString() || '' ).trim() === 'Указ Президента РФ' )
      .forEach( tpl => {

        // type <= Executive Order of the President of Russia
        doFillItemClaim( 'P31', 2061228, oldValue => oldValue && oldValue.id === 'Q1428955' ? itemValue( 2061228 ) : oldValue );
        // language <= Russian
        doFillItemClaim( 'P407', 7737 );
        // author <= President of Russia
        doFillItemClaim( 'P50', 218295 );
        // published in <= Собрание законодательства Российской Федерации
        doFillItemClaim( 'P1433', 4426104 );

        const name = ( tpl.getValueByNameAsString( 'НАЗВАНИЕ' ) || '' ).trim();
        if ( name ) {
          doFillMonolingualTextClaim( 'P1476', 'ru', name );
          dispatch( { type: 'DESCRIPTION_CHANGE', language: 'ru', newValue: { language: 'ru', value: name } } );
        }

        const date = ( tpl.getValueByNameAsString( 'ДАТА' ) || '' ).trim();
        if ( date ) {
          const [ , d, m, y ] = /^[\s\r\n]*(\d+)\.(\d+).(\d+)[\s\r\n]*$/g.exec( date );
          if ( d && m && y ) {
            doFillTimeClaim( 'P571', '+' + y + '-' + m + '-' + d + 'T00:00:00Z' );
          }
        }

        const number = ( tpl.getValueByNameAsString( 'НОМЕР' ) || '' ).trim();
        if ( number ) doFillStringClaim( 'P1545', number );

        const source = ( tpl.getValueByNameAsString( 'ИСТОЧНИК' ) || '' ).trim();
        if ( source && source.startsWith( 'http' ) ) doFillUrlClaim( 'P953', source );

      } );
  }

}

const instance = new Importer();
export default instance;
