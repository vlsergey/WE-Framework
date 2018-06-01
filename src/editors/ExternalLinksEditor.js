import * as ApiUtils from '../core/ApiUtils';
import * as WEF_Utils from '../core/utils';
import buildDefinitions from './ExternalLinksEditor_definitions';
import coreStyles from '../core/core.css';
import Editor from '../core/Editor';
import i18n from './ExternalLinksEditor_i18n';
import wef_analyze_and_save from '../core/analyze_and_save';
import WEF_ClaimEditorsTable from '../core/ClaimEditorsTable';
import wef_LabelsCache from '../core/labelsCache';

export default class ExternalLinksEditor extends Editor {

  constructor( entityId ) {
    super( entityId );
    this.i18n = i18n;
    this.enabled = /^Q\d+$/.test( entityId );

    this.definitions = buildDefinitions( this, entityId );
    this.defaultQualifiers = [ this.definitions.P407 ];
    this.dialogWidth = jQuery( window ).width() * 0.66;

    this.entity = null;
    this.entityId = entityId;

    /** code -> table row */
    this.editors = {};
  }

  setup() {
    const d = this.definitions;

    this.groups = [];
    this.groups.push( {
      label: i18n.tabOfficialPages,
      fields: [//
        d.P3185, // vk.com
        d.Q4101720, // vkrugudruzei.ru
        d.Q219523, // livejournal.com
        d.Q4299813, // moikrug.ru
        d.Q4299858, // my.mail.ru
        d.Q1123836, // odnoklassniki.ru
        d.Q17195318, // sprashivai.ru
        d.Q798490, // ya.ru
        d.Q171186, // blogspot.com
        d.Q4037665, // dudu.com
        d.P2013, // facebook.com
        d.Q356, // plus.google.com
        d.Q4043051, // liveinternet.ru
        d.Q40629, // myspace.com
        d.Q17144398, // qroom.ru
        d.Q1002972, // spring.me
        d.Q384060, // tumblr.com
        d.P2002, // twitter.com
      ],
    } );
    this.groups.push( {
      label: i18n.tabTexts,
      fields: [//
        d.Q17254543, // chitalnya.ru
        d.Q4380129, // proza.ru
        d.Q17195344, // samlib.ru
        d.Q4442644, // stihi.ru
        d.Q17300505, // fan.lib.ru
      ],
    } );
    this.groups.push( {
      label: i18n.tabMedia,
      fields: [//
        d.P373, // commons.wikimedia.org
        d.Q103204, // flickr.com
        d.P2003, // instagram.com
        d.Q6883832, // mixcloud.com
        d.Q17117201, // promodj.com
        d.Q372827, // rutube.ru
        d.Q568769, // soundcloud.com
        d.Q156376, // vimeo.com
        d.Q866, // youtube.com
      ],
    } );
    this.groups.push( {
      label: i18n.tabTheaterAndMovies,
      fields: [//
        d.P2529, // csfd.cz
        d.P2605, // csfd.cz
        d.P1265, // allocine.fr
        d.P1266, // allocine.fr
        d.P1267, // allocine.fr
        d.P1237, // boxofficemojo.com
        d.P480, // Filmaffinity
        d.P1217, // ibdb.com
        d.P1218, // ibdb.com
        d.P1219, // ibdb.com
        d.P1220, // ibdb.com
        d.P345, // imdb.com
        d.P1258, // rottentomatoes.com
      ],
    } );
    this.groups.push( {
      label: i18n.tabMusic,
      fields: [ //
        d.P839, // imslp.org
        d.P3192, // lastfm.ru
        d.P434, // musicbrainz.org
        d.P435, // musicbrainz.org
        d.P436, // musicbrainz.org
        d.P2338, // musopen.org
      ],
    } );
    this.groups.push( {
      label: i18n.tabLiteratureAndManga,
      fields: [//
        d.P1361, // animenewsnetwork.com
        d.P1233, // isfdb.org
        d.P1234, // isfdb.org
        d.P1235, // isfdb.org
        d.P1239, // isfdb.org
      ],
    } );
    this.groups.push( {
      label: i18n.tabScience,
      fields: [//
        d.P549, // genealogy.ams.org
        d.P1960, // Google Scholar
        d.P496, // orcid.org
        d.P1053, // researcherid.com
        d.P1153, // scopus.com
        d.P1556, // zbmath.org
      ],
    } );
    this.groups.push( {
      label: i18n.tabOther,
      fields: [//
        d.P1185, // rodovid.org
        d.P535, // findagrave.com
        d.P998, // dmoz.org
        d.P650, // RKDartists
        d.P350, // RKDimages
        d.P1422, // Sandrart.net
      ],
    } );
    this.groups.push( {
      label: i18n.tabEncyclopedias,
      fields: [//
      // ca
        d.P1296, // enciclopedia.cat
        // cy
        d.P1648, // Dictionary of Welsh Biography
        // ch
        d.P902, // hls-dhs-dss.ch
        d.P886, // e-lir.ch
        // en
        d.P1417, // Encyclopædia Britannica online .en
        // fr
        d.Q17329836, // Encyclopédique Larousse en ligne .fr
        // ru
        d.P2924, // Большая российская энциклопедия
        d.Q4091875, // Большая энциклопедия Кирилла и Мефодия .ru
        d.P1438, // Краткая еврейская .ru
        d.Q4239850, // Краткая литературная .ru
        d.Q2627728, // Кругосвет .ru
        d.Q4263804, // Литературная .ru
        d.Q2498180, // Православная .ru
        // se
        d.P3217, //Swedish National Biography
      ],
    } );
    this.groups.push( {
      label: i18n.tabEncyclopediasOnWikisource,
      fields: [//
      // cs
        d.Q2041543, // Ottův slovník naučný
        // de
        d.Q590208, // Allgemeine Deutsche Biographie
        // ru
        d.Q4086271, // Библейская энциклопедия архимандрита Никифора
        d.Q20078554, // Большая советская энциклопедия (1926—1947)
        d.Q4091878, // Большая энциклопедия Южакова
        d.Q4114391, // Военная энциклопедия Сытина
        d.Q4173137, // Еврейская энциклопедия Брокгауза и Ефрона
        d.Q19180675, // Малый энциклопедический словарь Брокгауза и Ефрона
        d.Q2152210, // Музыкальный словарь Римана
        d.Q19190511, // Новый энциклопедический словарь
        d.Q19211082, // Православная богословская энциклопедия
        d.Q1960551, // Русский биографический словарь
        d.Q19217220, // Русский энциклопедический словарь И. Н. Березина
        d.Q20078551, // Техническая энциклопедия (1927—1936)
        d.Q1970746, // Толковый словарь В. Даля
        d.Q602358, // Энциклопедический словарь Брокгауза и Ефрона
        d.Q4532135, // Энциклопедический лексикон, 1834—1841
        // uk
        d.Q15987216, // Dictionary of National Biography (1885-1900)
        d.Q20096917, // Encyclopædia Britannica, Ninth Edition (1875–1889)
        d.Q867541, // Encyclopædia Britannica, 11th edition (1911)
        d.Q15987490, // Encyclopædia Britannica, 12th edition (1922)
        d.Q20089963, // New International Encyclopedia (1902—05)
        // us
        d.Q19077875, // The American Cyclopædia (1879)
        d.Q19037977, // American Medical Biographies (1920)
        d.Q12912667, // Appletons' Cyclopædia of American Biography (1887—1901)
        d.Q302556, // Catholic Encyclopedia (1913)
      ],
    } );
    this.groups.push( {
      label: i18n.tabAuthorityControlVIAF,
      fields: [//
        d.P213, // ISNI
        d.P214, // VIAF
        d.P1017, // BAV
        d.P1015, // BIBSYS
        d.P1273, // BNC
        d.P950, // BNE
        d.P268, // BNF
        d.P651, // BPN
        d.P1309, // EGAXA
        d.P227, // DNB / GND
        d.P396, // ICCU / SBN
        d.P244, // LCCN
        d.P1368, // LNB
        d.P349, // NDL
        d.P691, // NKC
        d.P409, // NLA
        d.P1006, // NTA
        d.P1375, // NSK
        d.P951, // NSZL
        d.P1207, // NUKAT
        d.P1005, // PTBNP
        d.P947, // RSL
        d.P906, // SELIBR / LIBRIS
        d.P269, // SUDOC
        d.P245, // ULAN
      ],
    } );
    this.groups.push( {
      label: i18n.tabAuthorityControlOther,
      fields: [//
        d.P1003, // BNR
        d.P270, // CALIS
        d.P497, // CBDB
        d.P271, // CiNii
        d.P1280, // CONOR
        d.P380, // Mérimée
        d.P1315, // NLA PI
        d.P1213, // NLC
      ],
    } );
  }


