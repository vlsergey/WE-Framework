import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

/* We need this class so ProviderWrapper can be real component
 to use with ReactTestUtils.renderIntoDocument
 and ReactTestUtils.find*** methods */
export default class ProviderWrapper extends PureComponent<any, any> {
  render() {
    return <Provider {...this.props} />;
  }
}
