//import * as WEF_Utils from './utils';
//
const MW_SCRIPT_PATH = mw.config.get( 'wgScriptPath' );

const WG_ARTICLE_ID = mw.config.get( 'wgArticleId' );
const WG_PAGE_NAME = mw.config.get( 'wgPageName' );
const WG_SERVER = mw.config.get( 'wgServer' );
const WG_SITE_NAME = mw.config.get( 'wgSiteName' );
const WG_TITLE = mw.config.get( 'wgTitle' );
const WG_WIKIBASE_ITEM_ID = mw.config.get( 'wgWikibaseItemId' );

let deferredEntityIdPromise = null;
export function getEntityIdDeferred() {
  if ( deferredEntityIdPromise ) {
    return deferredEntityIdPromise;
  }

  deferredEntityIdPromise = new Promise( ( resolve, reject ) => {
    if ( !WG_ARTICLE_ID ) {
      reject( 'wgArticleId configuration variable is not set' );
      return;
    }

    if ( isWikidata() ) {
      resolve( WG_TITLE );
      return;
    }

    if ( WG_WIKIBASE_ITEM_ID ) {
      resolve( WG_WIKIBASE_ITEM_ID );
      return;
    }

    // more complicated case, need API call
    new mw.Api().get( {
      action: 'query',
      prop: 'pageprops',
      pageids: WG_ARTICLE_ID,
    } ).then( data => {
      try {
        let resolved = false;
        if ( data.query && data.query.pages ) {
          jQuery.each( data.query.pages, ( pageId, page ) => {
            if ( page.pageid && page.pageprops && page.pageprops.wikibase_item && page.pageid == WG_ARTICLE_ID ) {
              resolve( page.pageprops.wikibase_item );
              resolved = true;
            }
          } );
        }
        if ( !resolved ) {
          resolve( null );
        }
      } catch ( error ) {
        reject( error );
      }
    } );

  } );
  return deferredEntityIdPromise;
}

export function getCommonsApi() {
  let api;
  if ( !isCommons() ) {
    api = new mw.ForeignApi( '//commons.wikimedia.org/w/api.php' );
  } else {
    api = new mw.Api();
  }
  if ( typeof api.postWithEditToken === 'undefined' ) {
    api.postWithEditToken = function( params, ajaxOptions ) {
      return this.postWithToken( 'edit', params, ajaxOptions );
    };
  }
  return api;
}

export function isCommons() {
  return WG_SITE_NAME === 'Wikimedia Commons';
}

export function getWikidataApi() {
  let api;
  if ( !isWikidata() ) {
    api = new mw.ForeignApi( '//www.wikidata.org/w/api.php' );
  } else {
    api = new mw.Api();
  }
  if ( typeof api.postWithEditToken === 'undefined' ) {
    api.postWithEditToken = function( params, ajaxOptions ) {
      return this.postWithToken( 'edit', params, ajaxOptions );
    };
  }
  return api;
}

export function isWikidata() {
  return WG_SITE_NAME === 'Wikidata';
}

export function purge() {
  purgeAsync().then( () => {
    const url = WG_SERVER + MW_SCRIPT_PATH + '/index.php?title=' + encodeURIComponent( WG_PAGE_NAME ) + '&r=' + Math.random();
    window.location.replace( url );
  } );
}

export function purgeAsync() {
  return new mw.Api().post( {
    action: 'purge',
    titles: WG_PAGE_NAME,
  } );
}

//export function wbGetEntities( params ) {
//  params.action = 'wbgetentities';
//  params.uselang = WEF_Utils.getDefaultLanguageCode();
//
//  return new Promise( ( resolve, reject ) => {
//    getWikidataApi()
//      .post( params )
//      .then( function( response ) {
//        if ( response.error ) {
//          console.log( 'Unable to call \'wbgetentities\': ' + response.error.info );
//          reject( response.error );
//          return;
//        }
//        resolve( response.entities );
//      } ).fail( function( jqXHR, textStatus, errorThrown ) {
//        // too bad :-(
//        console.log( 'Unable to call \'wbgetentities\'' );
//        console.log( textStatus );
//        console.log( errorThrown );
//        reject( errorThrown );
//        return;
//      } );
//  } );
//}
