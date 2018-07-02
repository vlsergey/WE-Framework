import 'babel-polyfill';
import expect from 'expect';

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
mw.notify = text => console.log( text ) ;

const jQuery = () => ( {
  button: () => ( {} ),
  dialog: () => ( {} ),
  tabs: () => ( {} ),
} );

jQuery.uls = {
  data: {
    languages: {
      en: [ 'Latn', [ 'EU', 'AM', 'AF', 'ME', 'AS', 'PA', 'WW' ], 'English' ],
      ru: [ 'Cyrl', [ 'EU', 'AS', 'ME' ], 'русский' ],
    },
  },
};

require( 'fetch-polyfill' );
expect( window.fetch ).toBeAn( 'function' );

window.jQuery = jQuery;
window.mw = mw;
