import expect from 'expect';

const initialState = {
  cache: {},
  queue: new Set(),
  state: 'WAITING',
};

function add( set, cacheKeys ) {
  const result = new Set( set );
  result.add( cacheKeys );
  return result;
}

function remove( set, cacheKeys ) {
  const result = new Set( set );
  cacheKeys.forEach( cacheKey => result.delete( cacheKey ) );
  return result;
}

function cacheReducerBuilder( type ) {
  expect( type ).toBeA( 'string' );

  return ( state = initialState, action ) => {
    switch ( action.type ) {
    case 'CACHE_' + type + '_PUT':
      expect( action.cacheUpdate ).toBeAn( 'object' );
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.cacheUpdate,
        },
      };
    case 'CACHE_' + type + '_QUEUE':
      expect( action.cacheKey ).toBeA( 'string' );
      return {
        ...state,
        queue: add( state.queue, action.cacheKey ),
      };
    case 'CACHE_' + type + '_REMOVE_FROM_QUEUE':
      expect( action.cacheKeys ).toBeAn( 'array' );
      return {
        ...state,
        queue: remove( state.queue, action.cacheKeys ),
      };
    }

    return state;
  };

}

export const FLAGIMAGEHTMLS = cacheReducerBuilder( 'FLAGIMAGEHTMLS' );
export const LABELDESCRIPTIONS = cacheReducerBuilder( 'LABELDESCRIPTIONS' );
export const PROPERTIESBYSPARQL = cacheReducerBuilder( 'PROPERTIESBYSPARQL' );
export const PROPERTYDESCRIPTIONS = cacheReducerBuilder( 'PROPERTYDESCRIPTIONS' );
export const STRINGPROPERTYVALUES = cacheReducerBuilder( 'STRINGPROPERTYVALUES' );

const reducers = {
  FLAGIMAGEHTMLS,
  LABELDESCRIPTIONS,
  PROPERTIESBYSPARQL,
  PROPERTYDESCRIPTIONS,
  STRINGPROPERTYVALUES,
};

export default reducers;
