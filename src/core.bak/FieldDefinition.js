import * as WEF_Utils from './utils';

export default class FieldDefinition {

  constructor( args ) {
    /** @type {string} */
    this.code = args.code;
    /** @type {string} */
    this.datatype = 'string';
    /** @type {string} */
    this.label = undefined;
    /** @type {string} */
    this.labelPrefix = undefined;
    /** @type {function} */
    this.normalize = undefined;
    /** @type {object} */
    this.check = undefined;
    /** @type {function} */
    this.url = undefined;
    /** @type {WEF_Definition[]} */
    this.qualifiers = undefined;
    this.buttons = undefined;

    jQuery.extend( this, args );
  }

  /**
   * Preprocess different aspects of WEF_definition
   * <ul>
   * <li>Analyzes definition.template string and updates definition with new
   * functions like url() and normalize()</li>
   * <li>Create standard url function for commonsMedia datatype</li>
   * <ul>
   */
  fillInTheGaps( ) {
    if ( typeof this.template !== 'undefined' ) {
      const newNormFunctions = [];
      $.each( $.isArray( this.template ) ? this.template : [ this.template ], ( index, template ) => {
        if ( template.indexOf( '$1' ) === -1 ) {
          mw.log.warn( 'Template of definition «' + this.code + '» missing «$1» in «' + template + '»' );
          return;
        }

        const prefix = template.substr( 0, template.indexOf( '$1' ) );
        const suffix = template.substr( template.indexOf( '$1' ) + '$1'.length );

        let rPrefix = WEF_Utils.regexpEscape( prefix );
        const rSuffix = WEF_Utils.regexpEscape( suffix );
        let pattern;

        if ( /^http:/.test( rPrefix ) ) {
          rPrefix = rPrefix.replace( /^http:/, 'https?:' );
        }
        if ( /^https:/.test( rPrefix ) ) {
          rPrefix = rPrefix.replace( /^https:/, 'https?:' );
        }

        pattern = '^' + rPrefix + '(';
        if ( typeof this.check !== 'undefined' ) {
          let inner = WEF_Utils.regexpGetSource( this.check );
          inner = inner.replace( /^\^(.*)$/, '$1' ).replace( /^(.*)\$$/, '$1' );
          pattern += inner;
        } else {
          pattern += '.*';
        }
        pattern += ')';

        if ( WEF_Utils.isEmpty( rSuffix ) ) {
          pattern += '$';
        } else {
          pattern += rSuffix + '.*$';
        }
        const regExp = new RegExp( pattern );

        newNormFunctions.push( function( id ) {
          return id.replace( regExp, '$1' );
        } );
      } );
      newNormFunctions.forEach( func => {
        const old = this.normalize;
        if ( typeof old !== 'undefined' ) {
          this.normalize = function( id ) {
            return func( old( id ) );
          };
        } else {
          this.normalize = function( id ) {
            return func( id );
          };
        }
      } );
      if ( typeof this.url === 'undefined' ) {
        const first = $.isArray( this.template ) ? this.template[ 0 ] : this.template;
        this.url = function( id ) {
          return first.replace( '$1', id );
        };
      }
    }
    if ( this.datatype === 'commonsMedia' && typeof this.url === 'undefined' ) {
      this.url = WEF_Utils.urlCommons;
    }
  }

}
