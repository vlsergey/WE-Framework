import AbstractQueuedCache from './AbstractQueuedCache';
import propertiesBySparqlCache from './propertiesBySparqlCache';
import propertyDataCache from './propertyDataCache';
import stringPropertyValuesCache from './stringPropertyValuesCache';

const caches: Record<string, AbstractQueuedCache<unknown, unknown, unknown>> = {};
const registerCache = (cache: AbstractQueuedCache<unknown, unknown, unknown>) => {
  caches[cache.type] = cache;
};

registerCache(propertiesBySparqlCache);
registerCache(propertyDataCache);
registerCache(stringPropertyValuesCache);

export default caches;
