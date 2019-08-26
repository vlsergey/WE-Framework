import caches from './Caches';

const initialState = {
  cache: {},
};

function cacheReducerBuilder( type : string ) {
  return ( state = initialState, action ) => {
    switch ( action.type ) {
    case 'CACHE_' + type + '_PUT': {
      const cacheUpdate : any = action.cacheUpdate;
      return {
        ...state,
        cache: {
          ...state.cache,
          ...cacheUpdate,
        },
      };
    }
    }

    return state;
  };

}

const reducers = {};
Object.keys( caches ).forEach( key => {
  reducers[ key ] = cacheReducerBuilder( key );
} );
export default reducers;
