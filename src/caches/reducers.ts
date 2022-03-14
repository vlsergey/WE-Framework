import caches from './Caches';

type CacheType = Record<number | string, any>;
interface StateType {
  cache: CacheType;
}

const initialState: StateType = {
  cache: {},
};

function cacheReducerBuilder (type: string) {
  return (state: StateType = initialState, action: any): StateType => {
    switch (action.type) {
    case 'CACHE_' + type + '_PUT': {
      const cacheUpdate: CacheType = action.cacheUpdate;
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

const reducers: Record<string, ReturnType<typeof cacheReducerBuilder>> = {};
Object.keys(caches).forEach(key => {
  reducers[key] = cacheReducerBuilder(key);
});
export default reducers;
