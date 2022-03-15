import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import {LanguageSelectImpl as LanguageSelect} from '../../../src/components/labelalike/LanguageSelect';
import LanguageSelectContainer from '../../../src/components/labelalike/LanguageSelectContainer';
import SingleLanguageEditor from '../../../src/components/labelalike/SingleLanguageEditor';
import buildReducers from '../../../src/core/reducers';
import Provider from '../../testUtils/ProviderWrapper';

describe('components/labelalike/LanguageSelectContainer', () => {

  const reducers = buildReducers({});
  const store = createStore(reducers, applyMiddleware(thunk));

  it('renders', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <LanguageSelectContainer />
      </Provider>
    ) as unknown as Provider;
    assert.ok(rendered);

    const languageSelect = ReactTestUtils.findRenderedComponentWithType(rendered, LanguageSelect);
    const languageSelectInput = ReactTestUtils.findRenderedDOMComponentWithTag(languageSelect, 'input') as HTMLInputElement;

    const labelalikeEditor = ReactTestUtils.findRenderedComponentWithType(rendered, SingleLanguageEditor);
    const labelalikeEditorInputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(labelalikeEditor, 'input') as HTMLInputElement[];
    assert.equal(labelalikeEditorInputs.length, 3);

    languageSelectInput.value = 'en';
    ReactTestUtils.Simulate.change(languageSelectInput);
    labelalikeEditorInputs[0]!.value = 'enLabel';
    ReactTestUtils.Simulate.change(labelalikeEditorInputs[0]!);

    languageSelectInput.value = 'ru';
    ReactTestUtils.Simulate.change(languageSelectInput);
    labelalikeEditorInputs[0]!.value = 'ruLabel';
    ReactTestUtils.Simulate.change(labelalikeEditorInputs[0]!);

    assert.deepEqual(store.getState().entity.labels,
      {
        en: {language: 'en', value: 'enLabel'},
        ru: {language: 'ru', value: 'ruLabel'},
      });
  });

});
