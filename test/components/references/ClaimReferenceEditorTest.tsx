import { applyMiddleware, createStore } from 'redux';
import {assert} from 'chai';
import buildReducers from '../../../src/core/reducers';
import ClaimReferencesEditorContent from '../../../src/components/references/ClaimReferencesEditorContent';
import Provider from '../../testUtils/ProviderWrapper';
import Q30 from '../../entities/Q30';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SnaksMapEditor from '../../../src/components/snaks/SnaksMapEditor';
import thunk from 'redux-thunk';

const NOOP = () => {};

describe( 'test/components/references', () => {

  describe( 'ClaimReferenceEditor', () => {

    const reducers = buildReducers( Q30 );
    const store = createStore( reducers, applyMiddleware( thunk ) );

    Object.values( Q30.claims as ClaimsType)
      .flatMap( arr => arr )
      .filter( claim => !!claim.references )
      .forEach( (claim: ClaimType) => {

        it( 'References of claim ' + claim.id + ' be rendered', () => {
          const rendered = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
              <ClaimReferencesEditorContent
                claim={claim}
                onClaimUpdate={NOOP} />
            </Provider>
          ) as unknown as Provider;

          const snaksMapEditors = ReactTestUtils.scryRenderedComponentsWithType( rendered, SnaksMapEditor ) as SnaksMapEditor[];
          assert.equal( snaksMapEditors.length, claim?.references?.length );
        } );

      } );

  } );

} );
