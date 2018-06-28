import assert from 'assert';
import ChildrenBuilder from 'components/formbuilders/ChildrenBuilder';
import PropertiesCacheContainer from 'core/PropertiesCacheContainer';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

describe( 'ChildrenBuilder', () => {

  it( 'renders fields', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <PropertiesCacheContainer>
        <ChildrenBuilder fields={[
          { property: 'P31' },
        ]} />
      </PropertiesCacheContainer>
    );
    assert.ok( rendered );

    const childrenBuilders = ReactTestUtils.scryRenderedComponentsWithType( rendered, ChildrenBuilder );
    assert.ok( childrenBuilders );
    assert.equal( childrenBuilders.length, 1 );

    const tbodies = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'tbody' );
    assert.ok( tbodies );
    assert.equal( tbodies.length, 1 );
  } );

  it( 'renders fieldsets', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <PropertiesCacheContainer>
        <ChildrenBuilder fieldsets={[
          { fields: [
            /* instance of */
            { property: 'P31' },
          ] },
          { label: 'TestLabel',
            fields: [
              /* director */
              { property: 'P57' },
            ] },
        ]} />
      </PropertiesCacheContainer>
    );
    assert.ok( rendered );

    const fieldsets = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'fieldset' );
    assert.ok( fieldsets );
    assert.equal( fieldsets.length, 2 );

    const legend = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'legend' );
    assert.ok( legend );

    const childrenBuilders = ReactTestUtils.scryRenderedComponentsWithType( rendered, ChildrenBuilder );
    assert.ok( childrenBuilders );
    assert.equal( childrenBuilders.length, 3 );

    const tbodies = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'tbody' );
    assert.ok( tbodies );
    assert.equal( tbodies.length, 2 );
  } );

} );
