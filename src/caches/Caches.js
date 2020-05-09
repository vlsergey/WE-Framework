// @flow

import AbstractQueuedCache from './AbstractQueuedCache';
import flagImageHtmlCache from './flagImageHtmlCache';
import labelDescriptionCache from './labelDescriptionCache';
import localTitleCache from './localTitleCache';
import parentTypesCache from './parentTypesCache';
import propertiesBySparqlCache from './propertiesBySparqlCache';
import propertyDescriptionCache from './propertyDescriptionCache';
import stringPropertyValuesCache from './stringPropertyValuesCache';

const caches = {};
const registerCache = ( cache : AbstractQueuedCache ) => {
  caches[ cache.type ] = cache;
};

registerCache( flagImageHtmlCache );
registerCache( labelDescriptionCache );
registerCache( localTitleCache );
registerCache( parentTypesCache );
registerCache( propertiesBySparqlCache );
registerCache( propertyDescriptionCache );
registerCache( stringPropertyValuesCache );

export default caches;
