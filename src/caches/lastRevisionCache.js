import AbstractSelfStoredQueuedCache from './AbstractSelfStoredQueuedCache';
import { getWikidataApi } from 'core/ApiUtils';

const TYPE = 'LASTREVISION';

class LastRevisionCache extends AbstractSelfStoredQueuedCache {

  constructor() {
    super( TYPE, true, 50 );
  }

  isKeyValid( pageId ) {
    return Number.isInteger( pageId );
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

  convertResultToEntities( result ) {
    const cacheUpdate = {};
    Object.values( result.query.pages ).forEach( page => {
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
