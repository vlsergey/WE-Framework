import { applyMiddleware, createStore } from 'redux';
import {assert} from 'chai';
import buildReducers from '../../../src/core/reducers';
import { LanguageSelectImpl as LanguageSelect } from '../../../src/components/labelalike/LanguageSelect';
import LanguageSelectContainer from '../../../src/components/labelalike/LanguageSelectContainer';
import Provider from '../../testUtils/ProviderWrapper';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SingleLanguageEditor from '../../../src/components/labelalike/SingleLanguageEditor';
import thunk from 'redux-thunk';

describe( 'components/labelalike/LanguageSelectContainer', () => {

  const reducers = buildReducers( {} );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  it( 'renders', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <LanguageSelectContainer />
      </Provider>
    ) as unknown as Provider;
    assert.ok( rendered );

    const languageSelect = ReactTestUtils.findRenderedComponentWithType( rendered, LanguageSelect ) as LanguageSelect;
    const languageSelectInput = ReactTestUtils.findRenderedDOMComponentWithTag( languageSelect, 'input' ) as HTMLInputElement;

    const labelalikeEditor = ReactTestUtils.findRenderedComponentWithType( rendered, SingleLanguageEditor ) as SingleLanguageEditor;
    const labelalikeEditorInputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( labelalikeEditor, 'input' ) as HTMLInputElement[];
    assert.equal( labelalikeEditorInputs.length, 3 );

    languageSelectInput.value = 'en';
    ReactTestUtils.Simulate.change( languageSelectInput );
    labelalikeEditorInputs[ 0 ]!.value = 'enLabel';
    ReactTestUtils.Simulate.change( labelalikeEditorInputs[ 0 ]! );

    languageSelectInput.value = 'ru';
    ReactTestUtils.Simulate.change( languageSelectInput );
    labelalikeEditorInputs[ 0 ]!.value = 'ruLabel';
    ReactTestUtils.Simulate.change( labelalikeEditorInputs[ 0 ]! );

    assert.deepEqual( store.getState().entity.labels,
      {
        en: { language: 'en', value: 'enLabel' },
        ru: { language: 'ru', value: 'ruLabel' },
      } );
  } );

} );