  addButtonsEdit() {
    if ( !this.enabled )
      return;

    const leftMenuLink = $( document.createElement( 'a' ) ).text( i18n.buttonMenuLabel ).click( () => this.prepareEdit() );
    jQuery( '#p-tb div ul' ).append( jQuery( '<li class="plainlinks"></li>' ).append( leftMenuLink ) );

    const navboxLink = $( document.createElement( 'a' ) ).text( i18n.buttonNavboxLabel ).click( () => this.prepareEdit() );
    jQuery( 'table.ruwikiArticleExternalLinksTable' ).find( '.navbox-list' ).first().prepend(
      $( '<div style="float: right;"></div>' ).append( navboxLink ) );
  }

  prepareEdit() {
    if ( !this.enabled )
      return;

    jQuery.each( this.definitions, ( key, definition ) => {
      if ( typeof definition.code === 'undefined' ) {
        definition.code = key;
      }
      if ( typeof definition.label === 'undefined' ) {
        definition.label = key;
      }
      if ( typeof definition.qualifiers === 'undefined' ) {
        definition.qualifiers = this.defaultQualifiers;
      }
      definition.fillInTheGaps();
    } );

    const propertyKeysSet = [];
    const propertyKeysArray = [];
    jQuery.each( this.definitions, ( key, definition ) => {
      if ( /^[Pp][0-9]+$/.test( definition.code ) && !propertyKeysSet[ definition.code ] ) {
        propertyKeysSet[ definition.code ] = true;
        propertyKeysArray.push( definition.code );
      }
    } );

    const allPromises = [];
    jQuery.each( propertyKeysArray.chunk( 50 ), ( chunkIndex, chunk ) => {
      mw.notify( 'Loading ' + chunk.length + ' properties starting from ' + chunk[ 0 ] + '...' );
      const getPromise = ApiUtils.getWikidataApi().get( {
        action: 'query',
        prop: 'revisions',
        titles: chunk.map( function( x ) {
          return 'Property:' + x;
        } ).join( '|' ),
        rvprop: 'content',
        format: 'json'
      } );
      getPromise.then( ( json ) => {
        jQuery.each( json.query.pages, ( pageId, page ) => {
          if ( page && page.revisions && page.revisions[ 0 ] && page.revisions[ 0 ][ '*' ] ) {
            const content = JSON.parse( page.revisions[ 0 ][ '*' ] );
            const definition = this.definitions[ content.id ];
            if ( definition ) {
              definition.datatype = content.datatype;
            }
            if ( content.claims ) {
              if ( !definition.template && content.claims.P1630 && content.claims.P1630[ 0 ] && content.claims.P1630[ 0 ].mainsnak
                  && content.claims.P1630[ 0 ].mainsnak.datavalue && content.claims.P1630[ 0 ].mainsnak.datavalue.value ) {
                definition.template = content.claims.P1630[ 0 ].mainsnak.datavalue.value;
              }
              if ( !definition.check && content.claims.P1793 && content.claims.P1793[ 0 ] && content.claims.P1793[ 0 ].mainsnak
                  && content.claims.P1793[ 0 ].mainsnak.datavalue && content.claims.P1793[ 0 ].mainsnak.datavalue.value ) {
                definition.check = '^' + content.claims.P1793[ 0 ].mainsnak.datavalue.value + '$';
              }
            }
            definition.fillInTheGaps();
          }
        } );
      } );
      allPromises.push( getPromise );
    } );

    const entityId = this.entityId;
    let entity;
    mw.notify( 'Get Wikidata entity content...' );
    const getEntityPromise = ApiUtils.getWikidataApi().get( {
      action: 'wbgetentities',
      ids: entityId,
      format: 'json'
    } );
    getEntityPromise.then( ( result ) => {
      if ( typeof result === 'undefined'
          || typeof result.entities === 'undefined'
          || typeof result.entities[ entityId ] === 'undefined'
          || typeof result.entities[ entityId ].claims === 'undefined'
      ) {
        mw.notify( 'Wikidata answer format is not expected one' );
        throw new Error( 'Wikidata answer format is not expected one' );
      }
      entity = result.entities[ entityId ];
    } );
    allPromises.push( getEntityPromise );

    return jQuery.when.apply( jQuery, allPromises ).then( () => this.doEdit( entity ) );
  }


