import AbstractQueuedCache from './AbstractQueuedCache';
import expect from 'expect';
import flagImageHtmlCache from './flagImageHtmlCache';
import labelDescriptionCache from './labelDescriptionCache';
import propertiesBySparqlCache from './propertiesBySparqlCache';
import propertyDescriptionCache from './propertyDescriptionCache';
import stringPropertyValuesCache from './stringPropertyValuesCache';

const caches = {};
const registerCache = cache => {
  expect( cache ).toBeAn( AbstractQueuedCache );
  caches[ cache.type ] = cache;
};

registerCache( flagImageHtmlCache );
registerCache( labelDescriptionCache );
registerCache( propertiesBySparqlCache );
registerCache( propertyDescriptionCache );
registerCache( stringPropertyValuesCache );

export default caches;
