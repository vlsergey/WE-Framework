import * as I18nUtils from 'utils/I18nUtils';

export default class LabelDescription {

  constructor( entity ) {
    const translations = {};

    if ( entity.labels ) {
      Object.values( entity.labels ).forEach( label => {
        translations[ label.language ] = {
          ...translations[ label.language ],
          label: label.value,
        };
      } );
    }

    if ( entity.descriptions ) {
      Object.values( entity.descriptions ).forEach( description => {
        translations[ description.language ] = {
          ...translations[ description.language ],
          description: description.value,
        };
      } );
    }

    const translated = I18nUtils.localize( {}, translations );
    for ( const k in translated )
      this[ k ] = translated[ k ];
  }

}
