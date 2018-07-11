//import * as WEF_Utils from './utils';
//
const MW_SCRIPT_PATH = mw.config.get( 'wgScriptPath' );

const WG_ARTICLE_ID = mw.config.get( 'wgArticleId' );
const WG_PAGE_NAME = mw.config.get( 'wgPageName' );
const WG_SERVER = mw.config.get( 'wgServer' );
const WG_SITE_NAME = mw.config.get( 'wgSiteName' );
const WG_TITLE = mw.config.get( 'wgTitle' );
const WG_WIKIBASE_ITEM_ID = mw.config.get( 'wgWikibaseItemId' );

function addPromises( api ) {
  const toPromise = origin => function() {
    const args = arguments;
    return new Promise( ( resolve, reject ) => {
      origin.apply( api, args )
        .then( resolve ).catch( reject );
    } );
  };

  api.getPromise = toPromise( api.get );
  api.postPromise = toPromise( api.post );
  api.postWithTokenPromise = toPromise( api.postWithToken );
  api.postWithEditTokenPromise = toPromise( api.postWithEditToken );

  return api;
}

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

function getServerApiImpl() {
  const api = new mw.Api();
  if ( typeof api.postWithEditToken === 'undefined' ) {
    api.postWithEditToken = function( params, ajaxOptions ) {
      return this.postWithToken( 'edit', params, ajaxOptions );
    };
  }
  return addPromises( api );
}
let serverApi = null;
export const getServerApi = () => serverApi === null ? serverApi = getServerApiImpl() : serverApi;

function getCommonsApiImpl() {
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
  return addPromises( api );
}
let commonsApi = null;
export const getCommonsApi = () => commonsApi === null ? commonsApi = getCommonsApiImpl() : commonsApi;

export function isCommons() {
  return WG_SITE_NAME === 'Wikimedia Commons';
}

function getWikidataApiImpl() {
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
  return addPromises( api );
}
let wikidataApi = null;
export const getWikidataApi = () => wikidataApi === null ? wikidataApi = getWikidataApiImpl() : wikidataApi;

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
