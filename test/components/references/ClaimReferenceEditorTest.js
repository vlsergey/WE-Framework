import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import ClaimReferencesEditorContent from 'components/references/ClaimReferencesEditorContent';
import { Provider } from 'react-redux';
import Q30 from '../../entities/Q30';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SnaksMapEditor from 'components/snaks/SnaksMapEditor';
import thunk from 'redux-thunk';

const NOOP = () => {};

describe( 'test/components/references', () => {

  describe( 'ClaimReferenceEditor', () => {

    const reducers = buildReducers( Q30 );
    const store = createStore( reducers, applyMiddleware( thunk ) );

    Object.values( Q30.claims )
      .flatMap( arr => arr )
      .filter( claim => !!claim.references )
      .forEach( claim => {

        it( 'References of claim ' + claim.id + ' be rendered', () => {
          const rendered = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
              <ClaimReferencesEditorContent
                claim={claim}
                onClaimUpdate={NOOP} />
            </Provider>
          );

          const snaksMapEditors = ReactTestUtils.scryRenderedComponentsWithType( rendered, SnaksMapEditor );
          assert.equal( snaksMapEditors.length, claim.references.length );
        } );

      } );

  } );

} );
