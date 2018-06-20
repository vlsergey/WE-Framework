import * as ApiUtils from 'core/ApiUtils.js';
import * as WEF_Utils from 'core/utils.js';
import coreStyles from 'core/core.css';
import wef_LabelsCache from 'core/labelsCache';

const wgDBname = mw.config.get( 'wgDBname' );
const wgServer = mw.config.get( 'wgServer' );

function getWikisourceApiPrefix( languageCode ) {
  if ( wgDBname === languageCode + 'wikisource' ) {
    return '//' + languageCode + '.wikisource.org/w/api.php?format=json';
  } else {
    return '//' + languageCode + '.wikisource.org/w/api.php' + '?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json';
  }
}

const prefixes = {
  cswikisource: getWikisourceApiPrefix( 'cs' ),
  dewikisource: getWikisourceApiPrefix( 'de' ),
  enwikisource: getWikisourceApiPrefix( 'en' ),
  frwikisource: getWikisourceApiPrefix( 'fr' ),
  ruwikisource: getWikisourceApiPrefix( 'ru' ),
};

function createDictinaryArticleItem( options, pageTitle, articleTitle ) {
  const data = {
    type: 'item',
    labels: {},
  };
  const wikidataTitlePrefix = WEF_Utils.isEmpty( options.wikidataTitlePrefix ) ? options.pageTitlePrefix : options.wikidataTitlePrefix;
  data.labels[ options.contentLanguage ] = {
    language: options.contentLanguage,
    value: wikidataTitlePrefix + ' / ' + articleTitle,
  };
  data.labels[ 'ru' ] = {
    language: 'ru',
    value: wikidataTitlePrefix + ' / ' + articleTitle,
  };
  data.descriptions = {};
  data.descriptions[ 'en' ] = {
    language: 'en',
    value: 'encyclopedic article',
  };
  data.descriptions[ 'ru' ] = {
    language: 'ru',
    value: 'энциклопедическая статья',
  };

  data.claims = {

    // type
    'P31': [ {
      'mainsnak': {
        'snaktype': 'value',
        'property': 'P31',
        'datatype': 'wikibase-item',
        'datavalue': {
          'value': {
            'entity-type': 'item',
            'numeric-id': 17329259
          },
          'type': 'wikibase-entityid'
        }
      },
      'type': 'statement',
      'rank': 'normal'
    } ],

    // part from
    'P361': [ {
      'mainsnak': {
        'snaktype': 'value',
        'property': 'P361',
        'datatype': 'wikibase-item',
        'datavalue': {
          'value': {
            'entity-type': 'item',
            'numeric-id': Number( options.dictionaryEntityId.substring( 1 ) )
          },
          'type': 'wikibase-entityid'
        }
      },
      'type': 'statement',
      'rank': 'normal'
    } ],

    // published in
    'P1433': [ {
      'mainsnak': {
        'snaktype': 'value',
        'property': 'P1433',
        'datatype': 'wikibase-item',
        'datavalue': {
          'value': {
            'entity-type': 'item',
            'numeric-id': Number( options.dictionaryEntityId.substring( 1 ) )
          },
          'type': 'wikibase-entityid'
        }
      },
      'type': 'statement',
      'rank': 'normal'
    } ],

    // main topic
    'P921': [ {
      'mainsnak': {
        'snaktype': 'value',
        'property': 'P921',
        'datatype': 'wikibase-item',
        'datavalue': {
          'value': {
            'entity-type': 'item',
            'numeric-id': Number( options.mainTopicEntityId.substring( 1 ) )
          },
          'type': 'wikibase-entityid'
        }
      },
      'type': 'statement',
      'rank': 'normal'
    } ],

    // title
    'P1476': [ {
      'mainsnak': {
        'snaktype': 'value',
        'property': 'P1476',
        'datatype': 'monolingualtext',
        'datavalue': {
          'value': {
            'language': options.contentLanguage,
            'text': articleTitle,
          },
          'type': 'monolingualtext'
        }
      },
      'type': 'statement',
      'rank': 'normal'
    } ],
  };

  data.sitelinks = {};
  data.sitelinks[ options.project ] = {
    'site': options.project,
    'title': pageTitle,
  };

  return WEF_Utils.createWikidataItem( data );
}

const DATA_ENTITY_ID = 'value-entity-id';
const DATA_ENTITY_LABEL = 'value-entity-label';

class DictionaryArticleInputClass {

