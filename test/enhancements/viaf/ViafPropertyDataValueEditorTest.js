import { parseJustLinks } from 'enhancements/viaf/ViafPropertyDataValueEditor';

describe( 'enhancements/viaf/ViafPropertyDataValueEditor', () => {

  describe( 'parseJustLinks', () => {

    it ( 'Can parse Puskin result', () => {

      const pushkin = { viafID: '66477450',
        B2Q: [ '0000075154' ],
        BAV: [ 'ADV10217094' ],
        BIBSYS: [ '97000967' ],
        BLBNB: [ '000281084' ],
        BNC: [ '.a10141716', 'BNC10000000000000000034797' ],
        BNCHL: [ 'BNC10000000000000000034797' ],
        BNE: [ 'XX910058' ],
        BNF: [ 'http://catalogue.bnf.fr/ark:/12148/cb12007375v' ],
        DBC: [ '870979.68840759' ],
        DE663: [ 'pe31654' ],
        DNB: [ 'http://d-nb.info/gnd/118641816' ],
        EGAXA: [ 'vtls001098006' ],
        ERRR: [ 'a11173397', 'a11135578' ],
        ICCU: [ 'IT\\ICCU\\CFIV\\001053' ],
        ISNI: [ '0000000121372055' ],
        JPG: [ '500324476' ],
        KRNLK: [ 'KAC199622271' ],
        LAC: [ '0053K1694E', '000033841', '0053K1694F' ],
        LC: [ 'n80036579' ],
        LNB: [ 'LNC10-000011860' ],
        LNL: [ '52485' ],
        N6I: [ 'vtls000026383' ],
        NDL: [ '00453465' ],
        NII: [ 'DA00383486' ],
        NKC: [ 'jn19990210513' ],
        NLA: [ '000036246179' ],
        NLI: [ '000195504' ],
        NLP: [ 'a1181049x' ],
        NLR: [ 'RU\\NLR\\AUTH\\77386', 'RU\\NLR\\AUTH\\771614' ],
        NSK: [ '000043891' ],
        NTA: [ '068556977' ],
        NUKAT: [ 'vtls000526480' ],
        PTBNP: [ '58530', '1068768', '1654974', '1461005', '87934' ],
        SELIBR: [ '85223' ],
        SUDOC: [ '028188012' ],
        SWNL: [ 'vtls005181877' ],
        UIY: [ '000057048' ],
        VLACC: [ '000033841' ],
        WKP: [ 'Q7200' ],
      };

      parseJustLinks( pushkin, ( propertyId, value ) =>
        console.debug( 'For property ' + propertyId + ' new value is ' + value ) );
    } );

  } );

} );
