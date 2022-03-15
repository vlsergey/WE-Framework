import {assert} from 'chai';
import PrecisionSelect from '../../../../src/components/dataValueEditors/time/PrecisionSelect';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

const NOOP = () => {};

describe( 'components/dataValueEditors/time', () => {
  describe( 'PrecisionSelect', () => {

    it( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <PrecisionSelect onChange={NOOP} readOnly={false} value={null} />
      );
      assert.ok( rendered );
    } );

  } );
} );
