import AbstractQueuedCache from './AbstractQueuedCache';
import { getWikidataApi } from 'core/ApiUtils';

const wgDBname = mw.config.get( 'wgDBname' );
const TYPE = 'LOCALTITLES';

class LocalTitleCache extends AbstractQueuedCache {

  constructor() {
    super( TYPE, false, 50 );
  }

  isKeyValid( cacheKey ) {
    return typeof cacheKey === 'string' && cacheKey.match( /^Q(\d+)$/i );
  }

  notifyMessage( cacheKeys ) {
    return 'Fetching ' + cacheKeys.length + ' item(s) local titles from Wikidata';
  }

  buildRequestPromice( cacheKeys ) {
    return getWikidataApi()
      .getPromise( {
        action: 'wbgetentities',
        props: 'sitelinks',
        sitefilter: wgDBname,
        ids: cacheKeys.join( '|' ),
      } );
  }

  convertResultToEntities( result ) {
    const cacheUpdate = {};
    Object.values( result.entities ).forEach( entity => {
      const title = ( ( ( entity || {} ).sitelinks || {} )[ wgDBname ] || {} ).title || null;
      cacheUpdate[ entity.id ] = title;
    } );
    return cacheUpdate;
  }

}

const instance = new LocalTitleCache();
export default instance;
