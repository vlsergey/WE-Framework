// @flow

import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';
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

export const buildStringCacheValuesFromEntity = ( entity : ( PropertyType | EntityType ) ) => {

  const entityResult = {};
  entityResult.lastrevid = entity.lastrevid;
  entityResult.pageid = entity.pageid;

  PROPERTIES_TO_CACHE.forEach( propertyId => {
    if ( !entity.claims ) {
      entityResult[ propertyId ] = EMPTY_ARRAY;
      return;
    }

    const values = ( ( filterClaimsByRank( entity.claims[ propertyId ] )
      .filter( ok )
      .map( claim => claim.mainsnak ).filter( ok )
      .map( mainsnak => mainsnak.datavalue ).filter( ok )
      .filter( datavalue => datavalue.value ) : any ) : DataValueType[] )
      .map( datavalue => {
        switch ( datavalue.type ) {
        case 'string':
          return datavalue.value;
        case 'wikibase-entityid':
          return datavalue.value.id;
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

  notifyMessage( cacheKeys ) {
    return 'Fetching ' + cacheKeys.length + ' item(s) labels and descriptions from Wikidata';
  }

  buildRequestPromice( cacheKeys ) {
    return getWikidataApi()
      .getPromise( {
        action: 'wbgetentities',
        props: 'claims|info',
        ids: cacheKeys.join( '|' ),
      } );
  }

  convertResultToEntities( result ) {
    const cacheUpdate = {};
    const entities : ( EntityType | PropertyType )[] =
      ( ( Object.values( result.entities ) : any ) : ( EntityType | PropertyType )[] );
    entities.forEach( entity => {
      const entityId : ?string = entity.id;
      if ( !entityId ) return;
      cacheUpdate[ entityId ] = buildStringCacheValuesFromEntity( entity );
    } );
    return cacheUpdate;
  }

}

const instance = new StringPropertyValuesCache();
export default instance;
