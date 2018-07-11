import * as ApiUtils from 'core/ApiUtils';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import expect from 'expect';
import { filterClaimsByRank } from 'model/ModelUtils';
import LabelDescription from './LabelDescription';
import md5 from 'md5';
import PropertyDescription from 'core/PropertyDescription';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const PAUSE_BEFORE_REQUEUE = 100;

function buildQueueAction( type, useIndexedDb, maxBatch,
  isKeyValidF, enchanceIndexedDbResultF, notifyMessageF, buildPromiceF, convertResultToEntitiesF ) {
  expect( type ).toBeAn( 'string' );
  expect( maxBatch ).toBeA( 'number' );
  expect( isKeyValidF ).toBeA( 'function' );
  expect( enchanceIndexedDbResultF ).toBeA( 'function' );
  expect( notifyMessageF ).toBeA( 'function' );
  expect( buildPromiceF ).toBeA( 'function' );
  expect( convertResultToEntitiesF ).toBeA( 'function' );

  let dbConnection = null;
  if ( useIndexedDb && indexedDB ) {
    const dbOpenRequest = indexedDB.open( 'WEF_CACHE_' + type, 1 );
    dbOpenRequest.onerror = function( err ){
      mw.log.warn( 'Unable to open indexedDB' );
      mw.log.warn( err );
    };
    dbOpenRequest.onsuccess = () => {
      console.debug( 'Successfully open indexedDB connection for database ' + type );
      dbConnection = dbOpenRequest.result;
    };
    dbOpenRequest.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore( 'CACHE' );
    };
  }

  const notifyOptionsInProgress = {
    autoHide: false,
    tag: 'WE-F Cache: ' + type,
  };

  const notifyOptionsSuccess = {
    autoHide: true,
    tag: 'WE-F Cache: ' + type,
  };

  const notifyOptionsFailure = {
    autoHide: true,
    tag: 'WE-F Cache: ' + type,
  };

  let queueState = 'WAITING';

  function scheduleQueuing() {
    return ( dispatch, getState ) => {

      const data = getState()[ type ];
      expect( data ).toBeAn( 'object', 'Cache not found: ' + type );
      const queue = data.queue;
      expect( queue ).toBeA( Set );

      if ( queueState === 'WAITING' && data.queue.size > 0 ) {
        queueState = 'SCHEDULED';
        const nextBatch = [ ...queue ].slice( 0, Math.min( maxBatch, queue.size ) );

        dispatch( {
          type: 'CACHE_' + type + '_REMOVE_FROM_QUEUE',
          cacheKeys: nextBatch,
        } );
        const notifyMessage = notifyMessageF( nextBatch );

        mw.notify( notifyMessage + '…', notifyOptionsInProgress );
        return buildPromiceF( nextBatch ).then( result => {
          if ( typeof result.error !== 'undefined' ) {
            mw.log.warn( result.error );
            throw new Error( result.error );
          }
          mw.notify( notifyMessage + '… Success.', notifyOptionsSuccess );
          mw.log( 'Successfully received ' + nextBatch.length + ' cache ' + type + ' items: ' + nextBatch );

          const cacheUpdate = convertResultToEntitiesF( result, nextBatch );
          expect( cacheUpdate ).toBeAn( 'object' );

          if ( dbConnection ) {
            nextBatch.forEach( cacheKey => {
              const item = cacheUpdate[ cacheKey ];
              if ( !item ) return;

              const dbRequest = dbConnection
                .transaction( [ 'CACHE' ], 'readwrite' )
                .objectStore( 'CACHE' )
                .put( item, cacheKey );
              dbRequest.onsuccess = () =>
                console.debug( 'Stored object in ' + type + ' indexed store with key ' + cacheKey );
              dbRequest.onerror = err => {
                mw.warn( 'Unable to store object in ' + type + ' indexed store with key ' + cacheKey );
                mw.warn( err );
              };
            } );
          }

          dispatch( {
            type: 'CACHE_' + type + '_PUT',
            cacheUpdate,
          } );

          queueState = 'WAITING';
          setTimeout( () => dispatch( scheduleQueuing() ), PAUSE_BEFORE_REQUEUE );

        } ).catch( error => {
          mw.notify( notifyMessage + '… Failure. See console log output for details.',
            notifyOptionsFailure );
          mw.log.error( 'Unable to batch request following items: ' + nextBatch );
          mw.log.error( error );

          queueState = 'WAITING';
          setTimeout( () => dispatch( scheduleQueuing() ), PAUSE_BEFORE_REQUEUE );
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

      const ifNoDataInDb = () => {
        const queue = data.queue;
        expect( queue ).toBeA( Set );

        if ( !queue.has( cacheKey ) ) {
          dispatch( {
            type: 'CACHE_' + type + '_QUEUE',
            cacheKey,
          } );
        }

        setTimeout( () => dispatch( scheduleQueuing( ) ), PAUSE_BEFORE_REQUEUE );
      };

      if ( !dbConnection ) {
        ifNoDataInDb();
        return;
      }

      const dbRequest = dbConnection
        .transaction( [ 'CACHE' ] )
        .objectStore( 'CACHE' )
        .get( cacheKey );
      dbRequest.onsuccess = () => {
        let result = dbRequest.result;
        if ( result ) {
          result = enchanceIndexedDbResultF( result );
          dispatch( {
            type: 'CACHE_' + type + '_PUT',
            cacheUpdate: {
              [ cacheKey ]: result,
            },
          } );
        } else {
          ifNoDataInDb();
        }
      };
      dbRequest.onerror = err => {
        mw.log.warn( 'Unable to query indexedDb' );
        mw.log.warn( err );
        ifNoDataInDb();
      };
    };
  };

}

const openTagF = fileName => '<div data-filename=\"' + md5( fileName ) + '\">';
const closeTagF = () => '</div>';

export const flagImageHtmlsQueue = buildQueueAction( 'FLAGIMAGEHTMLS', true, 50,
  () => true,
  result => result,
  fileNames => 'Rendering ' + fileNames.length + ' flag images on server',
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

export const labelDescriptionQueue = buildQueueAction( 'LABELDESCRIPTIONS', true, 50,
  cacheKey => cacheKey.match( /^[PQ](\d+)$/i ),
  result => result,
  cacheKeys => 'Fetching ' + cacheKeys.length + ' item(s) labels and descriptions from Wikidata',
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

export const propertiesSparqlQueueF = buildQueueAction( 'PROPERTIESBYSPARQL', true, 1,
  () => true,
  result => result,
  cacheKeys => 'Executing SPARQL query: ' + cacheKeys[ 0 ],
  cacheKeys => fetch( 'https://query.wikidata.org/sparql?query=' + encodeURIComponent( cacheKeys[ 0 ] ), {
    headers: {
      Accept: 'application/sparql-results+json',
    },
  } )
    .then( body => body.json() ),
  ( result, sparql ) => {
    const columnName = result.head.vars[ 0 ];

    const propertyIds = result.results.bindings.map( binding => {
      const type = binding[ columnName ].type;
      if ( type != 'uri' ) {
        throw new Error( 'SPARQL result column type must be \'uri\'' );
      }
      const value = binding[ columnName ].value;
      if ( !value.startsWith( 'http://www.wikidata.org/entity/P' ) ) {
        throw new Error( 'SPARQL result column value must start \'http://www.wikidata.org/entity/P\'' );
      }
      return value.substr( 'http://www.wikidata.org/entity/'.length );
    } );

    return {
      [ sparql ]: propertyIds,
    };
  }
);

export const propertyDescriptionQueue = buildQueueAction( 'PROPERTYDESCRIPTIONS', true, 50,
  cacheKey => cacheKey.match( /^P(\d+)$/i ),
  result => {
    Object.setPrototypeOf( result, PropertyDescription.prototype );
    return result;
  },
  cacheKeys => 'Fetching ' + cacheKeys.length + ' property descriptions from Wikidata',
  cacheKeys => ApiUtils.getWikidataApi()
    .get( {
      action: 'wbgetentities',
      languages: API_PARAMETER_LANGUAGES,
      languagefallback: true,
      props: 'claims|datatype|labels|descriptions',
      ids: cacheKeys.join( '|' ),
    } ),
  result => {
    const cacheUpdate = {};
    Object.values( result.entities )
      .filter( entity => typeof entity.missing === 'undefined' )
      .forEach( entity => {
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

export const stringPropertyValuesQueueF = buildQueueAction( 'STRINGPROPERTYVALUES', true, 10,
  cacheKey => cacheKey.match( /^[PQ](\d+)$/i ),
  result => result,
  cacheKeys => 'Fetching ' + cacheKeys.length + ' entities from Wikidata',
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
