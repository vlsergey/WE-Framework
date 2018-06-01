
/**
 * @param {string}
 *            entityId
 * @class
 */
export default class WEF_Updates {

  constructor( entityId ) {
    /** {string} */
    this.entityId = entityId;
    this.data = {};
    this.removedClaims = [];
  }

  setLabel( language, value ) {
    if ( typeof this.data.labels === 'undefined' ) {
      this.data.labels = {};
    }
    this.data.labels[ language ] = {
      language: language,
      value: value
    };
  }

  setDescription( language, value ) {
    if ( typeof this.data.descriptions === 'undefined' ) {
      this.data.descriptions = {};
    }
    this.data.descriptions[ language ] = {
      language: language,
      value: value
    };
  }

  setSitelink( site, title ) {
    if ( typeof this.data.sitelinks === 'undefined' ) {
      this.data.sitelinks = {};
    }
    this.data.sitelinks[ site ] = {
      site: site,
      title: title
    };
  }
}
