import AbstractSelfStoredQueuedCache from './AbstractSelfStoredQueuedCache';
import { getWikidataApi } from 'core/ApiUtils';

const TYPE = 'LASTREVISION';

type ResultType = {
  query : {
    pages : { [any] : PageType }
  }
};

type PageType = {
  missing? : '',
  pageid : number,
  revisions : {
    revid : number,
  }[]
};

class LastRevisionCache extends AbstractSelfStoredQueuedCache {

  constructor() {
    super( TYPE, true, 50 );
  }

  isKeyValid( pageId ) {
    return typeof pageId === 'number' && Number.isInteger( pageId );
  }

  notifyMessage( cacheKeys ) {
    return 'Fetching ' + cacheKeys.length + ' last revisions from Wikidata';
  }

  buildRequestPromice( pageIds ) {
    return getWikidataApi()
      .getPromise( {
        action: 'query',
        prop: 'revisions',
        rvprop: 'ids',
        pageids: pageIds.join( '|' ),
      } );
  }

  convertResultToEntities( result : ResultType ) {
    const cacheUpdate = {};
    const pages : PageType[] = ( ( Object.values( result.query.pages ) : any ) : PageType[] );
    pages.forEach( page => {
      if ( page.missing !== undefined ) {
        cacheUpdate[ page.pageid ] = -1;
      } else {
        cacheUpdate[ page.pageid ] = page.revisions[ 0 ].revid;
      }
    } );
    return cacheUpdate;
  }

}

const instance = new LastRevisionCache();
export default instance;
