import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import propertyDataCache from '../../../../src/caches/propertyDataCache';
import PropertyDescriptionsProvider from '../../../../src/caches/PropertyDescriptionsProvider';
import {stringPropertyValuesCache, buildStringCacheValuesFromEntity} from '../../../../src/caches/stringPropertyValuesCache';
import SearchOnSourceWebsitesButtonCell from '../../../../src/components/dataValueEditors/external-id/SearchOnSourceWebsitesButtonCell';
import PropertyData from '../../../../src/core/PropertyData';
import buildReducers from '../../../../src/core/reducers';
import P345 from '../../../entities/P345';
import P1986 from '../../../entities/P1986';
import Q652 from '../../../entities/Q652';
import Q2262932 from '../../../entities/Q2262932';
import Provider from '../../../testUtils/ProviderWrapper';
import TableTBodyTr from '../TableTBodyTr';

describe('components/dataValueEditors/SearchOnSourceWebsitesButtonCell', () => {

  const linkIsCorrectFor = (q: ItemType, p: PropertyType, expected: string) => () => {
    const pData: PropertyData = new PropertyData(p);
    const reducers = buildReducers(q, q);
    const store = createStore(reducers, applyMiddleware(thunk));

    propertyDataCache.putToMemoryCache(p.id, pData);
    stringPropertyValuesCache.putToMemoryCache('Q652', buildStringCacheValuesFromEntity(Q652));

    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <PropertyDescriptionsProvider propertyIds={[p.id]}>
          {cache => <TableTBodyTr>
            <SearchOnSourceWebsitesButtonCell
              languageCodes={cache[p.id]?.languageCodes}
              sourceWebsites={cache[p.id]?.sourceWebsites} />
          </TableTBodyTr>}
        </PropertyDescriptionsProvider>
      </Provider>
    ) as unknown as Provider;
    assert.ok(rendered);

    const a = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'a') as HTMLLinkElement;
    assert.equal(a.href, expected);
  };

  it('link is correct for Q2262932 / P345', linkIsCorrectFor(Q2262932, P345,
    'http://google.com/search?sourceid=vlsergey_wef&ie=UTF-8&q='
      + 'site%3Awww.imdb.com%2F%20(City%20Streets%20OR%20%D0%93%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B8%D0%B5%20%D1%83%D0%BB%D0%B8%D1%86%D1%8B)'));

  it('link is correct for Q2262932 / P1986', linkIsCorrectFor(Q2262932, P1986,
    'http://google.com/search?sourceid=vlsergey_wef&ie=UTF-8&q='
      + 'site%3Awww.treccani.it%2F%20' + encodeURIComponent('Le vie della citt\u00e0')));

});
