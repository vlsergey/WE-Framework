const MW_SCRIPT_PATH = mw.config.get('wgScriptPath');

const WG_ARTICLE_ID = mw.config.get('wgArticleId');
const WG_PAGE_NAME = mw.config.get('wgPageName');
const WG_SERVER = mw.config.get('wgServer');
const WG_SITE_NAME = mw.config.get('wgSiteName');
const WG_TITLE = mw.config.get('wgTitle');
const WG_WIKIBASE_ITEM_ID = mw.config.get('wgWikibaseItemId');

function addPromises (api: Api): Api {
  const toPromise = <T> (originMethod: Function) =>
    (...args: unknown[]) => new Promise<T>((resolve, reject) => {
      originMethod.apply(api, args)
        .then(resolve)
        .catch(reject);
    });

  api.getPromise = toPromise(api.get);
  api.postPromise = toPromise(api.post);
  api.postWithTokenPromise = toPromise(api.postWithToken);
  api.postWithEditTokenPromise = toPromise(api.postWithEditToken);

  return api;
}

let deferredEntityIdPromise: Promise<string | null > | null = null;

export function getEntityIdDeferred (): Promise<string | null> {
  return deferredEntityIdPromise || (deferredEntityIdPromise = deferredEntityIdPromiseImpl());
}

async function deferredEntityIdPromiseImpl (): Promise<string | null> {
  if (!WG_ARTICLE_ID) {
    throw 'wgArticleId configuration variable is not set';
  }

  if (WG_WIKIBASE_ITEM_ID) {
    return WG_WIKIBASE_ITEM_ID;
  }

  if (isWikidata()) {
    return WG_TITLE;
  }

  // more complicated case, need API call
  const data: QueryPagePropsActionReslt = await new mw.Api().getPromise({
    action: 'query',
    prop: 'pageprops',
    pageids: WG_ARTICLE_ID,
  });

  if (data.query && data.query.pages) {
    for (const page of Object.values(data.query.pages)) {
      if (page?.pageid === WG_ARTICLE_ID && page?.pageprops?.wikibase_item) {
        return page.pageprops.wikibase_item;
      }
    }
  }

  return null;
}

function getServerApiImpl () {
  const api = new mw.Api();
  if (typeof api.postWithEditToken === 'undefined') {
    api.postWithEditToken = function (params: ApiCallParams, ajaxOptions?: AjaxOptions) {
      return this.postWithToken('edit', params, ajaxOptions);
    };
  }
  return addPromises(api);
}
let serverApi: Api;
export const getServerApi = () => serverApi || (serverApi = getServerApiImpl());

function getCommonsApiImpl () {
  let api;
  if (!isCommons()) {
    api = new mw.ForeignApi('//commons.wikimedia.org/w/api.php');
  } else {
    api = new mw.Api();
  }
  if (typeof api.postWithEditToken === 'undefined') {
    api.postWithEditToken = function (params: ApiCallParams, ajaxOptions?: AjaxOptions) {
      return this.postWithToken('edit', params, ajaxOptions);
    };
  }
  return addPromises(api);
}
let commonsApi: Api;
export const getCommonsApi = () => commonsApi || (commonsApi = getCommonsApiImpl());

export function isCommons () {
  return WG_SITE_NAME === 'Wikimedia Commons';
}

const WIKIDATA_ROOT = '//www.wikidata.org/';

function getWikidataApiImpl () {
  let api;
  if (!isWikidata()) {
    api = new mw.ForeignApi(WIKIDATA_ROOT + 'w/api.php');
  } else {
    api = new mw.Api();
  }
  if (typeof api.postWithEditToken === 'undefined') {
    api.postWithEditToken = function (params: ApiCallParams, ajaxOptions?: AjaxOptions) {
      return this.postWithToken('edit', params, ajaxOptions);
    };
  }
  return addPromises(api);
}
let wikidataApi: null | Api = null;
export const getWikidataApi = () => wikidataApi === null ? wikidataApi = getWikidataApiImpl() : wikidataApi;

export function isWikidata () {
  return WG_SITE_NAME === 'Wikidata';
}

export async function purge () {
  await purgeAsync();
  const url = WG_SERVER + MW_SCRIPT_PATH + '/index.php?title=' + encodeURIComponent(WG_PAGE_NAME) + '&r=' + Math.random();
  window.location.replace(url);
}

export async function purgeAsync () {
  await new mw.Api().postPromise({
    action: 'purge',
    titles: WG_PAGE_NAME,
  });
}

// export function wbGetEntities( params ) {
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
// }
