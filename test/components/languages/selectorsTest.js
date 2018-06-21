import * as selectors from 'components/languages/selectors';
import assert from 'assert';

describe( 'components/languages/selectors', () => {

  describe( 'createEmptySuggestionsSelector', () => {

    it ( 'provides correct variants', () => {
      const result = selectors.createEmptySuggestionsSelector()( [ 'fr', 'en', 'ru' ] );
      assert.deepEqual( result, [ 'en', 'ru', 'fr' ] );
    } );

  } );

} );