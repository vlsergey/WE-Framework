import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SnakTypeSelect from '../../src/components/SnakTypeSelect';

const NOOP = () => {};

describe( 'SnakTypeSelect', () => {

  it( 'can be rendered', () => {
    const rendered = ReactTestUtils.renderIntoDocument( <SnakTypeSelect onChange={NOOP} /> ) as unknown as SnakTypeSelect;
    assert.ok( rendered );

    const selectDomComponent = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'select' ) as HTMLSelectElement;
    assert.ok( selectDomComponent );
  } );

  it( 'has no empty options', () => {
    const rendered = ReactTestUtils.renderIntoDocument( <SnakTypeSelect onChange={NOOP} /> ) as unknown as SnakTypeSelect;

    const options = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'option' );
    assert.equal( 3, options.length );

    options.forEach( option => {
      assert.ok( option.textContent, 'Missing text content for option' );
    } );
  } );

} );
