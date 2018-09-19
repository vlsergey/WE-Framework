import 'babel-polyfill';
import expect from 'expect';

if ( !window.localStorage ) {
  window.localStorage = {
    _data: {},
    setItem( id, val ) { return this._data[ id ] = String( val ); },
    getItem( id ) { return this._data.hasOwnProperty( id ) ? this._data[ id ] : undefined; },
    removeItem( id ) { return delete this._data[ id ]; },
    clear() { return this._data = {}; },
  };
}

const mw = {};

mw.config = new Map();
mw.config.set( 'wgContentLanguage', 'en' );
mw.config.set( 'wgUserLanguage', 'en' );

class Api {
  get() { return new Promise( () => {} ); }
  post() { return new Promise( () => {} ); }
}
mw.ForeignApi = Api;
mw.Api = Api;

mw.log = text => console.log( text );
mw.log.error = text => console.error( text );
mw.notify = text => console.log( text );

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
expect( window.fetch ).toBeAn( 'function' );

window.jQuery = jQuery;
window.mw = mw;
