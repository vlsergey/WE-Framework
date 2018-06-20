import * as WEF_Utils from 'core/utils.js';
import createDictinaryArticleInputClass from './DictionaryArticleInputClass';
import i18n from './ExternalLinksEditor_i18n';
import WEF_Definition from 'core/FieldDefinition';

export default function createDefinitions( externalLinksEdit, entityId ) {

  const definitions = {};
  const d = definitions;

  /**
   * @param sitelink
   *            {string} sitelink title to pass
   * @param urlFunction
   *            {function} function to convert title to URL
   * @return {function}
   */
  const searchClickF = function( sitelinks, urlFunction ) {
    return function() {
      let title = null;
      jQuery.each( sitelinks, function( i, sitelink ) {
        if ( title !== null ) {
          return;
        }
        if ( typeof externalLinksEdit.entity !== 'undefined' //
          && typeof externalLinksEdit.entity.sitelinks !== 'undefined' //
          && typeof externalLinksEdit.entity.sitelinks[ sitelink ] !== 'undefined' //
          && typeof externalLinksEdit.entity.sitelinks[ sitelink ].title !== 'undefined' //
        ) {
          title = externalLinksEdit.entity.sitelinks[ sitelink ].title;
        }
      } );
      if ( title === null ) {
        title = mw.config.get( 'wgTitle' );
      }
      window.open( urlFunction( title ), '_blank' );
    };
  };

  function buttonsSearchF( titleSites, searchUrlPrefix, searchUrlSuffix ) {
    return [ {
      icons: {
        primary: 'ui-icon-search'
      },
      text: false,
      label: 'Search...',
      click: searchClickF( titleSites, function( title ) {
        return searchUrlPrefix + encodeURIComponent( title ) + ( WEF_Utils.isEmpty( searchUrlSuffix ) ? '' : searchUrlSuffix );
      } ),
    } ];
  }

  const regexpPath = /^[\w\.\-\~\$\&\'\(\)\*\+\,\;\=\:\@А-ЯЁа-яё]+$/;
  const regexpTitle = new RegExp( '^[' + mw.config.get( 'wgLegalTitleChars' ) + ']+$' );

  /* author, автор */
  definitions.P50 = new WEF_Definition( { } );
  /* title; название */
  definitions.P357 = new WEF_Definition( { } );
  /* Volume, том */
  definitions.P478 = new WEF_Definition( { } );
  /* section, verse, or paragraph; раздел, стих или параграф */
  definitions.P958 = new WEF_Definition( { } );

  definitions.P213 = new WEF_Definition( {
    label: 'Q423048',
    labelPrefix: 'ISNI — ',
    normalize: function( id ) {
      if ( /^\d{15}[\dX]$/.exec( id ) ) {
        return id.substring( 0, 4 ) + ' ' + id.substring( 4, 8 ) + ' ' + id.substring( 8, 12 ) + ' ' + id.substring( 12, 16 );
      }
      return id;
    },
    qualifiers: [],
  } );
  definitions.P214 = new WEF_Definition( {
    label: 'Q54919',
    labelPrefix: 'VIAF — ',
    viaf: 'viafid',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?viaf\.org\/viaf\/(.*)$/i, '$2' );
    },
    buttons: [ {
      icons: {
        primary: 'ui-icon-search'
      },
      text: false,
      label: i18n.buttonViafLabel,
      click: function() {
        externalLinksEdit.viafFillDialog.dialog( 'open' );
      },
    } ],
    qualifiers: [],
  } );
  definitions.P227 = new WEF_Definition( {
    flag: 'de',
    label: 'Q36578',
    labelPrefix: 'DNB / GND — ',
    viaf: 'dnb',
    normalize: function( id ) {
      return id.replace( /^(.*)x$/, '$1X' );
    },
    qualifiers: [],
  } );
  definitions.P244 = new WEF_Definition( {
    flag: 'us',
    label: 'Q620946',
    labelPrefix: 'LCCN — ',
    viaf: 'lc',
    qualifiers: [],
  } );
  definitions.P245 = new WEF_Definition( {
    flag: 'us',
    label: 'Q2494649',
    labelPrefix: 'ULAN — ',
    viaf: 'jpg',
    qualifiers: [],
  } );
  definitions.P268 = new WEF_Definition( {
    flag: 'fr',
    label: 'Q193563',
    labelPrefix: 'BNF — ',
    viaf: 'bnf',
    normalize: function( id ) {
    // remove prefix
      let result = id.replace( /^cb([0-9]{8}\w?)$/i, '$1' );
      if ( /^[0-9]{8}$/.exec( result ) ) {
      // A few lines from
      // https://en.wikisource.org/wiki/User:Inductiveload/BnF_ARK_format
        const bnf_xdigits = '0123456789bcdfghjkmnpqrstvwxz';
        let bnf_check_digit = 0;
        result = 'cb' + id;
        for ( let i = 0; i < result.length; i++ ) {
          bnf_check_digit += bnf_xdigits.indexOf( result[ i ] ) * ( i + 1 );
        }
        // 29 is the radix
        result = result.substr( 2 ) + bnf_xdigits[ bnf_check_digit % bnf_xdigits.length ];
      }

      return result;
    },
    qualifiers: [],
  } );
  definitions.P269 = new WEF_Definition( {
    flag: 'fr',
    label: 'Q2597810',
    labelPrefix: 'SUDOC — ',
    viaf: 'sudoc',
    qualifiers: [],
  } );
  definitions.P270 = new WEF_Definition( {
    flag: 'cn',
    label: 'Q9384291',
    labelPrefix: 'CALIS — ',
    qualifiers: [],
  } );
  definitions.P271 = new WEF_Definition( {
    flag: 'jp',
    label: 'Q10726338',
    labelPrefix: 'CiNii — ',
    qualifiers: [],
  } );
  /* pages; страницы */
  definitions.P304 = new WEF_Definition( {} );
  definitions.P345 = new WEF_Definition( {
    label: 'Q37312',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:imdb.com ' ) ),
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(www\.)?imdb\.com\/Name\?(.*)$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?imdb\.com\/company\/(.*)$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?imdb\.com\/name\/(.*)$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?imdb\.com\/title\/(.*)$/i, '$2' );
      return result;
    },
    url: function( id ) {
      if ( id.indexOf( 'ch' ) === 0 )
        return 'http://www.imdb.com/Name?' + id;
      if ( id.indexOf( 'co' ) === 0 )
        return 'http://www.imdb.com/company/' + id;
      if ( id.indexOf( 'nm' ) === 0 )
        return 'http://www.imdb.com/name/' + id;
      if ( id.indexOf( 'tt' ) === 0 )
        return 'http://www.imdb.com/title/' + id;
      return id;
    },
    qualifiers: [],
  } );
  definitions.P349 = new WEF_Definition( {
    flag: 'jp',
    label: 'Q477675',
    labelPrefix: 'NDL — ',
    viaf: 'ndl',
    qualifiers: [],
  } );
  definitions.P350 = new WEF_Definition( {
    flag: 'nl',
    label: 'Q17299580',
    check: /^\d+$/,
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?explore\.rkd\.nl\/[a-z]{2}\/images\/(\d+)$/i, '$2' );
    },
    qualifiers: [],
  } );
  definitions.P373 = new WEF_Definition( {
    label: 'Q565',
    autocomplete: {
      source: function( request, response ) {
        const term = request.term;
        jQuery.ajax(
          {
            type: 'GET',
            dataType: 'json',
            url: '//commons.wikimedia.org/w/api.php?format=json&origin=' + encodeURIComponent( location.protocol + mw.config.get( 'wgServer' ) )
                + '&action=query&list=prefixsearch&psnamespace=14&pslimit=15&pssearch=' + encodeURIComponent( term ),
          } ).then( ( result ) => {
          const list = [];
          jQuery.each( result.query.prefixsearch, function( index, p ) {
            list.push( p.title.substring( 'Category:'.length ) );
          } );
          response( list );
        } );
      }
    },
    check: regexpTitle,
    url: function( id ) {
      return '//commons.wikimedia.org/wiki/Category:' + encodeURIComponent( id );
    },
    qualifiers: [],
  } );
  definitions.P380 = new WEF_Definition( {
    flag: 'fr',
    label: 'Q809830',
    check: /^[PEI][A]\d[0-9AB]\d\d\d\d\d\d$/,
    qualifiers: [],
  } );
  definitions.P396 = new WEF_Definition( {
    flag: 'it',
    label: 'Q3803707',
    labelPrefix: 'ICCU / SBN — ',
    viaf: 'iccu',
    check: /^IT\\ICCU\\(\d{10}|\D\D[\D\d]\D\\\d{6})$/,
    normalize: function( id ) {
      let result = id;
      if ( /^([a-z]{4})(\d+)$/.exec( result ) ) {
        result = result.replace( /^([a-z]{4})(\d+)$/, 'IT\\ICCU\\$1\\$2' ).toUpperCase();
      }
      return result;
    },
    url: function( id ) {
      return 'http://opac.sbn.it/opacsbn/opac/iccu/scheda_authority.jsp?bid=' + id;
    },
    qualifiers: [],
  } );
  definitions.P407 = new WEF_Definition( {
    qualifiers: [],
  } );
  definitions.P409 = new WEF_Definition( {
    flag: 'au',
    label: 'Q623578',
    labelPrefix: 'NLA — ',
    viaf: 'nla',
    normalize: function( id ) {
      return id.replace( /^0*([1-9][0-9]{0,11})$/, '$1' );
    },
    qualifiers: [],
  } );
  definitions.P434 = new WEF_Definition( {
    label: 'Q14005',
    // person, musical ensemble
    labelQualifier: [ 'Q215627', 'Q2088357' ],
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:musicbrainz.org ' ) ),
    qualifiers: [],
  } );
  definitions.P435 = new WEF_Definition( {
    label: 'Q14005',
    // музыкальное произведение (Q2188189), mainly сингл (Q134556)
    labelQualifier: [ 'Q2188189', 'Q134556' ],
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:musicbrainz.org ' ) ),
    qualifiers: [],
  } );
  definitions.P436 = new WEF_Definition( {
    label: 'Q14005',
    // музыкальное произведение (Q2188189)
    // mainly музыкальный альбом (Q482994)
    labelQualifier: [ 'Q2188189', 'Q482994' ],
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:musicbrainz.org ' ) ),
    qualifiers: [],
  } );
  definitions.P480 = new WEF_Definition( {
    label: 'Q2638147',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:filmaffinity.com ' ) ),
    check: /^\d+$/,
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?filmaffinity\.com\/[a-z]+\/film(\d+)\.html?$/i, '$2' );
    },
    qualifiers: [],
  } );
  definitions.P496 = new WEF_Definition( {
    label: 'Q51044',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:orcid.org ' ) ),
    normalize: function( id ) {
      if ( /^\d\d\d\d\s\d\d\d\d\s\d\d\d\d\s\d\d\d[\dX]$/.exec( id ) ) {
        return id.substring( 0, 4 ) + '-' + id.substring( 5, 9 ) + '-' + id.substring( 10, 14 ) + '-' + id.substring( 15, 19 );
      }
      if ( /^\d{15}[\dX]$/.exec( id ) ) {
        return id.substring( 0, 4 ) + '-' + id.substring( 4, 8 ) + '-' + id.substring( 8, 12 ) + '-' + id.substring( 12, 16 );
      }
      return id;
    },
    qualifiers: [],
  } );
  definitions.P497 = new WEF_Definition( {
    flag: 'tw',
    label: 'Q17299677',
    labelPrefix: 'CBDB — ',
    check: /^\d{7}$/,
    normalize: function( id ) {
      return id //
        .replace( /^https?:\/\/db1\.ihp\.\sinica\.edu\.tw\/cbdbc\/cbdbkm\?\~\~AAA(\d{7})$/i, '$1' ) //
        .replace( /^https?:\/\/db1\.ihp\.\sinica\.edu\.tw\/cbdbc\/cbdbkmeng\?\~\~AAA(\d{7})$/i, '$1' ) //
      ;
    },
    qualifiers: [],
  } );
  definitions.P535 = new WEF_Definition( {
    label: 'Q63056',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:findagrave.com ' ) ),
    qualifiers: [],
  } );
  definitions.P549 = new WEF_Definition( {
    label: 'Q829984',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:genealogy.ams.org ' ) ),
    qualifiers: [],
  } );
  definitions.P650 = new WEF_Definition( {
    flag: 'nl',
    label: 'Q17299517',
    check: /^\d{1,6}$/,
    qualifiers: [],
  } );
  definitions.P651 = new WEF_Definition( {
    flag: 'nl',
    label: 'Q1868372',
    labelPrefix: 'BPN — ',
    viaf: 'bpn',
    qualifiers: [],
  } );
  definitions.P691 = new WEF_Definition( {
    flag: 'cz',
    label: 'Q1967876',
    labelPrefix: 'NKC — ',
    viaf: 'nkc',
    qualifiers: [],
  } );
  definitions.P839 = new WEF_Definition( {
    label: 'Q523660',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:imslp.org/wiki/ ' ) ),
    check: regexpPath,
  } );
  definitions.P886 = new WEF_Definition( {
    flag: 'ch',
    label: 'Q642074',
    labelQualifier: 'Q35127',
    labelPrefix: 'LIR — ',
    qualifiers: [ d.P958 ],
  } );
  definitions.P902 = new WEF_Definition( {
    flag: 'ch',
    label: 'Q642074',
    labelPrefix: 'HLS — ',
    qualifiers: [ d.P958 ],
  } );
  definitions.P906 = new WEF_Definition( {
    flag: 'se',
    label: 'Q953058',
    labelPrefix: 'SELIBR / LIBRIS — ',
    viaf: 'selibr',
    qualifiers: [],
  } );
  definitions.P947 = new WEF_Definition( {
    flag: 'ru',
    label: 'Q1048694',
    labelPrefix: 'RSL — ',
    viaf: 'rsl',
    qualifiers: [],
  } );
  definitions.P950 = new WEF_Definition( {
    flag: 'es',
    label: 'Q750403',
    labelPrefix: 'BNE — ',
    viaf: 'bne',
    normalize: function( id ) {
      return id.replace( /^(XX)?(\d{6,7})$/i, 'XX$2' );
    },
    qualifiers: [],
  } );
  definitions.P951 = new WEF_Definition( {
    flag: 'hu',
    label: 'Q1063819',
    labelPrefix: 'NSZL — ',
    viaf: 'nszl',
    url: function( id ) {
      return 'http://viaf.org/processed/NSZL%7C' + id;
    },
    qualifiers: [],
  } );
  definitions.P998 = new WEF_Definition( {
    label: 'Q41226',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:dmoz.org ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?dmoz\.org\/(.*)$/i, '$2' ).replace( /^(.*)\/$/i, '$1' ).replace( /^\/(.*)$/i, '$1' );
    },
  } );
  definitions.P1003 = new WEF_Definition( {
    flag: 'ro',
    label: 'Q622012',
    labelPrefix: 'BNR — ',
    qualifiers: [],
  } );
  definitions.P1005 = new WEF_Definition( {
    flag: 'pt',
    label: 'Q245966',
    labelPrefix: 'PTBNP — ',
    viaf: 'ptbnp',
    qualifiers: [],
  } );
  definitions.P1006 = new WEF_Definition( {
    flag: 'nl',
    label: 'Q1526131',
    labelPrefix: 'NTA — ',
    viaf: 'nta',
    qualifiers: [],
  } );
  definitions.P1015 = new WEF_Definition( {
    flag: 'no',
    label: 'Q4584301',
    labelPrefix: 'BIBSYS — ',
    viaf: 'bibsys',
    qualifiers: [],
  } );
  definitions.P1017 = new WEF_Definition( {
    flag: 'va',
    label: 'Q213678',
    labelPrefix: 'BAV — ',
    viaf: 'bav',
    normalize: function( id ) {
      return id.replace( /^(ADV)?(\d{8})$/i, 'ADV$2' );
    },
    qualifiers: [],
  } );
  definitions.P1053 = new WEF_Definition( {
    label: 'Q7315186',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:researcherid.com/rid/ ' ) ),
    qualifiers: [],
  } );
  definitions.P1153 = new WEF_Definition( {
    label: 'Q371467',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:scopus.com/authid/ ' ) ),
    qualifiers: [],
  } );
  definitions.P1185 = new WEF_Definition( {
    label: 'Q649227',
    buttons: buttonsSearchF( [ 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:ru.rodovid.org ' ) ),
    url: function( id ) {
      return 'http://ru.rodovid.org/wk/Person:' + id;
    },
  } );
  definitions.P1207 = new WEF_Definition( {
    flag: 'pl',
    label: 'Q11789729',
    labelPrefix: 'NUKAT — ',
    viaf: 'nukat',
    url: function( id ) {
      return 'http://viaf.org/processed/NUKAT%7C' + id;
    },
    qualifiers: [],
  } );
  definitions.P1213 = new WEF_Definition( {
    flag: 'cn',
    label: 'Q732353',
    labelPrefix: 'NLC — ',
    qualifiers: [],
  } );
  definitions.P1217 = new WEF_Definition( {
    label: 'Q31964',
    // Концертная площадка (Q8719053), <...> театр (Q24354)...
    labelQualifier: [ 'Q8719053', 'Q24354' ],
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:ibdb.com ' ) ),
    qualifiers: [],
  } );
  definitions.P1218 = new WEF_Definition( {
    label: 'Q31964',
    labelQualifier: 'Q7777570', // театральная постановка (Q7777570)
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:ibdb.com ' ) ),
    qualifiers: [],
  } );
  definitions.P1219 = new WEF_Definition( {
    label: 'Q31964',
    // произведение (Q386724): пьеса (Q25379)
    labelQualifier: [ 'Q386724', 'Q25379' ],
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:ibdb.com ' ) ),
    qualifiers: [],
  } );
  definitions.P1220 = new WEF_Definition( {
    label: 'Q31964',
    labelQualifier: 'Q215627', // person
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:isfdb.org ' ) ),
    qualifiers: [],
  } );
  definitions.P1233 = new WEF_Definition( {
    label: 'Q2629164',
    labelQualifier: 'Q215627', // person
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:isfdb.org ' ) ),
    qualifiers: [],
  } );
  definitions.P1234 = new WEF_Definition( {
    label: 'Q2629164',
    labelQualifier: 'Q732577', // publication
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:isfdb.org ' ) ),
    qualifiers: [],
  } );
  definitions.P1235 = new WEF_Definition( {
    label: 'Q2629164',
    labelQualifier: 'Q7725310', // series
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:isfdb.org ' ) ),
    qualifiers: [],
  } );
  definitions.P1237 = new WEF_Definition( {
    label: 'Q223142',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:boxofficemojo.com ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?boxofficemojo\.com\/movies\/\?id\=(.*)\.htm$/i, '$2' );
    },
    qualifiers: [],
  } );
  definitions.P1239 = new WEF_Definition( {
    label: 'Q2629164',
    labelQualifier: 'Q4198509', // publisher
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:isfdb.org ' ) ),
    qualifiers: [],
  } );
  definitions.P1258 = new WEF_Definition( {
    label: 'Q105584',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:rottentomatoes.com ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?rottentomatoes\.com\/(.*)$/i, '$2' );
    },
    qualifiers: [],
  } );
  definitions.P1265 = new WEF_Definition( {
    label: 'Q31165',
    labelQualifier: 'Q11424', // film
    buttons: buttonsSearchF( [ 'frwiki', 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:allocine.fr ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?allocine\.fr\/film\/\fichefilm_gen_cfilm\=(.*)\.html.*$/i, '$2' );
    },
    qualifiers: [],
  } );
  definitions.P1266 = new WEF_Definition( {
    label: 'Q31165',
    labelQualifier: 'Q215627', // person
    buttons: buttonsSearchF( [ 'frwiki', 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:allocine.fr ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?allocine\.fr\/personne\/\fichepersonne_gen_cpersonne\=(.*)\.html.*$/i, '$2' );
    },
    qualifiers: [],
  } );
  definitions.P1267 = new WEF_Definition( {
    label: 'Q31165',
    labelQualifier: 'Q7725310', // series
    buttons: buttonsSearchF( [ 'frwiki', 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:allocine.fr ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?allocine\.fr\/series\/\ficheserie_gen_cserie\=(.*)\.html.*$/i, '$2' );
    },
    qualifiers: [],
  } );
  definitions.P1273 = new WEF_Definition( {
    flag: 'ct',
    label: 'Q1200925',
    labelPrefix: 'BNC — ',
    viaf: 'bnc',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], 'http://cantic.bnc.cat/index_nps/index?text=', '&index=1' ),
    qualifiers: [],
  } );
  definitions.P1280 = new WEF_Definition( {
    flag: 'si',
    label: 'Q16744133',
    labelPrefix: 'CONOR — ',
    qualifiers: [],
  } );
  definitions.P1296 = new WEF_Definition( {
    flag: 'ct',
    label: 'Q2664168',
    buttons: buttonsSearchF( [ 'cawiki', 'enwiki', 'ruwiki' ], 'http://www.enciclopedia.cat/search/work/445460/' ),
    template: [ 'http://www.enciclopedia.cat/enciclopèdies/gran-enciclopèdia-catalana/EC-GEC-$1.xml',
      'http://www.enciclopedia.cat/enciclop%C3%A8dies/gran-enciclop%C3%A8dia-catalana/EC-GEC-$1.xml', ],
    qualifiers: [ d.P958, ],
  } );
  definitions.P1309 = new WEF_Definition( {
    flag: 'eg',
    label: 'Q501851',
    labelPrefix: 'EGAXA — ',
    viaf: 'egaxa',
    normalize: function( id ) {
      return id.replace( /^vtls(\d+)$/, '$1' );
    },
    qualifiers: [],
  } );
  definitions.P1315 = new WEF_Definition( {
    flag: 'au',
    label: 'Q623578',
    labelPrefix: 'NLA PI — ',
    normalize: function( id ) {
      return id.replace( /^0*([1-9][0-9]{0,11})$/, '$1' );
    },
    qualifiers: [],
  } );
  definitions.P1368 = new WEF_Definition( {
    flag: 'lv',
    label: 'Q1133733',
    labelPrefix: 'LNB — ',
    viaf: 'lnb',
    qualifiers: [],
  } );
  definitions.P1375 = new WEF_Definition( {
    flag: 'hr',
    label: 'Q631375',
    labelPrefix: 'NSK — ',
    viaf: 'nsk',
    qualifiers: [],
  } );
  definitions.P1361 = new WEF_Definition( {
    label: 'Q220509',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:animenewsnetwork.com ' ) ),
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/anime\.php\?id=(\d+)$/i, 'anime/$2' );
      result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/company\.php\?id=(\d+)$/i, 'company/$2' );
      result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/manga\.php\?id=(\d+)$/i, 'manga/$2' );
      result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/people\.php\?id=(\d+)$/i, 'people/$2' );
      result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/releases\.php\?id=(\d+)$/i, 'releases/$2' );
      return result;
    },
    url: function( id ) {
      if ( id.indexOf( 'anime/' ) === 0 )
        return 'http://www.animenewsnetwork.com/encyclopedia/anime.php?id=' + id.substr( 'anime/'.length );
      if ( id.indexOf( 'company/' ) === 0 )
        return 'http://www.animenewsnetwork.com/encyclopedia/company.php?id=' + id.substr( 'company/'.length );
      if ( id.indexOf( 'manga/' ) === 0 )
        return 'http://www.animenewsnetwork.com/encyclopedia/manga.php?id=' + id.substr( 'manga/'.length );
      if ( id.indexOf( 'people/' ) === 0 )
        return 'http://www.animenewsnetwork.com/encyclopedia/people.php?id=' + id.substr( 'people/'.length );
      if ( id.indexOf( 'releases/' ) === 0 )
        return 'http://www.animenewsnetwork.com/encyclopedia/releases.php?id=' + id.substr( 'releases/'.length );
      return id;
    },
    qualifiers: [],
  } );
  definitions.P1417 = new WEF_Definition( {
    flag: 'uk',
    code: 'P1417',
    label: 'Q5375741',
    buttons: buttonsSearchF( [ 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:global.britannica.com ' ) ),
    qualifiers: [ d.P50, d.P958, ],
  } );
  definitions.P1422 = new WEF_Definition( {
    flag: 'de',
    label: 'Q17298559',
    buttons: buttonsSearchF( [ 'dewiki', 'enwiki' ], 'http://ta.sandrart.net/en/persons/?query=' ),
    qualifiers: [],
  } );
  definitions.P1438 = new WEF_Definition( {
    flag: 'ru',
    label: 'Q1967250',
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:www.eleven.co.il/article ' ) ),
    qualifiers: [ d.P304, d.P478, d.P958 ],
  } );
  definitions.P1556 = new WEF_Definition( {
    code: 'P1556',
    label: 'Q18241050',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:zbmath.org/authors ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?zbmath\.org\/authors\/\?q\:ai\=([^\/]+)?$/i, '$2' );
    },
  } );
  definitions.P1648 = new WEF_Definition( {
    flag: 'cy',
    label: 'Q5273977',
    buttons: buttonsSearchF( [ 'enwiki', 'cywiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:wbo.llgc.org.uk/en/ ' ) ),
    qualifiers: [ d.P50, d.P958 ],
  } );
  definitions.P1960 = new WEF_Definition( {
    code: 'P1960',
    label: 'Q494817',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], 'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=' ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/scholar\.google\.com\/citations\?user=([^&]*)(&.*)?$/i, '$2' );
    },
  } );
  definitions.P2002 = new WEF_Definition( {
    code: 'P2002',
    label: 'Q918',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:twitter.com ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?twitter\.com\/(.*)$/i, '$2' );
    },
  } );
  definitions.P2003 = new WEF_Definition( {
    code: 'P2003',
    label: 'Q209330',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:instagram.com ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?instagram\.com\/(.+)$/i, '$2' );
    },
  } );
  definitions.P2013 = new WEF_Definition( {
    code: 'P2013',
    label: 'Q355',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:facebook.com ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?facebook\.com\/(.+)$/i, '$2' );
    },
  } );
  definitions.P2338 = new WEF_Definition( {
    code: 'P2338',
    label: 'Q2572292',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:musopen.org ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?musopen\.org\/composer\/([^\/]+)(\/)?$/i, '$2' );
    },
  } );
  definitions.P2529 = new WEF_Definition( {
    code: 'P2529',
    flag: 'cz',
    buttons: buttonsSearchF( [ 'cswiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:csfd.cz ' ) ),
    qualifiers: [ d.P958 ],
  } );
  definitions.P2605 = new WEF_Definition( {
    code: 'P2605',
    flag: 'cz',
    buttons: buttonsSearchF( [ 'cswiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:csfd.cz ' ) ),
    qualifiers: [ d.P958 ],
  } );
  definitions.P2924 = new WEF_Definition( {
    code: 'P2924',
    flag: 'ru',
    label: 'Q1768199',
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:bigenc.ru ' ) ),
    qualifiers: [ d.P50, d.P958 ],
  } );
  definitions.P3185 = new WEF_Definition( {
    code: 'P3185',
    flag: 'ru',
    label: 'Q116933',
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:vk.com/ ' ) ),
    qualifiers: [],
  } );
  definitions.P3192 = new WEF_Definition( {
    code: 'P3192',
    label: 'Q183718',
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:last.fm/ ' ) ),
    qualifiers: [],
  } );
  definitions.P3217 = new WEF_Definition( {
    code: 'P3217',
    flag: 'se',
    label: 'Q379406',
    buttons: buttonsSearchF( [ 'svwiki', 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:sok.riksarkivet.se/sbl/ ' ) ),
    qualifiers: [ d.P50, d.P958 ],
  } );

  definitions.Q356 = new WEF_Definition( {
    code: 'P553[Q356]/P554',
    label: 'Q356',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:plus.google.com ' ) ),
    template: 'https://plus.google.com/$1/posts',
  } );
  definitions.Q866 = new WEF_Definition( {
    code: 'P553[Q866]/P554',
    label: 'Q866',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:youtube.com ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/www\.youtube\.com\/(.*)$/i, '$1' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'https://youtube.com/' + id;
    }
  } );
  definitions.Q40629 = new WEF_Definition( {
    code: 'P553[Q40629]/P554',
    label: 'Q40629',
    buttons: buttonsSearchF( [ 'enwiki', 'ruwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:myspace.com ' ) ),
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?myspace\.com\/(.*)$/i, '$2' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'https://myspace.com/' + id;
    }
  } );
  definitions.Q103204 = new WEF_Definition( {
    code: 'P553[Q103204]/P554',
    label: 'Q103204',
    check: regexpPath,
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?flickr\.com\/(.+)$/i, '$2' );
    },
    url: function( id ) {
      return 'https://www.flickr.com/' + id;
    },
  } );
  definitions.Q156376 = new WEF_Definition( {
    code: 'P553[Q156376]/P554',
    label: 'Q156376',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?vimeo\.com\/(.*)$/i, '$2' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://vimeo.com/' + id;
    }
  } );
  definitions.Q171186 = new WEF_Definition( {
    code: 'P553[Q171186]/P554',
    label: 'Q171186',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(.+)?\.blogspot\.com\/?$/i, '$1' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://' + id + '.blogspot.com/';
    },
  } );
  definitions.Q219523 = new WEF_Definition( {
    code: 'P553[Q219523]/P554',
    label: 'Q219523',
    check: regexpPath,
    template: 'https://$1.livejournal.com/',
  } );
  // Catholic Encyclopedia
  definitions.Q302556 = new WEF_Definition( {
    code: 'P1343[Q302556]/P248',
    datatype: 'wikibase-item',
    flag: 'us',
    label: 'Q302556',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q302556',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'Catholic Encyclopedia (1913)',
      pageTitleSplitChar: '/',
      project: 'enwikisource',
      wikidataTitlePrefix: 'CE',
    } ),
  } );
  definitions.Q372827 = new WEF_Definition( {
    code: 'P553[Q372827]/P554',
    label: 'Q372827',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(.+)?\.rutube\.ru\/?$/i, '$1' );
      result = result.replace( /^https?:\/\/(www\.)?rutube\.ru\/video\/person\/(\d+)\/?$/i, '$2' );
      return result;
    },
    check: regexpPath,
    url: function( id ) {
      if ( /^d+$/.exec( id ) ) {
        return 'http://rutube.ru/video/person/' + id + '/';
      }
      return 'http://' + id + '.rutube.ru/';
    }
  } );
  definitions.Q384060 = new WEF_Definition( {
    code: 'P553[Q384060]/P554',
    label: 'Q384060',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(.+)?\.tumblr\.com\/?$/i, '$1' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://' + id + '.tumblr.com/';
    }
  } );
  definitions.Q568769 = new WEF_Definition( {
    code: 'P553[Q568769]/P554',
    label: 'Q568769',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?soundcloud\.com\/(.*)(\/)?$/i, '$2' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'https://soundcloud.com/' + id + '/';
    }
  } );
  // Allgemeine Deutsche Biographie
  definitions.Q590208 = new WEF_Definition( {
    code: 'P1343[Q590208]/P248',
    datatype: 'wikibase-item',
    flag: 'de',
    label: 'Q590208',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'de',
      dictionaryEntityId: 'Q590208',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'ADB',
      pageTitleSplitChar: ':',
      project: 'dewikisource',
    } ),
  } );
  // Энциклопедический словарь Брокгауза и Ефрона
  definitions.Q602358 = new WEF_Definition( {
    code: 'P1343[Q602358]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q602358',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q602358',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'ЭСБЕ',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  definitions.Q798490 = new WEF_Definition( {
    code: 'P553[Q798490]/P554',
    label: 'Q798490',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(.+)?\.ya\.ru\/?$/i, '$1' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://' + id + '.ya.ru/';
    },
  } );
  // 1911 Encyclopædia Britannica
  definitions.Q867541 = new WEF_Definition( {
    code: 'P1343[Q867541]/P248',
    datatype: 'wikibase-item',
    flag: 'uk',
    label: 'Q867541',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q867541',
      mainTopicEntityId: entityId,
      pageTitlePrefix: '1911 Encyclopædia Britannica',
      pageTitleSplitChar: '/',
      project: 'enwikisource',
      wikidataTitlePrefix: 'EB-11',
    } ),
  } );
  // 1922 Encyclopædia Britannica
  definitions.Q15987490 = new WEF_Definition( {
    code: 'P1343[Q15987490]/P248',
    datatype: 'wikibase-item',
    flag: 'uk',
    label: 'Q15987490',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q15987490',
      mainTopicEntityId: entityId,
      pageTitlePrefix: '1922 Encyclopædia Britannica',
      pageTitleSplitChar: '/',
      project: 'enwikisource',
      wikidataTitlePrefix: 'EB-12',
    } ),
  } );
  definitions.Q1002972 = new WEF_Definition( {
    code: 'P553[Q1002972]/P554',
    label: 'Q1002972',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?spring\.me\/(.+)$/i, '$2' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'https://www.spring.me/' + id;
    },
  } );
  definitions.Q1123836 = new WEF_Definition( {
    code: 'P553[Q1123836]/P554',
    label: 'Q1123836',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?odnoklassniki\.ru\/profile\/(\d+)$/i, '$2' );
    },
    check: /^\d+$/,
    url: function( id ) {
      return 'http://www.odnoklassniki' + '.ru/profile/' + id;
    },
  } );
  // Русский биографический словарь
  definitions.Q1960551 = new WEF_Definition( {
    code: 'P1343[Q1960551]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q1960551',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q1960551',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'РБС',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // Толковый словарь В. Даля
  definitions.Q1970746 = new WEF_Definition( {
    code: 'P1343[Q1970746]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q1970746',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q1970746',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'ТСД',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // Ottův slovník naučný
  definitions.Q2041543 = new WEF_Definition( {
    code: 'P1343[Q2041543]/P248',
    datatype: 'wikibase-item',
    flag: 'cz',
    label: 'Q2041543',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'cs',
      dictionaryEntityId: 'Q2041543',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'Ottův slovník naučný',
      pageTitleSplitChar: '/',
      project: 'cswikisource',
      wikidataTitlePrefix: 'Ottův slovník naučný',
    } ),
  } );
  definitions.Q2152210 = new WEF_Definition( {
    code: 'P1343[Q2152210]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q2152210',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q2152210',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'МСР',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  definitions.Q2498180 = new WEF_Definition( {
    datatype: 'url',
    flag: 'ru',
    code: 'P1343[Q2498180]/P854',
    label: 'Q2498180',
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], 'http://www.pravenc.ru/search/?ie=utf-8&oe=utf-8&text=' ),
    qualifiers: [ d.P50, d.P958, d.P478 ],
  } );
  definitions.Q2627728 = new WEF_Definition( {
    datatype: 'url',
    flag: 'ru',
    code: 'P1343[Q2627728]/P854',
    label: 'Q2627728',
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:krugosvet.ru ' ) ),
    qualifiers: [ d.P50, d.P958 ],
  } );
  definitions.Q4037665 = new WEF_Definition( {
    code: 'P553[Q4037665]/P554',
    label: 'Q4037665',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(www\.)?dudu\.com\/(.*)(\/)?$/i, '$2' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'https://dudu.com/' + id + '/';
    }
  } );
  definitions.Q4043051 = new WEF_Definition( {
    code: 'P553[Q4043051]/P554',
    label: 'Q4043051',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(www\.)?liveinternet\.ru\/users\/(.+)\/$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?liveinternet\.ru\/users\/(.+)$/i, '$2' );
      return result;
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://www.liveinternet.ru/users/' + id;
    },
  } );
  // Библейская энциклопедия архимандрита Никифора
  definitions.Q4086271 = new WEF_Definition( {
    code: 'P1343[Q4086271]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q4086271',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q4086271',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'БЭАН',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  definitions.Q4091875 = new WEF_Definition( {
    datatype: 'url',
    flag: 'ru',
    code: 'P1343[Q4091875]/P854',
    label: 'Q4091875',
    check: /^https?:\/\/(www\.)?megabook\.ru\/article\//,
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:megabook.ru ' ) ),
    qualifiers: [ d.P958 ],
  } );
  // Большая энциклопедия Южакова
  definitions.Q4091878 = new WEF_Definition( {
    code: 'P1343[Q4091878]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q4091878',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q4091878',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'БЭЮ',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  definitions.Q4101720 = new WEF_Definition( {
    code: 'P553[Q4101720]/P554',
    label: 'Q4101720',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(.+)?\.vkrugudruzei\.ru\/?$/i, '$1' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://' + id + '.vkrugudruzei.ru/';
    },
  } );
  // Военная энциклопедия Сытина
  definitions.Q4114391 = new WEF_Definition( {
    code: 'P1343[Q4114391]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q4114391',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q4114391',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'ВЭ',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // Еврейская энциклопедия Брокгауза и Ефрона
  definitions.Q4173137 = new WEF_Definition( {
    code: 'P1343[Q4173137]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q4173137',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q4173137',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'ЕЭБЕ',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  definitions.Q4239850 = new WEF_Definition( {
    datatype: 'url',
    flag: 'ru',
    code: 'P1343[Q4239850]/P854',
    label: 'Q4239850',
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:web.ru/feb/kle ' ) ),
    qualifiers: [ d.P50, d.P958, d.P478 ],
  } );
  definitions.Q4263804 = new WEF_Definition( {
    datatype: 'url',
    flag: 'ru',
    code: 'P1343[Q4263804]/P854',
    label: 'Q4263804',
    buttons: buttonsSearchF( [ 'ruwiki', 'enwiki' ], '//google.com/search?q=' + encodeURIComponent( 'site:web.ru/feb/litenc ' ) ),
    qualifiers: [ d.P50, d.P958, d.P478 ],
  } );
  definitions.Q4299813 = new WEF_Definition( {
    code: 'P553[Q4299813]/P554',
    label: 'Q4299813',
    normalize: function( id ) {
      return id.replace( /^https?:\/\/(.+)?\.moikrug\.ru\/?$/i, '$1' );
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://' + id + '.moikrug.ru/';
    },
  } );
  definitions.Q4299858 = new WEF_Definition( {
    code: 'P553[Q4299858]/P554',
    label: 'Q4299858',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/my\.?mail\.ru\/(.+)$/i, '$1' );
      result = result.replace( /^(.*)\/$/i, '$1' );
      return result;
    },
    check: /^(bk|inbox|list|mail)\/.+$/,
    url: function( id ) {
      return 'http://my.mail.ru/' + id;
    },
  } );
  definitions.Q4380129 = new WEF_Definition( {
    code: 'P553[Q4380129]/P554',
    label: 'Q4380129',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(www\.)?proza\.ru\/avtor\/(\w+)\/$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?proza\.ru\/avtor\/(\w+)$/i, '$2' );
      return result;
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://proza.ru/avtor/' + id;
    }
  } );
  definitions.Q4442644 = new WEF_Definition( {
    code: 'P553[Q4442644]/P554',
    label: 'Q4442644',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(www\.)?stihi\.ru\/avtor\/(.+)\/$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?stihi\.ru\/avtor\/(.+)$/i, '$2' );
      return result;
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://stihi.ru/avtor/' + id;
    }
  } );
  // Энциклопедический лексикон, 1834—1841
  definitions.Q4532135 = new WEF_Definition( {
    code: 'P1343[Q4532135]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q4532135',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q4532135',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'ЭЛ',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  definitions.Q6883832 = new WEF_Definition( {
    code: 'P553[Q6883832]/P554',
    label: 'Q6883832',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(www\.)?mixcloud\.com\/(.+)\/$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?mixcloud\.com\/(.+)$/i, '$2' );
      return result;
    },
    check: regexpPath,
    url: function( id ) {
      return 'https://mixcloud.com/' + id + '/';
    }
  } );
  // Appletons' Cyclopædia of American Biography (1887—1901)
  definitions.Q12912667 = new WEF_Definition( {
    code: 'P1343[Q12912667]/P248',
    datatype: 'wikibase-item',
    flag: 'us',
    label: 'Q12912667',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q12912667',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'Appletons\' Cyclopædia of American Biography',
      pageTitleSplitChar: '/',
      project: 'enwikisource',
      wikidataTitlePrefix: 'ACAB-1',
    } ),
  } );
  // Dictionary of National Biography (1885-1900)
  definitions.Q15987216 = new WEF_Definition( {
    code: 'P1343[Q15987216]/P248',
    datatype: 'wikibase-item',
    flag: 'uk',
    label: 'Q15987216',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q15987216',
      mainTopicEntityId: entityId,
      pageTitlePrefix: '',
      pageTitleSplitChar: '',
      project: 'enwikisource',
      wikidataTitlePrefix: '',
      wikidataTitlePostfix: '(DNB00)',
    } ),
  } );
  definitions.Q17117201 = new WEF_Definition( {
    code: 'P553[Q17117201]/P554',
    label: 'Q17117201',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(.+)?\.promodj\.ru\/?$/i, '$1' );
      result = result.replace( /^https?:\/\/(www\.)?promodj\.com\/(.*)(\/)?$/i, '$2' );
      return result;
    },
    check: regexpPath,
    url: function( id ) {
      return 'https://promodj.com/' + id + '/';
    }
  } );
  definitions.Q17144398 = new WEF_Definition( {
    code: 'P553[Q17144398]/P554',
    label: 'Q17144398',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(www\.)?qroom\.ru\/(.+)\/$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?qroom\.ru\/(.+)$/i, '$2' );
      return result;
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://qroom.ru/' + id + '/';
    }
  } );
  definitions.Q17195318 = new WEF_Definition( {
    code: 'P553[Q17195318]/P554',
    label: 'Q17195318',
    normalize: function( id ) {
      let result = id;
      result = result.replace( /^https?:\/\/(www\.)?sprashivai\.ru\/(.+)\/$/i, '$2' );
      result = result.replace( /^https?:\/\/(www\.)?sprashivai\.ru\/(.+)$/i, '$2' );
      return result;
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://sprashivai.ru/' + id;
    }
  } );
  definitions.Q17195344 = new WEF_Definition( {
    code: 'P553[Q17195344]/P554',
    label: 'Q17195344',
    normalize: function( id ) {
      return id //
        .replace( /^https?:\/\/(www\.)?samlib\.ru\/\w\/(\w+)\/$/i, '$2' ) //
        .replace( /^https?:\/\/(www\.)?samlib\.ru\/\w\/(\w+)$/i, '$2' ) //
      ;
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://samlib.ru/' + id.charAt( 0 ) + '/' + id + '/';
    }
  } );
  definitions.Q17254543 = new WEF_Definition( {
    code: 'P553[Q17254543]/P554',
    label: 'Q17254543',
    normalize: function( id ) {
      return id //
        .replace( /^https?:\/\/(www\.)?chitalnya\.ru\/\users\/(\w+)\/$/i, '$2' ) //
        .replace( /^https?:\/\/(www\.)?chitalnya\.ru\/\users\/(\w+)$/i, '$2' ) //
      ;
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://chitalnya.ru/users/' + id + '/';
    }
  } );
  definitions.Q17300505 = new WEF_Definition( {
    code: 'P553[Q17300505]/P554',
    label: 'Q17300505',
    normalize: function( id ) {
      return id //
        .replace( /^https?:\/\/fan\.lib\.ru\/\w\/(\w+)\/$/i, '$1' ) //
        .replace( /^https?:\/\/fan\.lib\.ru\/\w\/(\w+)$/i, '$1' ) //
      ;
    },
    check: regexpPath,
    url: function( id ) {
      return 'http://fan.lib.ru/' + id.charAt( 0 ) + '/' + id + '/';
    }
  } );
  definitions.Q17329836 = new WEF_Definition( {
    datatype: 'url',
    flag: 'fr',
    code: 'P1343[Q17329836]/P854',
    label: 'Q17329836',
    check: /^https?:\/\/(www\.)?larousse\.fr\/encyclopedie\//,
    buttons: buttonsSearchF( [ 'frwiki', 'enwiki' ], 'http://www.larousse.fr/encyclopedie/rechercher?q=' ),
    qualifiers: [ d.P958 ],
  } );
  // American Medical Biographies 1920
  definitions.Q19037977 = new WEF_Definition( {
    code: 'P1343[Q19037977]/P248',
    datatype: 'wikibase-item',
    flag: 'us',
    label: 'Q19037977',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q19037977',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'American Medical Biographies',
      pageTitleSplitChar: '/',
      project: 'enwikisource',
      wikidataTitlePrefix: 'AMC',
    } ),
  } );
  // The American Cyclopædia (1879)
  definitions.Q19077875 = new WEF_Definition( {
    code: 'P1343[Q19077875]/P248',
    datatype: 'wikibase-item',
    flag: 'us',
    label: 'Q19077875',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q19077875',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'The American Cyclopædia (1879)',
      pageTitleSplitChar: '/',
      project: 'enwikisource',
      wikidataTitlePrefix: 'AC',
    } ),
  } );
  // Малый энциклопедический словарь Брокгауза и Ефрона
  definitions.Q19180675 = new WEF_Definition( {
    code: 'P1343[Q19180675]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q19180675',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q19180675',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'МЭСБЕ',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // Новый энциклопедический словарь
  definitions.Q19190511 = new WEF_Definition( {
    code: 'P1343[Q19190511]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q19190511',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q19190511',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'НЭС',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // Православная богословская энциклопедия
  definitions.Q19211082 = new WEF_Definition( {
    code: 'P1343[Q19211082]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q19211082',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q19211082',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'ПБЭ',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // Русский энциклопедический словарь И. Н. Березина
  definitions.Q19217220 = new WEF_Definition( {
    code: 'P1343[Q19217220]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q19217220',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q19217220',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'РЭСБ',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // Техническая энциклопедия (1927—1936)
  definitions.Q20078551 = new WEF_Definition( {
    code: 'P1343[Q20078551]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q20078551',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q20078551',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'ТЭ1',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // Большая советская энциклопедия (1926—1947)
  definitions.Q20078554 = new WEF_Definition( {
    code: 'P1343[Q20078554]/P248',
    datatype: 'wikibase-item',
    flag: 'ru',
    label: 'Q20078554',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'ru',
      dictionaryEntityId: 'Q20078554',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'БСЭ1',
      pageTitleSplitChar: '/',
      project: 'ruwikisource',
    } ),
  } );
  // The New International Encyclopædia (1902—05)
  definitions.Q20089963 = new WEF_Definition( {
    code: 'P1343[Q20089963]/P248',
    datatype: 'wikibase-item',
    flag: 'uk',
    label: 'Q20089963',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q20089963',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'The New International Encyclopædia',
      pageTitleSplitChar: '/',
      project: 'enwikisource',
      wikidataTitlePrefix: 'NIE',
    } ),
  } );
  // Энциклопедия Британника (1875—1889)
  definitions.Q20096917 = new WEF_Definition( {
    code: 'P1343[Q20096917]/P248',
    datatype: 'wikibase-item',
    flag: 'uk',
    label: 'Q20096917',
    inputClass: createDictinaryArticleInputClass( {
      contentLanguage: 'en',
      dictionaryEntityId: 'Q20096917',
      mainTopicEntityId: entityId,
      pageTitlePrefix: 'Encyclopædia Britannica, Ninth Edition',
      pageTitleSplitChar: '/',
      project: 'enwikisource',
      wikidataTitlePrefix: 'EB-9',
    } ),
  } );

  return definitions;
}
