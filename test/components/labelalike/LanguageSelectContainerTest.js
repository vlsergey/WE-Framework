import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import { LanguageSelectImpl as LanguageSelect } from 'components/labelalike/LanguageSelect';
import LanguageSelectContainer from 'components/labelalike/LanguageSelectContainer';
import { Provider } from 'react-redux';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SingleLanguageEditor from 'components/labelalike/SingleLanguageEditor';
import thunk from 'redux-thunk';

describe( 'components/labelalike/LanguageSelectContainer', () => {

  const reducers = buildReducers( {} );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  it( 'renders', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <LanguageSelectContainer />
      </Provider>
    );
    assert.ok( rendered );

    const languageSelect = ReactTestUtils.findRenderedComponentWithType( rendered, LanguageSelect );
    const languageSelectInput = ReactTestUtils.findRenderedDOMComponentWithTag( languageSelect, 'input' );

    const labelalikeEditor = ReactTestUtils.findRenderedComponentWithType( rendered, SingleLanguageEditor );
    const labelalikeEditorInputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( labelalikeEditor, 'input' );
    assert.equal( labelalikeEditorInputs.length, 3 );

    languageSelectInput.value = 'en';
    ReactTestUtils.Simulate.change( languageSelectInput );
    labelalikeEditorInputs[ 0 ].value = 'enLabel';
    ReactTestUtils.Simulate.change( labelalikeEditorInputs[ 0 ] );

    languageSelectInput.value = 'ru';
    ReactTestUtils.Simulate.change( languageSelectInput );
    labelalikeEditorInputs[ 0 ].value = 'ruLabel';
    ReactTestUtils.Simulate.change( labelalikeEditorInputs[ 0 ] );

    assert.deepEqual( store.getState().entity.labels,
      {
        en: { language: 'en', value: 'enLabel' },
        ru: { language: 'ru', value: 'ruLabel' },
      } );
  } );

} );
