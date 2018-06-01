import React from 'react';

const defaultContextValue = {
  claims: {},
};

const entityContext = React.createContext( defaultContextValue );
export default entityContext;
