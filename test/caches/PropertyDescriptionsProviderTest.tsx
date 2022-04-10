import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import propertyDataCache from '../../src/caches/propertyDataCache';
import {stringPropertyValuesCache} from '../../src/caches/stringPropertyValuesCache';
import PropertyDescriptionsProvider from '../../src/caches/PropertyDescriptionsProvider';
import PropertyData from '../../src/core/PropertyData';
import buildReducers from '../../src/core/reducers';
import P345 from '../entities/P345';
import Q1367759 from '../entities/Q1367759';
import Provider from '../testUtils/ProviderWrapper';

describe('PropertyDescriptionsProvider', () => {

  const reducers = buildReducers(Q1367759);
  assert.ok(reducers);

  const store = createStore(reducers, applyMiddleware(thunk));
  assert.ok(store);

  it('provides country flags', () => {
    const rendered = ReactTestUtils.renderIntoDocument(<Provider store={store}>
      <PropertyDescriptionsProvider propertyIds={['P345']}>
        {cache => <div>
          <span className="P345_label">{ cache.P345?.label }</span>
          <span className="P345_description">{ cache.P345?.description}</span>
          <span className="P345_countries">{(cache.P345?.countries || []).join(' ')}</span>
          <span className="P345_countryFlags">{(cache.P345?.countryFlags || []).join(' ')}</span>
          <span className="P345_languageIds">{(cache.P345?.languageIds || []).join(' ')}</span>
          <span className="P345_languageCodes">{ (cache.P345?.languageCodes || []).join(' ')}</span>
        </div>}
      </PropertyDescriptionsProvider>
    </Provider>) as unknown as Provider;
    assert.ok(rendered);

    const p345Label = () => ReactTestUtils.findRenderedDOMComponentWithClass(rendered, 'P345_label').textContent;
    const p345Desc = () => ReactTestUtils.findRenderedDOMComponentWithClass(rendered, 'P345_description').textContent;
    const p345Countries = () => ReactTestUtils.findRenderedDOMComponentWithClass(rendered, 'P345_countries').textContent;
    const p345Flags = () => ReactTestUtils.findRenderedDOMComponentWithClass(rendered, 'P345_countryFlags').textContent;
    const p345LangIds = () => ReactTestUtils.findRenderedDOMComponentWithClass(rendered, 'P345_languageIds').textContent;
    const p345LangCodes = () => ReactTestUtils.findRenderedDOMComponentWithClass(rendered, 'P345_languageCodes').textContent;

    assert.equal(p345Label(), '');
    assert.equal(p345Desc(), '');
    assert.equal(p345Countries(), '');
    assert.equal(p345Flags(), '');
    assert.equal(p345LangIds(), '');
    assert.equal(p345LangCodes(), '');

    propertyDataCache.putToMemoryCache('P345', new PropertyData(P345))

    assert.equal(p345Label(), 'IMDb ID');
    assert.equal(p345Desc(),
      'identifier for the Internet Movie Database  [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']');
    assert.equal(p345Countries(), 'Q30');
    assert.equal(p345Flags(), '');
    assert.equal(p345LangIds(), 'Q1860');
    assert.equal(p345LangCodes(), '');

    stringPropertyValuesCache.putToMemoryCache('Q30', {
      P41: ['Flag of the United States.svg'],
    })

    assert.equal(p345Label(), 'IMDb ID');
    assert.equal(p345Desc(),
      'identifier for the Internet Movie Database  [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']');
    assert.equal(p345Countries(), 'Q30');
    assert.equal(p345Flags(), 'Flag of the United States.svg');
    assert.equal(p345LangIds(), 'Q1860');
    assert.equal(p345LangCodes(), '');

    stringPropertyValuesCache.putToMemoryCache('Q1860', {
      P424: ['en'],
    })

    assert.equal(p345Label(), 'IMDb ID');
    assert.equal(p345Desc(),
      'identifier for the Internet Movie Database  [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']');
    assert.equal(p345Countries(), 'Q30');
    assert.equal(p345Flags(), 'Flag of the United States.svg');
    assert.equal(p345LangIds(), 'Q1860');
    assert.equal(p345LangCodes(), 'en');

  });

});
