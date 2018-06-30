import * as ApiUtils from 'core/ApiUtils';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import expect from 'expect';
import { filterClaimsByRank } from 'model/ModelUtils';
import LabelDescription from './LabelDescription';
import PropertyDescription from 'core/PropertyDescription';

function buildQueueAction( type, maxBatch,
  isKeyValidF, buildPromiceF, convertResultToEntitiesF ) {
  expect( type ).toBeAn( 'string' );
  expect( maxBatch ).toBeA( 'number' );
  expect( isKeyValidF ).toBeA( 'function' );
  expect( buildPromiceF ).toBeA( 'function' );
  expect( convertResultToEntitiesF ).toBeA( 'function' );

  function scheduleQueuing() {
    return ( dispatch, getState ) => {

      const data = getState()[ type ];
      expect( data ).toBeAn( 'object', 'Cache not found: ' + type );
      const queue = data.queue;
      expect( queue ).toBeA( Set );

      if ( data.state === 'WAITING' && data.queue.size > 0 ) {
        dispatch( {
          type: 'CACHE_' + type + '_SET_STATE',
          state: 'SCHEDULED',
        } );

        const nextBatch = [ ...queue ].slice( 0, Math.min( maxBatch, queue.size ) );

        dispatch( {
          type: 'CACHE_' + type + '_REMOVE_FROM_QUEUE',
          cacheKeys: nextBatch,
        } );

        return buildPromiceF( nextBatch ).then( result => {
          if ( typeof result.error !== 'undefined' ) {
            mw.log.warn( result.error );
            throw new Error( result.error );
          }
          mw.log( 'Successfully received ' + nextBatch.length + ' cache ' + type + ' items: ' + nextBatch );

          const cacheUpdate = convertResultToEntitiesF( result, nextBatch );
          expect( cacheUpdate ).toBeAn( 'object' );

          dispatch( {
            type: 'CACHE_' + type + '_PUT',
            cacheUpdate,
          } );

          dispatch( {
            type: 'CACHE_' + type + '_SET_STATE',
            state: 'WAITING',
          } );
          setTimeout( () => dispatch( scheduleQueuing() ), 0 );

        } ).catch( error => {
          mw.log.error( 'Unable to batch request following items: ' + nextBatch );
          mw.log.error( error );
          dispatch( {
            type: 'CACHE_' + type + '_SET_STATE',
            state: 'WAITING',
          } );
          setTimeout( () => dispatch( scheduleQueuing() ), 0 );
        } );
      }
    };
  }

  return cacheKey => {
    expect( cacheKey ).toBeAn( 'string' );

    return ( dispatch, getState ) => {

      const data = getState()[ type ];
      expect( data ).toBeAn( 'object', 'Cache not found: ' + type );

      const cache = data.cache;
      expect( cache ).toBeAn( 'object', 'Cache not found: ' + type );

      const test = isKeyValidF( cacheKey );
      if ( !test ) throw new Error( 'Provided cacheKey is not valid: ' + cacheKey );

      const cachedValue = cache[ cacheKey ];
      if ( cachedValue )
        return;

      const queue = data.queue;
      expect( queue ).toBeA( Set );

      if ( !queue.has( cacheKey ) ) {
        mw.log( 'Queueing for cache ' + type + ' population: ' + cacheKey );
        dispatch( {
          type: 'CACHE_' + type + '_QUEUE',
          cacheKey,
        } );
      }

      setTimeout( () => dispatch( scheduleQueuing( ) ), 0 );
    };
  };

}

const openTagF = fileName => '<div data-filename=\"' + fileName + '\">';
const closeTagF = () => '</div>';

