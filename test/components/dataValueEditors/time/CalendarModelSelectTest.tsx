import {assert} from 'chai';
import CalendarModelSelect from '../../../../src/components/dataValueEditors/time/CalendarModelSelect';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

const NOOP = () => {};

describe( 'components/dataValueEditors/time', () => {
  describe( 'CalendarModelSelect', () => {

    it( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <CalendarModelSelect onChange={NOOP} readOnly={false} value={null} />
      );
      assert.ok( rendered );
    } );

  } );
} );
