import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import SnaksArrayEditor from '../../../src/components/snaks/SnaksArrayEditor';
import SnaksMapEditor from '../../../src/components/snaks/SnaksMapEditor';
import PropertyData from '../../../src/core/PropertyData';
import buildReducers from '../../../src/core/reducers';
import P31 from '../../entities/P31';
import Q30 from '../../entities/Q30';
import Provider from '../../testUtils/ProviderWrapper';

const NOOP = () => {};

describe('test/components/references', () => {

  describe('SnaksMapEditor', () => {

    it('Renders snak editors', () => {
      const reducers = buildReducers(Q30);
      const store = createStore(reducers, applyMiddleware(thunk));

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <table>
            <SnaksMapEditor
              onSnaksMapUpdate={NOOP}
              removeButtonConfirmMessageF={() => ''}
              removeButtonLabel={''}
              snaksMap={Q30.claims.P2997[0]!.qualifiers as SnaksMap} />
          </table>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);

      ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'table');

      // populate cache to see snak editors
      store.dispatch({
        // @ts-expect-error
        type: 'CACHE_PROPERTYDATA_PUT',
        cacheUpdate: {
          P31: new PropertyData(P31),
        },
      });

      ReactTestUtils.findRenderedComponentWithType(rendered, SnaksArrayEditor);
      ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'tbody');
    });

  });

});
