import expect from 'expect';

const initialState = {
  cache: {},
  queue: new Set(),
  state: 'WAITING',
};

function add( set, key ) {
  const result = new Set( set );
  result.add( key );
  return result;
}

function remove( set, keys ) {
  const result = new Set( set );
  keys.forEach( key => result.delete( key ) );
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
      expect( action.key ).toBeA( 'string' );
      return {
        ...state,
        queue: add( state.queue, action.key ),
      };
    case 'CACHE_' + type + '_REMOVE_FROM_QUEUE':
      expect( action.keys ).toBeAn( 'array' );
      return {
        ...state,
        queue: remove( state.queue, action.keys ),
      };
    case 'CACHE_' + type + '_SET_STATE':
      expect( action.state ).toBeA( 'string' );
      return {
        ...state,
        state: action.state,
      };
    }

    return state;
  };

}

export const LABELDESCRIPTIONS = cacheReducerBuilder( 'LABELDESCRIPTIONS' );
export const PROPERTYDESCRIPTIONS = cacheReducerBuilder( 'PROPERTYDESCRIPTIONS' );
