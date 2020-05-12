// @flow

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

  isKeyValid( pageId : ?number ) : boolean {
    return typeof pageId === 'number' && Number.isInteger( pageId );
  }

  notifyMessage( cacheKeys : number[] ) : string {
    return 'Fetching ' + cacheKeys.length + ' last revisions from Wikidata';
  }

  buildRequestPromice( pageIds : number[] ) {
    return getWikidataApi()
      .getPromise( {
        action: 'query',
        prop: 'revisions',
        rvprop: 'ids',
        pageids: pageIds.join( '|' ),
      } );
  }

  convertResultToEntities( result : ResultType ) : Map< number, number > {
    const cacheUpdate : Map< number, number > = new Map();
    const pages : PageType[] = ( ( Object.values( result.query.pages ) : any ) : PageType[] );
    pages.forEach( page => {
      if ( page.missing !== undefined ) {
        cacheUpdate.set( page.pageid, -1 );
      } else {
        cacheUpdate.set( page.pageid, page.revisions[ 0 ].revid );
      }
    } );
    return cacheUpdate;
  }

}

const instance = new LastRevisionCache();
export default instance;
