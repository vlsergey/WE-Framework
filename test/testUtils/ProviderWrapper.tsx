import React, { PureComponent } from 'react';
import { Provider, ProviderProps } from 'react-redux';

/* We need this class so ProviderWrapper can be real component
 to use with ReactTestUtils.renderIntoDocument
 and ReactTestUtils.find*** methods */
export default class ProviderWrapper extends PureComponent<ProviderProps, any> {
  override render() {
    return <Provider {...this.props} />;
  }
}
