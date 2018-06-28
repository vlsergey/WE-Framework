import React from 'react';

const defaultContextValue = {
  _cache: {},
  getOrQueue: () => null,
};

const propertiesCacheContext = React.createContext( defaultContextValue );
export default propertiesCacheContext;
