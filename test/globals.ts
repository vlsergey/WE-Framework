import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {assert} from 'chai';
import StorageShim from 'node-storage-shim';

if ( !window.localStorage ) {
  window.localStorage = new StorageShim();
  window.sessionStorage = new StorageShim();
}

const mw : any = {};

mw.config = new Map();
mw.config.set( 'wgContentLanguage', 'en' );
mw.config.set( 'wgUserLanguage', 'en' );

class Api {
  get() { return new Promise( () => {} ); }
  post() { return new Promise( () => {} ); }
}
mw.ForeignApi = Api;
mw.Api = Api;

mw.log = (text : string) => console.log( text );
mw.log.error = (text : string) => console.error( text );
mw.notify = (text : string) => console.log( text );

const jQuery = () => ( {
  button: () => ( {} ),
  dialog: () => ( {} ),
  tabs: () => ( {} ),
} );

jQuery.uls = {
  data: {
    languages: {
      'en': [ 'Latn', [ 'EU', 'AM', 'AF', 'ME', 'AS', 'PA', 'WW' ], 'English' ],
      'kk': [ 'kk-cyrl' ],
      'kk-cyrl': [ 'Cyrl', [ 'EU', 'AS' ], 'қазақша' ],
      'ru': [ 'Cyrl', [ 'EU', 'AS', 'ME' ], 'русский' ],
    },
  },
};

require( 'fetch-polyfill' );
assert.typeOf(window.fetch, 'function' );

(window as any).jQuery = jQuery;
(window as any).mw = mw;
