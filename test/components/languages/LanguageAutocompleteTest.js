import assert from 'assert';
import LanguageAutocomplete from 'components/languages/LanguageAutocomplete';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

const NOOP = () => {};

describe( 'components/languages', () => {

  describe( 'LanguageAutocomplete', () => {

    it ( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <LanguageAutocomplete
          onChange={NOOP}
          provided={[]}
          value="en" />
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );
      assert.equal( input.value, 'en' );
    } );

    it ( 'can be changed via keyboard', () => {
      let value = 'en';
      const onChange = newValue => { value = newValue; };

      const rendered = ReactTestUtils.renderIntoDocument(
        <LanguageAutocomplete
          datavalue={value}
          onChange={onChange}
          provided={[]}
          value="en" />
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );

      input.value = 'ru';
      ReactTestUtils.Simulate.change( input );
      assert.equal( value, 'ru' );
    } );

  } );

} );
