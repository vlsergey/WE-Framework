import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import P345 from '../../entities/P345';
import PropertyDescription from 'core/PropertyDescription';
import { Provider } from 'react-redux';
import Q2262932 from '../../entities/Q2262932';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SearchOnSourceWebsitesButtonCell from 'components/dataValueEditors/SearchOnSourceWebsitesButtonCell';
import TableTBodyTr from './TableTBodyTr';
import thunk from 'redux-thunk';

describe( 'components/dataValueEditors', () => {

  describe( 'SearchOnSourceWebsitesButtonCell', () => {

    const p345Description = new PropertyDescription( P345 );

    it ( 'link is correct', () => {
      const reducers = buildReducers( Q2262932 );
      const store = createStore( reducers, applyMiddleware( thunk ) );

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <SearchOnSourceWebsitesButtonCell
              languageCodes={p345Description.languageCodes}
              sourceWebsites={p345Description.sourceWebsites} />
          </TableTBodyTr>
        </Provider>
      );
      assert.ok( rendered );

      const a = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'a' );
      assert.equal( a.href,
        'http://google.com/search?sourceid=vlsergey_wef&ie=UTF-8&q=site%3Ahttp%3A%2F%2Fwww.imdb.com%2F%20(City%20Streets%20OR%20%D0%93%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B8%D0%B5%20%D1%83%D0%BB%D0%B8%D1%86%D1%8B)' );
    } );

  } );

} );
