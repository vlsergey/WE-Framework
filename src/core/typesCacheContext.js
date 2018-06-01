import React from 'react';

const defaultContextValue = {
  _cache: {},
};

const typesCacheContext = React.createContext( defaultContextValue );
export default typesCacheContext;
