import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SnakTypeSelect from "../../src/components/SnakTypeSelect";

describe('SnakTypeSelect', () => {

  it('can be rendered', () => {
    const rendered = ReactTestUtils.renderIntoDocument(<SnakTypeSelect />);
    assert.ok(SnakTypeSelect);
    
    const selectDomComponent = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, "select");
    assert.ok(selectDomComponent);
  });

  it('has no empty options', () => {
    const rendered = ReactTestUtils.renderIntoDocument(<SnakTypeSelect />);
    
    const options = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, "option");
    assert.equal(3, options.length);

    options.forEach( option => {
      assert.ok(option.textContent, "Missing text content for option");
    });
  });
  
});
