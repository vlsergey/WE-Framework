// @flow

import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';
import { entries } from 'utils/ObjectUtils';
import { filterClaimsByRank } from 'model/ModelUtils';
import { getWikidataApi } from 'core/ApiUtils';

const TYPE = 'STRINGPROPERTYVALUES';

const PROPERTIES_TO_CACHE = [
  'P17', // country
  'P37', // official language
  'P41', // flag image
  'P424', // Wikimedia language code
];

const ok = variable => !!variable;
const EMPTY_ARRAY = [];

type StringPropertyValuesCacheItem = {
  lastrevid : ?number,
  P17? : ?string,
  P37? : ?string,
  P41? : ?string,
  P424? : ?string,
  pageid : ?number,
};

export const buildStringCacheValuesFromEntity = ( entity : EntityType ) => {

  const entityResult : StringPropertyValuesCacheItem = {
    lastrevid: entity.lastrevid,
    pageid: entity.pageid,
  };

  PROPERTIES_TO_CACHE.forEach( ( propertyId : string ) => {
    if ( !entity.claims ) {
      entityResult[ propertyId ] = EMPTY_ARRAY;
      return;
    }

    const values : ( ?string )[] = ( ( filterClaimsByRank( entity.claims[ propertyId ] )
      .map( claim => claim.mainsnak ).filter( ok )
      // $FlowFixMe
      .map( mainsnak => mainsnak.datavalue ).filter( ok )
      // $FlowFixMe
      .filter( datavalue => datavalue.value ) : any ) : DataValueType[] )
      .map( datavalue => {
        switch ( datavalue.type ) {
        case 'string':
          return datavalue.value;
        case 'wikibase-entityid':
          return ( datavalue.value || {} ).id;
        default: null;
        }
      } );

    entityResult[ propertyId ] = values;
  } );
  return entityResult;
};

class StringPropertyValuesCache extends AbstractQueuedCacheWithPostcheck {

  constructor() {
    super( TYPE, true, 10 );
  }

  isKeyValid( cacheKey : string ) : boolean {
    return typeof cacheKey === 'string' && !!cacheKey.match( /^[PQ](\d+)$/i );
  }

  notifyMessage( cacheKeys : string[] ) : string {
    return 'Fetching ' + cacheKeys.length + ' item(s) labels and descriptions from Wikidata';
  }

  buildRequestPromice( cacheKeys : string[] ) {
    return getWikidataApi()
      .getPromise( {
        action: 'wbgetentities',
        props: 'claims|info',
        ids: cacheKeys.join( '|' ),
      } );
  }

  convertResultToEntities( result : any ) {
    const cacheUpdate = {};
    entries( result.entities ).forEach( ( [ entityId, entity ] : [string, EntityType] ) => {
      cacheUpdate[ entityId ] = buildStringCacheValuesFromEntity( entity );
    } );
    return cacheUpdate;
  }

}

const instance = new StringPropertyValuesCache();
export default instance;
