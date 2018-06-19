const mw = {};

mw.config = new Map();
mw.config.set( 'wgContentLanguage', 'en' );
mw.config.set( 'wgUserLanguage', 'en' );

class ForeignApi {
  get() {
    return new Promise( () => {} );
  }
}
mw.ForeignApi = ForeignApi;

mw.log = ( text ) => console.log( text );
mw.notify = ( text ) => console.log( text ) ;

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

window.jQuery = jQuery;
window.mw = mw;
