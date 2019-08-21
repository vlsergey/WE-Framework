import doFillUtils from './doFillUtils';
import { Template } from 'wikitext-dom';

const ITEM_ID_LEGAL_INSTRUMENT = 'Q1428955';

const SUPPORTED_TEMPLATE_NAME = 'Постановление Правительства РФ';

const isTemplateSupported = tpl =>
  ( tpl.getTitleAsString() || '' ).trim() === SUPPORTED_TEMPLATE_NAME;

class Importer {
  key = 'ПостановлениеПравительстваРФ';
  label = '{{' + SUPPORTED_TEMPLATE_NAME + '}}';

  canImport( dom ) {
    return dom.getChildByClass( Template )
      .filter( isTemplateSupported )
      .length !== 0;
  }

  process( dispatch, dom ) {

    const itemValue = numericId => ( { 'entity-type': 'item', 'numeric-id': '' + numericId, 'id': 'Q' + numericId } );
    const { doFillItemClaim, doFillMonolingualTextClaim, doFillStringClaim, doFillTimeClaim, doFillUrlClaim } = doFillUtils( dispatch );

    dom.getChildByClass( Template )
      .filter( isTemplateSupported )
      .forEach( tpl => {

        doFillItemClaim( 'P31', 4374199, oldValue =>
          oldValue && oldValue.id === ITEM_ID_LEGAL_INSTRUMENT ? itemValue( 4374199 ) : oldValue );

        // language <= Russian
        doFillItemClaim( 'P407', 7737 );
        // author <= Government of Russia
        doFillItemClaim( 'P50', 1140115 );
        // published in <= Собрание законодательства Российской Федерации
        doFillItemClaim( 'P1433', 4426104 );

        const name = ( tpl.getValueByNameAsString( 'НАЗВАНИЕ' ) || '' ).trim();
        if ( name ) {
          doFillMonolingualTextClaim( 'P1476', 'ru', name );
          dispatch( { type: 'DESCRIPTION_CHANGE', language: 'ru', newValue: { language: 'ru', value: name } } );
        }

        const date = ( tpl.getValueByNameAsString( 'ДАТА' ) || '' ).trim();
        if ( date ) {
          const match : ?string[] = /^[\s\r\n]*(\d+)\.(\d+).(\d+)[\s\r\n]*$/g.exec( date );
          if ( match ) {
            const [ , d, m, y ] = match;
            if ( d && m && y ) {
              doFillTimeClaim( 'P571', '+' + y + '-' + m + '-' + d + 'T00:00:00Z' );
            }
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
