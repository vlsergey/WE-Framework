import { applyMiddleware, createStore } from 'redux';
import {assert} from 'chai';
import buildReducers from '../../../src/core/reducers';
import ClaimReferencesEditorDialog from '../../../src/components/references/ClaimReferencesEditorDialog';
import Provider from '../../testUtils/ProviderWrapper';
import Q30 from '../../entities/Q30';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import thunk from 'redux-thunk';

const NOOP = () => {};

describe( 'test/components/references', () => {

  describe( 'ClaimReferencesEditorDialog', () => {

    const reducers = buildReducers( Q30 );
    const store = createStore( reducers, applyMiddleware( thunk ) );

    Object.values( Q30.claims as ClaimsType )
      .flatMap( arr => arr )
      .filter( claim => !!claim.references )
      .forEach( claim => {

        it( 'References of claim ' + claim.id + ' be rendered', () => {
          const rendered = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
              <ClaimReferencesEditorDialog
                claim={claim}
                onClaimUpdate={NOOP}
                onCloseClick={NOOP} />
            </Provider>
          );
          assert.ok( rendered );
        } );

      } );

  } );

} );
