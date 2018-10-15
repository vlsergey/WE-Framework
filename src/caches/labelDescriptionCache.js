import AbstractQueuedCache from './AbstractQueuedCache';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import { getWikidataApi } from 'core/ApiUtils';
import LabelDescription from './LabelDescription';

const TYPE = 'LABELDESCRIPTIONS';

class LabelDescriptionCache extends AbstractQueuedCache {

  constructor() {
    super( TYPE, false, 50 );
  }

  isKeyValid( cacheKey ) {
    return typeof cacheKey === 'string' && cacheKey.match( /^[PQ](\d+)$/i );
  }

  notifyMessage( cacheKeys ) {
    return 'Fetching ' + cacheKeys.length + ' item(s) labels and descriptions from Wikidata';
  }

  buildRequestPromice( cacheKeys ) {
    return getWikidataApi()
      .getPromise( {
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'labels|descriptions',
        ids: cacheKeys.join( '|' ),
      } );
  }

  convertResultToEntities( result ) {
    const cacheUpdate = {};
    Object.values( result.entities ).forEach( entity => {
      const labelDescription = new LabelDescription( entity );
      cacheUpdate[ entity.id ] = labelDescription;
    } );
    return cacheUpdate;
  }

}

const instance = new LabelDescriptionCache();
export default instance;