  constructor( options ) {
    this.options = options;
    const input = this.input = $( document.createElement( 'input' ) )
      .attr( 'type', 'text' )
      .addClass( coreStyles.wef_item_input );
    const dictinaryArticleInput = this;

    input.autocomplete( {
      source: function( request, response ) {
        const term = request.term;
        $.ajax( {
          dataType: 'json',
          url: options.projectApiPrefix //
                + '&action=query&list=search&swhat=text&srnamespace=0&srlimit=15' //
                + '&srsearch=' + encodeURIComponent( options.pageTitlePrefix + ' ' + term ),
        } ).then( ( result ) => {
          const list = [];
          $.each( result.query.search, function( index, entity ) {
            if ( entity.title.substring( 0, options.pageTitlePrefixLength ) !== options.pageTitlePrefix + options.pageTitleSplitChar )
              return;

              /* Convert page name to article title */
            let articleTitle = entity.title.substring( options.pageTitlePrefixLength );

            /* remove special ruwikisource prefixes */
            if ( options.contentLanguage === 'ru' ) {
              if ( articleTitle.substring( 0, 3 ) == 'ВТ/' )
                articleTitle = articleTitle.substring( 3 );
              else if ( articleTitle.substring( 0, 3 ) == 'ДО/' )
                articleTitle = articleTitle.substring( 3 );
            }

            const item = {
              articleTitle: articleTitle,
              pageTitle: entity.title,
              snippet: entity.snippet,
            };
            list.push( item );
          } );
          response( list );
        } );
      },
      select: function( event, ui ) {
        const item = ui.item;
        const input = $( event.target );

        if ( $.isEmptyObject( item ) || WEF_Utils.isEmpty( item.articleTitle ) ) {
          input.val( '' );
          input.removeData( DATA_ENTITY_ID );
          input.removeData( DATA_ENTITY_LABEL );
          input.removeAttr( 'title' );
          return;
        }

        let entityId;

        // check if item exists on Wikidata
        ApiUtils.wbGetEntities( {
          sites: options.project,
          titles: item.pageTitle,
          redirects: 'yes',
          props: 'info',
          normalize: 'yes',
        } ).then( ( entities ) => {

          if ( !$.isEmptyObject( entities ) ) {
            entityId = WEF_Utils.getFirstObjectKey( entities );
          }

          if ( !WEF_Utils.isEmpty( entityId ) && entityId !== -1 && entityId !== '-1' ) {
            dictinaryArticleInput.val( entityId );
            return;
          }

          if ( confirm( 'There is no Wikidata item linked to page «' + item.pageTitle + '» of ' + options.project
                    + '\nDo you want to automatically create such item?' ) ) {
            createDictinaryArticleItem( options, item.pageTitle, item.articleTitle ).then(
              ( newEntityId ) => dictinaryArticleInput.val( newEntityId ) );
          }

        } );
        return false;
      },
    } );

    input.data( 'autocomplete' )._renderItem = function( ul, item ) {
      const a = $( '<a><strong>' + item.articleTitle + '</strong><br>' + '</a>' );
      // TODO: add description to UI
      // var desc = $( document.createElement( 'span' ) ).html( item.snippet ).appendTo( a );
      return $( document.createElement( 'li' ) ).append( a ).data( 'item.autocomplete', item ).appendTo( ul );
    };

    input.focus( function() {
      const label = input.data( DATA_ENTITY_LABEL );

      if ( typeof id === 'undefined' || typeof label === 'undefined' ) {
        input.val( '' );
        input.removeData( DATA_ENTITY_ID );
        input.removeData( DATA_ENTITY_LABEL );
      } else {
        input.val( label );
      }

      input.change();
    } );

    input.blur( function() {
      const id = input.data( DATA_ENTITY_ID );
      const label = input.data( DATA_ENTITY_LABEL );
      const currentVal = input.val();
      if ( currentVal === label + ' (' + id + ')' ) {
        // no op, everything is okay
      } else if ( currentVal === label ) {
        input.val( label + ' (' + id + ')' );
      } else {
        input.val( '' );
        input.removeData( DATA_ENTITY_ID );
        input.removeData( DATA_ENTITY_LABEL );
      }

      input.change();
    } );

    this.change = input.change.bind( input );
    this.keyup = input.keyup.bind( input );
  }

  val( entityId ) {
    if ( typeof entityId === 'undefined' ) {
      // return current value
      return this.input.data( DATA_ENTITY_ID );
    }

    // or set value
    this.input.data( DATA_ENTITY_ID, entityId );
    this.input.data( DATA_ENTITY_LABEL, '' );
    this.input.val( '(' + entityId + ')' );

    wef_LabelsCache.getOrQueue( entityId, ( label, description ) => {
      if ( this.input.data( DATA_ENTITY_ID ) === entityId ) {
        // we need to be sure user didn't start to edit field
        const currentText = this.input.val();
        if ( currentText === '(' + entityId + ')'
            || currentText === this.input.data( DATA_ENTITY_LABEL ) + ' (' + entityId + ')'
            || currentText === entityId + ' (' + entityId + ')' ) {
          this.input.data( DATA_ENTITY_LABEL, label );
          this.input.val( label + ' (' + entityId + ')' );
          this.input.attr( 'title', description );
        }
      }
    } );

    this.change();
  }

  addClass() {
    this.input.addClass.apply( this.input, arguments );
    return this;
  }

  appendTo() {
    this.input.appendTo.apply( this.input, arguments );
    return this;
  }
}

export default function createDictinaryArticleInputClass( originalOptions ) {
  const options = {
    ...originalOptions,
    pageTitlePrefixLength: originalOptions.pageTitlePrefix.length + originalOptions.pageTitleSplitChar.length,
    projectApiPrefix : prefixes[ originalOptions.project ],
  };

  return new DictionaryArticleInputClass( options );
}