  doEdit( entity ) {
    if ( typeof entity == 'undefined' ) {
      alert( 'Wikidata entity was not loaded' );
      return;
    }

    const dialogForm = jQuery( document.createElement( 'div' ) )
      .addClass( coreStyles.wef_dialog )
      .attr( 'id', 'wefExternalLinksDialog' )
      .attr( 'title', i18n.dialogTitle );
    const dialogTabs = jQuery( document.createElement( 'div' ) )
      .attr( 'id', 'wefExternalLinksDialogTabs' )
      .appendTo( dialogForm );
    const dialogTabsList = jQuery( document.createElement( 'ul' ) )
      .appendTo( dialogTabs );

    dialogForm.find( '#ruWikiExternalEditProgress' ).hide();

    const _this = this;
    jQuery( 'div#mw-content-text' ).after( dialogForm );
    dialogForm.dialog( {
      autoOpen: true,
      autoResize: true,
      height: 'auto',
      width: _this.dialogWidth,
      modal: false,
      open: function( ) {
        _this.entity = entity;
        _this.editors = {};

        dialogForm.find( 'tr' ).remove();
        dialogTabs.hide();
        jQuery.each( _this.groups, function( index, group ) {
          const link = 'wefExternalLinksDialogTabs-' + index;
          const newTabHeader = jQuery( '<li></li>' ).append( jQuery( '<a href="#' + link + '"></a>' ).text( group.label ) );
          const newTabTable = jQuery( '<table border="0" style="white-space: nowrap;" width="100%" cellspacing="0"></table>' );
          const newTabPage = jQuery( '<div id="' + link + '"></div>' ).append( newTabTable );

          dialogTabsList.append( newTabHeader );
          dialogTabs.append( newTabPage );

          jQuery.each( group.fields, function( i, definition ) {
            const claimEditorsTable = new WEF_ClaimEditorsTable( definition );
            _this.editors[ definition.code ] = claimEditorsTable;
            claimEditorsTable.appendTo( newTabTable );
          } );
        } );

        jQuery.each( _this.editors, function( i, claimEditorsTable ) {
          claimEditorsTable.init( _this.entity );
        } );

        // recenter
        dialogTabs.tabs();
        dialogTabs.tabs( 'destroy' );
        dialogTabs.tabs( {
          activate: function() {
            dialogForm.dialog( {
              height: 'auto',
              autoResize: true,
            } );
          }
        } );
        dialogTabs.show();
        dialogForm.dialog( {
          height: 'auto',
          autoResize: true,
        } );
        dialogForm.dialog( 'option', 'position', 'center' );
      },
      buttons: [ {
        text: i18n.dialogButtonUpdateLabelsText,
        label: i18n.dialogButtonUpdateLabelsLabel,
        click: function() {
          wef_LabelsCache.clearCacheAndRequeue();
        },
        style: 'position: absolute; left: 1em;',
      }, {
        text: i18n.dialogButtonSaveText,
        label: i18n.dialogButtonSaveLabel,
        click: function() {
          dialogForm.dialog( 'close' );
          wef_analyze_and_save( true, _this.entityId, null, _this.editors )
            .then( function( entityId ) {
              WEF_Utils.tagRevisions( entityId, true ).always( function() {
                ApiUtils.purge();
              } );
            } );
        }
      }, {
        text: i18n.dialogButtonCancelText,
        label: i18n.dialogButtonCancelLabel,
        click: function() {
          jQuery( this ).dialog( 'close' );
        }
      } ]
    } );

    {
      const viafFillFieldset = jQuery( '<fieldset></fieldset>' );
      const viafFillDialog = jQuery( '<div></div>' ).attr( 'title', i18n.buttonViafLabel ).append( jQuery( '<form></form>' ).append( viafFillFieldset ) );
      _this.viafFillDialog = viafFillDialog;
      const viafFillInput = jQuery( '<input type="text" style="width: 100%;"></input>' );
      const viafFillCheckButtons = jQuery( '<div></div>' );
      viafFillFieldset.append( viafFillInput ).append( viafFillCheckButtons );

      let oldSearch = null;
      const onSearchUpdate = function() {
        if ( !viafFillInput.val() )
          return;
        if ( oldSearch === viafFillInput.val() )
          return;
        oldSearch = viafFillInput.val();

        jQuery.ajax( {
          type: 'GET',
          url: '//viaf.org/viaf/AutoSuggest?query=' + encodeURIComponent( viafFillInput.val() ) + '&callback=?',
          dataType: 'jsonp',
          success: function( data ) {
            viafFillCheckButtons.empty();
            if ( $.isEmptyObject( data.result ) ) {
              return;
            }
            jQuery.each( data.result, function( index, entry ) {
              let existing = viafFillCheckButtons.find( 'label#viaflabel' + entry.viafid );
              if ( existing.length === 0 ) {
                const checkbox = jQuery( '<input type="checkbox" name="viafFillItem" id="viaf' + entry.viafid + '" value="' + entry.viafid + '">' );
                checkbox.data( 'viaf', entry );
                const label = jQuery( '<label for="viaf' + entry.viafid + '" id="viaflabel' + entry.viafid + '"></label>' );
                if ( typeof entry.nametype !== 'undefined' ) {
                  label.append( jQuery( '<i></i>' ).text( entry.nametype + ': ' ) );
                }
                label.append( jQuery( '<a href="http://www.viaf.org/viaf/' + entry.viafid + '">VIAF: ' + entry.viafid + '</a>; ' ) );

                viafFillCheckButtons.append( checkbox );
                viafFillCheckButtons.append( label );
                viafFillCheckButtons.append( '<br >' );
                existing = label;
              }

              existing.append( '<br>' ).append( jQuery( '<span style="margin-left: 2em;"></span>' ).text( entry.term + '; ' ) );
            } );
          }
        } );
      };

      viafFillInput.change( onSearchUpdate );
      viafFillInput.keyup( onSearchUpdate );

      viafFillDialog.dialog( {
        autoOpen: false,
        height: 600,
        width: 640,
        modal: false,
        open: function() {
          onSearchUpdate();
        },
        buttons: {
          'Select': function() {
            WEF_ClaimEditorsTable.removeFoundValueClasses();
            const selected = viafFillCheckButtons.find( 'input[type=checkbox]:checked' );
            jQuery.each( selected, function( i1, input ) {
              const checkbox = jQuery( input );
              const viafdata = checkbox.data( 'viaf' );
              if ( viafdata ) {
                jQuery.each( _this.definitions,
                  /**
                   * @param definition
                   *            {WEF_Definition}
                   */
                  function( i2, definition ) {
                    if ( typeof definition.viaf === 'undefined' ) {
                      return;
                    }
                    let newValue = viafdata[ definition.viaf ];
                    if ( typeof newValue === 'undefined' || newValue.length === 0 ) {
                      return;
                    }

                    const editors = _this.editors[ definition.code ];
                    if ( typeof editors === 'undefined' ) {
                      return;
                    }

                    if ( jQuery.isFunction( definition.normalize ) ) {
                      newValue = definition.normalize( newValue );
                    }

                    editors.onFoundStringValue( newValue );
                  } );
              }
            } );
            viafFillDialog.dialog( 'close' );
          },
          'Cancel': function() {
            viafFillDialog.dialog( 'close' );
          },
        }
      } );
    }
  }


}
