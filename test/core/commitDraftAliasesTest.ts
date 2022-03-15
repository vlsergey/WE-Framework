import {assert} from 'chai';
import commitDraftAliases from '../../src/core/commitDraftAliases';

describe( 'core/commitDraftAliases', () => {

  it( 'works with empty objects', () => {
    assert.deepEqual( commitDraftAliases( {} ), {} );
  } );

  it( 'correctly moves draft to aliases', () => {
    const withDrafts = {
      aliases: {
        lang1: [
          {
            language: 'lang1',
            value: 'existing1',
          },
        ],
      },
      draftAliases: {
        lang1: {
          language: 'lang1',
          value: 'new1',
        },
        lang2: {
          language: 'lang2',
          value: 'new2',
        },
      },
    };

    const expected = {
      aliases: {
        lang1: [
          {
            language: 'lang1',
            value: 'existing1',
          },
          {
            language: 'lang1',
            value: 'new1',
          },
        ],
        lang2: [
          {
            language: 'lang2',
            value: 'new2',
          },
        ],
      },
    };

    assert.deepEqual( commitDraftAliases( withDrafts ), expected );
  } );

} );
