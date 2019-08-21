import assert from 'assert';
import { MODES } from 'components/dataValueEditors/quantity/QuantityDataValueEditor';
import ModeSelect from 'components/dataValueEditors/quantity/ModeSelect';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

const NOOP = () => {};

describe( 'components/dataValueEditors/quantity', () => {
  describe( 'ModeSelect', () => {
    it( 'correctly displays all options', () => {
      Object.keys( MODES ).forEach( mode => {

        const rendered = ReactTestUtils.renderIntoDocument(
          <ModeSelect mode={mode} onSelect={NOOP} value={{}} />
        );
        assert.ok( ModeSelect );

        const select = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'select' );
        assert.ok( select );

        const options = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'option' );
        assert.equal( options.length, 3 );
        options.forEach( option => {
          assert.ok( option.innerHTML, 'One of options doesn\'t have innerHTML set: \n' + select.innerHTML );
        } );
      } );
    } );
  } );
} );
