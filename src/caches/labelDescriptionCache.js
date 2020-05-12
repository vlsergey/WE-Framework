// @flow

import AbstractQueuedCache from './AbstractQueuedCache';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import { entries } from 'utils/ObjectUtils';
import { getWikidataApi } from 'core/ApiUtils';
import LabelDescription from './LabelDescription';

const TYPE = 'LABELDESCRIPTIONS';

class LabelDescriptionCache extends AbstractQueuedCache {

  constructor() {
    super( TYPE, false, 50 );
  }

  isKeyValid( cacheKey : string ) : boolean {
    return typeof cacheKey === 'string' && !!cacheKey.match( /^[PQ](\d+)$/i );
  }

  notifyMessage( cacheKeys : string[] ) {
    return 'Fetching ' + cacheKeys.length + ' item(s) labels and descriptions from Wikidata';
  }

  buildRequestPromice( cacheKeys : string[] ) {
    return getWikidataApi()
      .getPromise( {
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'labels|descriptions',
        ids: cacheKeys.join( '|' ),
      } );
  }

  convertResultToEntities( result : any ) {
    const cacheUpdate = {};
    for ( const [ entityId, entity ] of entries( result.entities ) ) {
      const labelDescription = new LabelDescription( entity );
      cacheUpdate[ entityId ] = labelDescription;
    }
    return cacheUpdate;
  }

}

const instance = new LabelDescriptionCache();
export default instance;
