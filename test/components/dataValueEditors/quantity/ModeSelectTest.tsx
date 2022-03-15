import {assert} from 'chai';
import { MODES } from '../../../../src/components/dataValueEditors/quantity/QuantityDataValueEditor';
import ModeSelect from '../../../../src/components/dataValueEditors/quantity/ModeSelect';
import {ModeType} from '../../../../src/components/dataValueEditors/quantity/ModeType';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

const NOOP = () => {};

describe( 'components/dataValueEditors/quantity', () => {
  describe( 'ModeSelect', () => {
    it( 'correctly displays all options', () => {
      Object.keys( MODES ).forEach( mode => {

        const rendered = ReactTestUtils.renderIntoDocument(
          <ModeSelect mode={mode as ModeType} onSelect={NOOP} value={{}} />
        ) as unknown as ModeSelect;
        assert.ok( ModeSelect );

        const select = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'select' ) as HTMLSelectElement;
        assert.ok( select );

        const options = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'option' ) as HTMLOptionElement[];
        assert.equal( options.length, 3 );
        options.forEach( (option: HTMLOptionElement) => {
          assert.ok( option.innerHTML, 'One of options doesn\'t have innerHTML set: \n' + select.innerHTML );
        } );
      } );
    } );
  } );
} );
