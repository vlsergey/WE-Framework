import AbstractQueuedCache from './AbstractQueuedCache';
import propertyDataCache from './propertyDataCache';

const caches: Record<string, AbstractQueuedCache<unknown, unknown, unknown>> = {};
const registerCache = (cache: AbstractQueuedCache<unknown, unknown, unknown>) => {
  caches[cache.type] = cache;
};

registerCache(propertyDataCache);

export default caches;
