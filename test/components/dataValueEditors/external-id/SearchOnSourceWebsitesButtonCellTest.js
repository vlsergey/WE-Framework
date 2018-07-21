import { applyMiddleware, createStore } from 'redux';
import stringPropertyValuesCache, { buildStringCacheValuesFromEntity } from 'caches/stringPropertyValuesCache';
import assert from 'assert';
import buildReducers from 'core/reducers';
import P1986 from '../../../entities/P1986';
import P345 from '../../../entities/P345';
import PropertyDescription from 'core/PropertyDescription';
import propertyDescriptionCache from 'caches/propertyDescriptionCache';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import { Provider } from 'react-redux';
import Q2262932 from '../../../entities/Q2262932';
import Q652 from '../../../entities/Q652';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SearchOnSourceWebsitesButtonCell from 'components/dataValueEditors/external-id/SearchOnSourceWebsitesButtonCell';
import TableTBodyTr from '../TableTBodyTr';
import thunk from 'redux-thunk';

describe( 'components/dataValueEditors/SearchOnSourceWebsitesButtonCell', () => {

  const linkIsCorrectFor = ( q, p, expected ) => () => {
    const pDescription = new PropertyDescription( p );
    const reducers = buildReducers( q );
    const store = createStore( reducers, applyMiddleware( thunk ) );

    propertyDescriptionCache.dispatch = store.dispatch;
    propertyDescriptionCache.putToCache( {
      [ p.id ]: pDescription,
    } );

    stringPropertyValuesCache.dispatch = store.dispatch;
    stringPropertyValuesCache.putToCache( {
      Q652: buildStringCacheValuesFromEntity( Q652 ),
    } );

    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <PropertyDescriptionsProvider propertyIds={[ p.id ]}>
          {cache => <TableTBodyTr>
            <SearchOnSourceWebsitesButtonCell
              languageCodes={cache[ p.id ].languageCodes}
              sourceWebsites={cache[ p.id ].sourceWebsites} />
          </TableTBodyTr>}
        </PropertyDescriptionsProvider>
      </Provider>
    );
    assert.ok( rendered );

    const a = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'a' );
    assert.equal( a.href, expected );
  };

  it ( 'link is correct for Q2262932 / P345', linkIsCorrectFor( Q2262932, P345,
    'http://google.com/search?sourceid=vlsergey_wef&ie=UTF-8&q='
      + 'site%3Awww.imdb.com%2F%20(City%20Streets%20OR%20%D0%93%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B8%D0%B5%20%D1%83%D0%BB%D0%B8%D1%86%D1%8B)' ) );

  it ( 'link is correct for Q2262932 / P1986', linkIsCorrectFor( Q2262932, P1986,
    'http://google.com/search?sourceid=vlsergey_wef&ie=UTF-8&q='
      + 'site%3Awww.treccani.it%2F%20' + encodeURIComponent( 'Le vie della citt\u00e0' ) ) );

} );
