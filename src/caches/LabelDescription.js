// @flow

import * as I18nUtils from 'utils/I18nUtils';
import { values } from 'utils/ObjectUtils';

export default class LabelDescription {

  description : ?string;
  label : ?string;

  constructor( entity : EntityType ) {
    const translations = {};

    if ( entity.labels ) {
      values( entity.labels ).forEach( label => {
        translations[ label.language ] = {
          ...translations[ label.language ],
          label: label.value,
        };
      } );
    }

    if ( entity.descriptions ) {
      values( entity.descriptions ).forEach( description => {
        translations[ description.language ] = {
          ...translations[ description.language ],
          description: description.value,
        };
      } );
    }

    const translated = I18nUtils.localize( {}, translations );
    if ( translated.label ) this.label = translated.label;
    if ( translated.description ) this.description = translated.description;
  }

}
