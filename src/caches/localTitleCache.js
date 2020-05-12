// @flow

import AbstractQueuedCache from './AbstractQueuedCache';
import { getWikidataApi } from 'core/ApiUtils';

const EMPTY_OBJECT : any = Object.freeze( {} );
const TYPE = 'LOCALTITLES';
const wgDBname = mw.config.get( 'wgDBname' );

// Flow typecheck hack
const entries = <T>( obj : { [string] : T } ) : [string, T][] => Object.keys( obj ).map( key => [ key, obj[ key ] ] );

class LocalTitleCache extends AbstractQueuedCache {

  constructor() {
    super( TYPE, false, 50 );
  }

  isKeyValid( cacheKey : string ) : boolean {
    return typeof cacheKey === 'string' && !!cacheKey.match( /^Q(\d+)$/i );
  }

  notifyMessage( cacheKeys : string[] ) {
    return 'Fetching ' + cacheKeys.length + ' item(s) local titles from Wikidata';
  }

  buildRequestPromice( cacheKeys : string[] ) {
    return getWikidataApi()
      .getPromise( {
        action: 'wbgetentities',
        props: 'sitelinks',
        sitefilter: wgDBname,
        ids: cacheKeys.join( '|' ),
      } );
  }

  convertResultToEntities( result : any ) : {| [string] : ?string |} {
    const cacheUpdate : {| [string] : ?string |} = ( {} : any );
    for ( const [ entityId, entity ] of entries( result.entities ) ) {
      const sitelinks : SiteLinksType = ( entity || EMPTY_OBJECT ).sitelinks || EMPTY_OBJECT;
      const sitelink : SiteLinkType = sitelinks[ wgDBname ] || EMPTY_OBJECT;
      cacheUpdate[ entityId ] = sitelink.title || null;
    }
    return cacheUpdate;
  }

}

const instance = new LocalTitleCache();
export default instance;
