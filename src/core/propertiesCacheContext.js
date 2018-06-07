import React from 'react';

const defaultContextValue = {
  _cache: {},
};

const propertiesCacheContext = React.createContext( defaultContextValue );
export default propertiesCacheContext;
