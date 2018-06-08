import React from 'react';

const defaultContextValue = {
  _cache: {},
};

const labelDescriptionCacheContext = React.createContext( defaultContextValue );
export default labelDescriptionCacheContext;
