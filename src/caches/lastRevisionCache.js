// @flow

import Batcher from '@vlsergey/batcher';
import { getWikidataApi } from 'core/ApiUtils';

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

class LastRevisionCache {

  _batcher : Batcher;
  _cache : Map< number, ?number > = new Map();

  constructor() {
    this._batcher = new Batcher( this._batchFunction, { flattenArguments: true } );
  }

  async _batchFunction( pageIds : number[] ) : Promise< ( ?number )[] > {
    const json : ResultType = await getWikidataApi()
      .getPromise( {
        action: 'query',
        prop: 'revisions',
        rvprop: 'ids',
        pageids: pageIds.join( '|' ),
      } );

    const resultMap : Map< number, number > = new Map();
    const pages : PageType[] = ( ( Object.values( json.query.pages ) : any ) : PageType[] );
    pages.forEach( page => {
      if ( page.missing !== undefined ) {
        resultMap.set( page.pageid, -1 );
      } else {
        resultMap.set( page.pageid, page.revisions[ 0 ].revid );
      }
    } );

    const resultArray : ( ?number )[] = pageIds.map( pageId => resultMap.get( pageId ) || null );
    return resultArray;
  }

  queue( pageId : number ) : Promise< ?number > {
    const previous = this._cache.get( pageId );
    if ( previous != undefined && previous != null ) {
      return Promise.resolve( previous );
    }

    return this._batcher.queue( pageId )
      .then( ( revisionId : ?number ) => {
        if ( revisionId != undefined && revisionId != null ) {
          this._cache.set( pageId, revisionId );
        }
        return revisionId;
      } );
  }

  queueAll( pageIds : number[] ) : Promise< ( ?number )[] > {
    return Promise.all( pageIds.map( this.queue, this ) );
  }

}

const instance : LastRevisionCache = new LastRevisionCache();
export default instance;
