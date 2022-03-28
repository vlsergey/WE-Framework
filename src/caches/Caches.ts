import AbstractQueuedCache from './AbstractQueuedCache';
import flagImageHtmlCache from './flagImageHtmlCache';
import localTitleCache from './localTitleCache';
import parentTypesCache from './parentTypesCache';
import propertiesBySparqlCache from './propertiesBySparqlCache';
import propertyDataCache from './propertyDataCache';
import stringPropertyValuesCache from './stringPropertyValuesCache';

const caches: Record<string, AbstractQueuedCache<unknown, unknown, unknown>> = {};
const registerCache = (cache: AbstractQueuedCache<unknown, unknown, unknown>) => {
  caches[cache.type] = cache;
};

registerCache(flagImageHtmlCache);
registerCache(localTitleCache);
registerCache(parentTypesCache);
registerCache(propertiesBySparqlCache);
registerCache(propertyDataCache);
registerCache(stringPropertyValuesCache);

export default caches;