export const flagImageHtmlsQueue = buildQueueAction( 'FLAGIMAGEHTMLS', 50,
  () => true,
  fileNames => new mw.Api().post( {
    action: 'parse',
    contentmodel: 'wikitext',
    disablelimitreport: true,
    disableeditsection: true,
    format: 'json',
    prop: 'text',
    text: fileNames
      .map( fileName => openTagF( fileName )
          + '[[File:' + fileName + '|22x22px|frameless|link=]]'
        + closeTagF( fileName ) )
      .join( '\r\n' ),
  } ),
  ( result, fileNames ) => {
    if ( result.error ) {
      console.log( result );
      mw.notify( 'Unable to expand templates: ' + result.error.info );
      return;
    }

    const cacheUpdate = {};
    const html = result.parse.text[ '*' ];
    fileNames.forEach( fileName => {
      const openTag = openTagF( fileName );
      const closeTag = closeTagF( fileName );
      const start = html.indexOf( openTag );
      if ( start === -1 ) {
        mw.log( 'Not found HTML for fileName "' + fileName + '"' );
        return;
      }
      const end = html.indexOf( closeTag, start );
      if ( end === -1 ) {
        mw.log( 'Incorrect HTML for fileName "' + fileName + '"' );
        return;
      }
      const imageHtml = html.substring( start + openTag.length, end );
      cacheUpdate[ fileName ] = imageHtml;
    } );

    return cacheUpdate;
  }
);

export const labelDescriptionQueue = buildQueueAction( 'LABELDESCRIPTIONS', 50,
  cacheKey => cacheKey.match( /^[PQ](\d+)$/i ),
  cacheKeys => ApiUtils.getWikidataApi()
    .get( {
      action: 'wbgetentities',
      languages: API_PARAMETER_LANGUAGES,
      languagefallback: true,
      props: 'labels|descriptions',
      ids: cacheKeys.join( '|' ),
    } ),
  result => {
    const cacheUpdate = {};
    Object.values( result.entities ).forEach( entity => {
      const labelDescription = new LabelDescription( entity );
      cacheUpdate[ entity.id ] = Object.freeze( labelDescription );
    } );
    return cacheUpdate;
  }
);

export const propertyDescriptionQueue = buildQueueAction( 'PROPERTYDESCRIPTIONS', 50,
  cacheKey => cacheKey.match( /^P(\d+)$/i ),
  cacheKeys => ApiUtils.getWikidataApi()
    .get( {
      action: 'wbgetentities',
      languages: API_PARAMETER_LANGUAGES,
      languagefallback: true,
      props: 'claims|datatype|labels',
      ids: cacheKeys.join( '|' ),
    } ),
  result => {
    const cacheUpdate = {};
    Object.values( result.entities ).forEach( entity => {
      const propertyDescription = new PropertyDescription( entity );
      cacheUpdate[ entity.id ] = Object.freeze( propertyDescription );
    } );
    return cacheUpdate;
  }
);

const PROPERTIES_TO_CACHE = [
  // country
  'P17',
  // official language
  'P37',
  // flag image
  'P41',
  // Wikimedia language code
  'P424',
];

const ok = variable => !!variable;
const EMPTY_ARRAY = [];

export const buildStringCacheValuesFromEntity = entity => {

  const entityResult = {};
  PROPERTIES_TO_CACHE.forEach( propertyId => {
    if ( !entity.claims ){
      entityResult[ propertyId ] = EMPTY_ARRAY;
      return;
    }

    const values = filterClaimsByRank( entity.claims[ propertyId ] )
      .filter( ok )
      .map( claim => claim.mainsnak ).filter( ok )
      .map( mainsnak => mainsnak.datavalue ).filter( ok )
      .filter( datavalue => datavalue.value )
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

export const stringPropertyValuesQueueF = buildQueueAction( 'STRINGPROPERTYVALUES', 10,
  cacheKey => cacheKey.match( /^[PQ](\d+)$/i ),
  cacheKeys => ApiUtils.getWikidataApi()
    .get( {
      action: 'wbgetentities',
      props: 'claims',
      ids: cacheKeys.join( '|' ),
    } ),
  result => {
    const cacheUpdate = {};
    Object.values( result.entities ).forEach( entity => {
      const entityResult = buildStringCacheValuesFromEntity( entity );
      cacheUpdate[ entity.id ] = Object.freeze( entityResult );
    } );
    return cacheUpdate;
  }
);
