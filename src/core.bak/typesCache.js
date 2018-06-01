import * as ApiUtils from './ApiUtils';
import * as WEF_Utils from './utils';

/**
 * Caches types of properties. Required because sometimes entity contains the
 * property code and "novalue" mark, but not datatype marker.
 *
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
class WEF_TypesCache {

  // TODO: add queue and batch requests

  constructor() {
    /** @private */
    this.cacheTypes = {};
  }

  /**
   * @param propertyId
   *            {string} property ID to query
   * @param onSuccess
   *            {function} callback handler for success
   * @param onFailure {
   */
  getPropertyType( propertyId ) {
    if ( !/^[P]\d+$/.test( propertyId ) ) {
      throw new Error( 'Incorrect property ID: ' + propertyId );
    }

    return new Promise( ( resolve, reject ) => {
      const cached = this.cacheTypes[ propertyId ];
      if ( typeof cached !== 'undefined' ) {
        resolve( cached );
        return;
      }

      mw.notify( 'Request property type of ' + propertyId + ' from Wikidata' );
      ApiUtils.getWikidataApi()
        .get( {
          action: 'wbgetentities',
          props: 'datatype',
          ids: propertyId,
        } )
        .then( ( result ) => {
          if ( typeof result.error !== 'undefined' ) {
            mw.log.warn( result.error );
            reject( result.error );
            return;
          }

          $.each( result.entities, ( entityIndex, entity ) => {
            const dataType = entity.datatype;
            if ( typeof dataType !== 'undefined' && dataType !== null ) {
              this.cacheTypes[ entity.id ] = dataType;
              return;
            }
          } );

          if ( typeof this.cacheTypes[ propertyId ] !== 'undefined' ) {
            resolve( this.cacheTypes[ propertyId ] );
          } else {
            reject( 'no results returned for ' + propertyId );
          }
        } ).fail( reject );
    } );
  }

  putInCache( propertyId, dataType ) {
    if ( !/^[P]\d+$/.test( propertyId ) ) {
      throw new Error( 'Incorrect property ID: ' + propertyId );
    }

    if ( !WEF_Utils.isEmpty( dataType ) ) {
      this.cacheTypes[ propertyId ] = dataType;
    }
  }
}

const typesCache = new WEF_TypesCache();
export default typesCache;
