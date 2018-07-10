import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import P31 from '../../entities/P31';
import PropertyDescription from 'core/PropertyDescription';
import { Provider } from 'react-redux';
import Q30 from '../../entities/Q30';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SnaksArrayEditor from 'components/snaks/SnaksArrayEditor';
import SnaksMapEditor from 'components/snaks/SnaksMapEditor';
import thunk from 'redux-thunk';

const NOOP = () => {};

describe( 'test/components/references', () => {

  describe( 'SnaksMapEditor', () => {

    it( 'Renders snak editors', () => {
      const reducers = buildReducers( Q30 );
      const store = createStore( reducers, applyMiddleware( thunk ) );

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <table>
            <SnaksMapEditor
              onSnaksMapUpdate={NOOP}
              removeButtonConfirmMessageF={() => ''}
              removeButtonLabel={''}
              snaksMap={Q30.claims.P2997[ 0 ].qualifiers} />
          </table>
        </Provider>
      );
      assert.ok( rendered );

      const table = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'table' );

      // populate cache to see snak editors
      store.dispatch( {
        type: 'CACHE_PROPERTYDESCRIPTIONS_PUT',
        cacheUpdate: {
          P31: new PropertyDescription( P31 ),
        },
      } );

      ReactTestUtils.findRenderedComponentWithType( rendered, SnaksArrayEditor );
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'tbody' );
    } );

  } );

} );
