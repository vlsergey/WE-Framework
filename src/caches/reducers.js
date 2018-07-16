import caches from './Caches';
import expect from 'expect';

const initialState = {
  cache: {},
};

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
    }

    return state;
  };

}

const reducers = {};
Object.keys( caches ).forEach( key => {
  reducers[ key ] = cacheReducerBuilder( key );
} );
export default reducers;
