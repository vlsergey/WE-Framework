import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import PrecisionSelect from '../../../../src/components/dataValueEditors/time/PrecisionSelect';

const NOOP = () => {};

describe('components/dataValueEditors/time', () => {
  describe('PrecisionSelect', () => {

    it('can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <PrecisionSelect onChange={NOOP} readOnly={false} value={null} />
      );
      assert.ok(rendered);
    });

  });
});
