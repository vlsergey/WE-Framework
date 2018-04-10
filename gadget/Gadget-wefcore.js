/**
 * Those JavaScript classes are main core of WE-Framework to edit Wikidata using
 * JQuery dialogs. They provide classes to edit snak values, snaks, claims, and
 * claim groups (of the same property). For the examples how to use those
 * classes see "WEF_ExternalLinks.js" and "WEF_PersonEditor.js".
 *
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
window.wef_Editors_i18n_en = {

};

window.wef_Editors_i18n_ru = {

};

window.WEF_Editors_i18n = function() {

  this.summary = 'via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get( 'wgDBname' );

  WEF_Utils.localize( this, 'wef_Editors_i18n_' );
};

/**
 * @typedef WEF_Entity
 * @type {object}
 * @property {string} id
 * @property {string} type
 * @property {object} claims
 */

/**
 * @typedef WEF_Claim
 * @type {object}
 * @property {string} id
 * @property {WEF_Snak} mainsnak
 * @property {string} type
 * @property {string} rank
 */

/**
 * @typedef WEF_Snak
 * @type {object}
 * @property {string} snaktype
 * @property {string} property
 * @property {string} datatype
 * @property {object} datavalue
 */





WEF_Utils.promiseNow = function() {
  var d = $.Deferred();
  d.resolve.apply( d, arguments );
  return d.promise();
};

WEF_Utils.putOrClearLocalStorage = function( key, value ) {
  if ( typeof window.localStorage === 'undefined' )
    return;

  try {
    localStorage[key] = value;
  } catch ( err ) {
    mw.log.warn( 'Unable to populate local storage: ' + err );
    try {
      localStorage.removeItem( key );
    } catch ( err2 ) {
      mw.log.warn( 'Unable to remove outdated item from local storage: ' + err2 );
    }
  }
}






window.wef_Editors_i18n = new WEF_Editors_i18n();



/** @class */
var WEF_LabelsEditor = function() {
  "use strict";

  var i18n = wef_Editors_i18n;
  this.placed = false;
  var labelsEditor = this;

  this.oldLabels = {};
  this.oldDescriptions = {};
  // this.oldAliases = {};

  // key is language
  this.dataLabels = {};
  this.dataDescriptions = {};
  // this.dataAliases = {};

  this.currentLanguage = null;

  this.fieldset = $( document.createElement( 'fieldset' ) ).addClass( 'wef_fieldset' ).addClass( 'wef-labels-editor' );
  this.legend = $( document.createElement( 'legend' ) ).text( i18n.labelLabels + ':\u00A0\u00A0\u00A0' ).appendTo( this.fieldset );
  this.langSelect = $( document.createElement( 'select' ) ).appendTo( this.legend );
  var table = $( document.createElement( 'table' ) ).addClass( 'wef-table' ).addClass( 'wef-labels-editor-table' ).appendTo( this.fieldset );

  var tr1 = $( document.createElement( 'tr' ) ).appendTo( table );
  $( document.createElement( 'th' ) ).addClass( 'wef-labels-editor-th' ).text( i18n.labelLabel ).appendTo( tr1 );
  this.inputLabel = $( document.createElement( 'input' ) ).addClass( 'wef-labels-editor-label-input' ).appendTo(
      $( document.createElement( 'td' ) ).addClass( 'wef-labels-editor-label-td' ).appendTo( tr1 ) );

  var tr2 = $( document.createElement( 'tr' ) ).appendTo( table );
  $( document.createElement( 'th' ) ).addClass( 'wef-labels-editor-th' ).text( i18n.labelDescription ).appendTo( tr2 );
  this.inputDescription = $( document.createElement( 'input' ) ).addClass( 'wef-labels-editor-description-input' ).appendTo(
      $( document.createElement( 'td' ) ).addClass( 'wef-labels-editor-description-td' ).appendTo( tr2 ) );

  // var tr3 = $( document.createElement( 'tr' ) ).appendTo( table );
  // $( document.createElement( 'th' ) ).text( i18n.labelAliases ).appendTo(
  // tr3 );
  // this.inputAliases = $( document.createElement( 'ul' ) ).appendTo( $(
  // document.createElement( 'td' ) ).appendTo( tr3 ) );

  this.langSelect.change( function() {
    labelsEditor.switchLanguage();
  } );
  this.langSelect.change( function() {
    labelsEditor.switchLanguage();
  } );
};

WEF_LabelsEditor.prototype.replaceAll = function( target ) {
  "use strict";

  if ( this.placed === true ) {
    throw new Error( 'Claims edit table is already placed on the form' );
  }
  this.placed = true;

  this.fieldset.replaceAll( target );
};

WEF_LabelsEditor.prototype.initAsEmpty = function( currentPageItem ) {
  "use strict";
  var labelsEditor = this;

  this.oldLabels = {};
  this.oldDescriptions = {};
  this.dataLabels = {};
  this.dataDescriptions = {};
  this.currentLanguage = null;

  var contentLang = mw.config.get( 'wgContentLanguage' );
  var userLang = mw.config.get( 'wgUserLanguage' );

  if ( currentPageItem && !WEF_Utils.isWikidata() ) {
    this.dataLabels[contentLang] = mw.config.get( 'wgTitle' );
  }

  var languagesSet = {};
  languagesSet[contentLang] = contentLang;
  languagesSet[userLang] = userLang;
  languagesSet['ru'] = 'ru';
  languagesSet['en'] = 'en';
  languagesSet['nl'] = 'nl';

  var languages = [];
  $.each( languagesSet, function( key ) {
    languages.push( key );
  } );
  languages.sort();

  $.each( languages, function( i, language ) {
    $( document.createElement( 'option' ) ).attr( 'value', language ).text( language ).appendTo( labelsEditor.langSelect );
  } );

  this.currentLanguage = null;
  if ( WEF_Utils.isWikidata() ) {
    this.langSelect.val( userLang );
  } else {
    this.langSelect.val( contentLang );
  }
  this.switchLanguage();
};

WEF_LabelsEditor.prototype.load = function( entity ) {
  "use strict";
  var labelsEditor = this;

  // holder for all used laguages
  var languages = [];

  if ( typeof entity.labels !== 'undefined' ) {
    $.each( entity.labels, function( language, label ) {
      if ( languages.indexOf( language ) === -1 ) {
        languages.push( language );
      }
      labelsEditor.dataLabels[language] = label.value;
    } );
  }
  if ( typeof entity.descriptions !== 'undefined' ) {
    $.each( entity.descriptions, function( language, description ) {
      if ( languages.indexOf( language ) === -1 ) {
        languages.push( language );
      }
      labelsEditor.dataDescriptions[language] = description.value;
    } );
  }
  // if ( typeof entity.aliases !== 'undefined' ) {
  // $.each( entity.aliases, function( language, langAliases ) {
  // if ( languages.indexOf( language ) === -1 ) {
  // languages.push( language );
  // }
  // labelsEditor.dataAliases[language] = $.map( langAliases, function(
  // langAlias ) {
  // return langAlias.value;
  // } );
  // } );
  // }
  this.oldLabels = $.extend( {}, this.dataLabels );
  this.oldDescriptions = $.extend( {}, this.dataDescriptions );

  languages.sort();

  var contentLang = mw.config.get( 'wgContentLanguage' );
  var userLang = mw.config.get( 'wgUserLanguage' );
  languages = $.grep( languages, function( item ) {
    return item !== contentLang && item !== userLang;
  } );

  languages.splice( 0, 0, contentLang );
  if ( contentLang !== userLang ) {
    languages.splice( 0, 0, userLang );
  }

  $.each( languages, function( i, language ) {
    $( document.createElement( 'option' ) ).attr( 'value', language ).text( language ).appendTo( labelsEditor.langSelect );
  } );

  this.currentLanguage = null;
  if ( WEF_Utils.isWikidata() ) {
    this.langSelect.val( userLang );
  } else {
    this.langSelect.val( contentLang );
  }
  this.switchLanguage();
};

WEF_LabelsEditor.prototype.switchLanguage = function() {
  "use strict";
  var selectedLanguage = this.langSelect.val();

  if ( selectedLanguage == this.currentLanguage ) {
    return;
  }

  this._storeCurrentData();
  this.currentLanguage = selectedLanguage;

  if ( this.dataLabels[this.currentLanguage] !== 'undefined' ) {
    this.inputLabel.val( this.dataLabels[this.currentLanguage] );
  } else {
    this.inputLabel.val( '' );
  }
  if ( this.dataDescriptions[this.currentLanguage] !== 'undefined' ) {
    this.inputDescription.val( this.dataDescriptions[this.currentLanguage] );
  } else {
    this.inputDescription.val( '' );
  }
};

WEF_LabelsEditor.prototype._storeCurrentData = function() {
  "use strict";
  if ( this.currentLanguage !== null ) {
    this.dataLabels[this.currentLanguage] = ( "" + this.inputLabel.val() ).trim();
    this.dataDescriptions[this.currentLanguage] = ( "" + this.inputDescription.val() ).trim();
  }
};

/**
 * @param {WEF_Updates}
 *            updates
 */
WEF_LabelsEditor.prototype.collectUpdates = function( updates ) {
  "use strict";
  var labelsEditor = this;

  this._storeCurrentData();

  $.each( this.dataLabels, function( language, label ) {
    if ( !WEF_Utils.isEmpty( label ) ) {
      if ( labelsEditor.oldLabels[language] !== label ) {
        updates.setLabel( language, label );
      }
    }
  } );
  $.each( this.dataDescriptions, function( language, description ) {
    if ( !WEF_Utils.isEmpty( description ) ) {
      if ( labelsEditor.oldDescriptions[language] !== description ) {
        updates.setDescription( language, description );
      }
    }
  } );
};

/**
 * Organize multiple claim edit rows into single structure
 *
 * @param {WEF_Definition}
 *            definition
 * @class
 */
WEF_ClaimEditorsTable = function( definition ) {
  this.definition = definition;

  var сlaimEditorsTable = this;
  var i18n = wef_Editors_i18n;

  /** @type {WEF_ClaimEditor[]} */
  var claimEditors = this._claimEditors = [];
  /** @type {string[]} */
  var removedClaims = [];
  var placed = false;
  var temporaryHolder = null;

  var changeF = function() {
    $( сlaimEditorsTable ).change();
  };

  /** @returns {WEF_ClaimEditor} */
  this.add = function() {
    if ( placed === false ) {
      throw new Error( 'Claims edit table is not placed on the form yet' );
    }

    var claimEditor = new WEF_ClaimEditor( definition );

    var buttonAddClaim = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( 'wef_property_button' ).button( {
      icons: {
        primary: 'ui-icon-plus'
      },
      text: false,
      label: i18n.buttonAddClaim,
    } ).click( function() {
      var editor = сlaimEditorsTable.add();
      editor.initEmpty();
    } );

    var buttonRemoveClaim = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( 'wef_property_button' ).button( {
      icons: {
        primary: 'ui-icon-trash'
      },
      text: false,
      label: i18n.buttonRemoveClaim,
    } ).click( function() {

      var question = i18n.confirmDeleteClaim //
      .replace( '{code}', definition.label ) //
      .replace( '{label}', wef_LabelsCache.getLabel( definition.label ) );

      var r = !claimEditor.hasData() || confirm( question );
      if ( r === true ) {
        /*
         * add before removing to insert immediately after last existing
         */
        if ( claimEditors.length === 1 ) {
          var editor = сlaimEditorsTable.add();
          editor.initEmpty();
        }

        claimEditors = jQuery.grep( claimEditors, function( value ) {
          return value != claimEditor;
        } );

        if ( claimEditor.wikidataClaim != null && !WEF_Utils.isEmpty( claimEditor.wikidataClaim.id ) ) {
          removedClaims.push( claimEditor.wikidataClaim.id );
        }
        claimEditor.remove();
      }
    } );

    /** @type {function} */
    var normalizeF = definition.normalize;
    /** @type {function} */
    var urlF = definition.url;

    // append before URL and after input cell
    var buttonsCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
    {
      try {
        if ( definition.datatype === 'url' ) {
          var newButton = $( document.createElement( 'button' ) ).addClass( 'wef_property_button' ).attr( 'type', 'button' );
          newButton.button( {
            icons: {
              primary: 'ui-icon-extlink'
            },
            disabled: true,
            text: false,
            label: i18n.buttonUrlNavigate,
          } ).click( function() {
            if ( claimEditor.hasValue() ) {
              window.open( claimEditor.toDataValue().value, '_blank' );
            }
          } );
          $( claimEditor ).change( function() {
            if ( claimEditor.hasValue() ) {
              newButton.button( 'option', 'disabled', false );
              newButton.button( 'enable' );
            } else {
              newButton.button( 'option', 'disabled', true );
              newButton.button( 'disable' );
            }
          } );
          buttonsCell.append( newButton );
        }
      } catch ( err ) {
        mw.log.warn( 'Unable to attach URL button: ' + err );
      }
      if ( typeof definition.buttons !== 'undefined' ) {
        $.each( definition.buttons, function( index, buttonDefinition ) {
          var newButton = $( document.createElement( 'button' ) ).addClass( 'wef_property_button' ).attr( 'type', 'button' );
          newButton.button( buttonDefinition );
          if ( $.isFunction( buttonDefinition.click ) ) {
            newButton.click( function() {
              buttonDefinition.click( claimEditor );
            } );
          }
          if ( $.isFunction( buttonDefinition.init ) ) {
            buttonDefinition.init( claimEditor );
          }
          buttonsCell.append( newButton );
        } );
      }
    }

    if ( $.isFunction( urlF ) ) {
      claimEditor.row1.find( 'td.wef_property_editor_input' ).addClass( 'wef_external_links_before_url_cell' );
      var urlCell = $( document.createElement( 'td' ) ).addClass( 'wef_external_links_url_cell' ).appendTo( claimEditor.row1 );
      var div = $( '<div>&nbsp;</div>' ).addClass( 'wef_external_links_url_div' ).appendTo( urlCell );
      var a = $( document.createElement( 'a' ) ).addClass( 'wef_external_links_url_a' ).appendTo( div ).attr( 'target', '_blank' );

      var updateLinkImplF = function( newValue ) {
        if ( $.isFunction( normalizeF ) ) {
          var newValueNormalized = normalizeF( newValue );
          if ( newValue !== newValueNormalized ) {
            claimEditor.setStringValue( newValueNormalized );
            return;
          }
        }
        if ( newValue ) {
          var newUrl = urlF( newValue );
          a.attr( 'href', newUrl );
          a.text( newUrl );
          // if ( typeof definition.check !== 'undefined' ) {
          // var result = definition.check.exec( newValue );
          // if ( result == null ) {
          // var tip = i18n.getTip( definition );
          // var shortLabel = getLabelTextShort( definition );
          // tip = tip.replace( '{0}', shortLabel );

          // statusAndTips.text( tip );
          // statusAndTips.addClass( 'ui-state-error' );
          // } else {
          // statusAndTips.text( '' );
          // statusAndTips.removeClass( 'ui-state-error' );
          // }
          // }
        } else {
          a.attr( 'href', '' );
          a.text( '' );
          // statusAndTips.text( '' );
          // statusAndTips.removeClass( 'ui-state-error' );
        }
      };
      var updateLinkF = function() {
        if ( claimEditor.hasValue() ) {
          updateLinkImplF( claimEditor.toDataValue().value );
        } else {
          updateLinkImplF( '' );
        }
      };
      $( claimEditor ).change( updateLinkF );

      // additional placeholders to align buttons after URL fields
      $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
      $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
    } else {
      claimEditor.row1.find( 'td.wef_property_editor_input' ).attr( 'colspan', 4 );
    }

    var beforeCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).prependTo( claimEditor.row1 );
    beforeCell.append( buttonAddClaim );

    var afterCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
    afterCell.append( buttonRemoveClaim );

    this._claimEditors.push( claimEditor );

    if ( temporaryHolder !== null ) {
      claimEditor.tbody.replaceAll( temporaryHolder );
      temporaryHolder = null;
    } else {
      var prev = this._claimEditors[this._claimEditors.length - 2].tbody;
      var curr = this._claimEditors[this._claimEditors.length - 1].tbody;
      curr.insertAfter( prev );
    }

    $( claimEditor ).change( function() {
      changeF();
    } );

    return claimEditor;
  };

  /**
   * Init editor with values. Must be called after placement on the form.
   *
   * @param entity
   *            {WEF_Entity}
   */
  this.init = function( entity ) {
    if ( placed === false ) {
      throw new Error( 'Claims edit table is not placed on the form yet' );
    }

    /** @type {WEF_Claim[]} */
    var claims = WEF_filterClaims( definition, entity.claims );

    $.each( claims, function( i, claim ) {
      /** @type {WEF_ClaimEditor} */
      var editor = сlaimEditorsTable.add();
      editor.initWithValue( claim );
    } );

    if ( this.size() === 0 ) {
      /** @type {WEF_ClaimEditor} */
      var editor = this.add();
      editor.initEmpty();
    }
  };

  /**
   * Init editor with values. Must be called after placement on the form.
   *
   * @param entity
   *            {WEF_Entity}
   */
  this.initAsEmpty = function() {
    if ( placed === false ) {
      throw new Error( 'Claims edit table is not placed on the form yet' );
    }

    /** @type {WEF_ClaimEditor} */
    var editor = this.add();
    editor.initEmpty();
  };

  function createPlaceholder( target ) {
    if ( WEF_Utils.isEmpty( definition.columns ) ) {
      temporaryHolder = $( document.createElement( 'tbody' ) ).html( '<!-- Temporary holder for ' + definition.code + ' -->' );
      return temporaryHolder;
    }

    var container = $( document.createElement( 'tbody' ) );
    var columnsTable = $( document.createElement( 'table' ) ).addClass( 'wef_columns_table' ).appendTo( container );
    var columnsHeader = $( document.createElement( 'tr' ) ).addClass( 'wef_columns_header' ).appendTo( columnsTable );

    // empty cell for adding claim button
    columnsHeader.append( $( document.createElement( 'th' ) ).addClass( 'wef_column_th_empty' ) );

    var propertyName = $( document.createElement( 'th' ) ).addClass( 'wef_column_th' ).attr( 'colspan', '8' ).appendTo( columnsHeader );
    if ( typeof definition.label !== 'undefined' ) {
      wef_LabelsCache.getOrQueue( definition.label, function( label, description ) {
        propertyName.text( label );
        propertyName.attr( 'title', description );
      } );
    }
    $.each( definition.columns, function( i, columnDefinition ) {
      if ( !WEF_Utils.isEmpty( columnDefinition.code ) ) {
        var columnName = $( document.createElement( 'th' ) ).addClass( 'wef_column_th' ).attr( 'colspan', '2' ).appendTo( columnsHeader );
        if ( typeof columnDefinition.label !== 'undefined' ) {
          wef_LabelsCache.getOrQueue( columnDefinition.label, function( label, description ) {
            columnName.text( label );
            columnName.attr( 'title', description );
          } );
        }
      }
    } );

    temporaryHolder = $( document.createElement( 'tbody' ) ).html( '<!-- Temporary holder for ' + definition.code + ' -->' );
    temporaryHolder.appendTo( columnsTable );
    return container;
  }

  this.appendTo = function( target ) {
    if ( placed === true ) {
      throw new Error( 'Claims edit table is already placed on the form' );
    }
    placed = true;

    createPlaceholder().appendTo( target );
    return;
  };

  /** Replace each target element with the set of matched elements. */
  this.replaceAll = function( target ) {
    if ( placed === true ) {
      throw new Error( 'Claims edit table is already placed on the form' );
    }
    placed = true;

    createPlaceholder().replaceAll( target );
    return;
  };

  /**
   * @param {WEF_Updates}
   *            updates
   */
  this.collectUpdates = function( updates ) {
    $.each( this._claimEditors, function( i, claimEditor ) {
      claimEditor.collectUpdates( updates );
    } );
    for ( var index = 0; index < removedClaims.length; index++ ) {
      updates.removedClaims.push( removedClaims[index] );
    }
  };

  /**
   * @returns {number} the number of values, including no-value and some-value
   *          snaks
   */
  this.getHasDataSize = function() {
    var counter = 0;
    $.each( this._claimEditors, function( index, claimEditor ) {
      if ( claimEditor.hasData() ) {
        counter++;
      }
    } );
    return counter;
  };

};
window.WEF_ClaimEditorsTable = WEF_ClaimEditorsTable;

WEF_ClaimEditorsTable.removeFoundValueClasses = function() {
  $( '.wef-lookup-found' ).removeClass( 'wef-lookup-found' );
  $( '.wef-lookup-found-new' ).removeClass( 'wef-lookup-found-new' );
};

/**
 * Looking for equals value and mark it as foung (light-green) or create new
 * item and mark it as new
 *
 * @param {string}
 *            entityId
 */
WEF_ClaimEditorsTable.prototype.onFoundEntityIdValue = function( entityId ) {
  WEF_Utils.assertCorrectEntityId( entityId );

  var found = false;
  $.each( this._claimEditors,
  /**
   * @param {Number}
   *            i
   * @param {WEF_ClaimEditor}
   *            claimEditor
   */
  function( i, claimEditor ) {
    if ( claimEditor.equalsWikibaseItemValue( entityId ) ) {
      claimEditor.tbody.addClass( 'wef-lookup-found' );
      found = true;
    }
  } );

  if ( found )
    return;

  /** @type {WEF_ClaimEditor[]} */
  var withEmpty = $.grep( this._claimEditors,
  /**
   * @param {WEF_ClaimEditor}
   *            claimEditor
   */
  function( claimEditor ) {
    return !claimEditor.hasValue();
  } );

  if ( withEmpty.length === 0 ) {
    /** @type {WEF_ClaimEditor} */
    var newClaimEditor = this.add();
    newClaimEditor.initWithDataValue( 'wikibase-item', WEF_Utils.newWikibaseItemDataValue( entityId ) );
    newClaimEditor.tbody.addClass( 'wef-lookup-found-new' );
  } else {
    /** @type {WEF_ClaimEditor} */
    var newClaimEditor = withEmpty[0];
    newClaimEditor.setWikibaseItemValue( entityId );
    newClaimEditor.tbody.addClass( 'wef-lookup-found-new' );
  }
};

/**
 * @param {boolean}
 *            currentPageItem
 * @param {String}
 *            entityId
 * @param {WEF_LabelsEditor}
 *            labelsEditor
 * @param {WEF_ClaimEditorsTable[]}
 *            claimEditorTables
 */

WEF_EditorForm = function( originalTitle, html, definitionEnhanceCallback, i18n, currentPageItem, editDeferred ) {

  this.currentPageItem = currentPageItem;
  this.editDeferred = editDeferred;
  var editorForm = this;

  /** @type {WEF_LabelsEditor} */
  var labelsEditor = null;

  /** @type {WEF_ClaimEditorsTable[]} */
  var claimEditorsTables = [];

  var dialog = $( html );

  /**
   * @type {string}
   * @const
   */
  var DATAKEY_ANCHOR_EDITOR_TABLES = 'wef-achor-editors';
  var DATAKEY_ANCHOR_ORIGINAL_TEXT = 'wef-original-text';
  var enableAnchorCounterUpdate = false;

  dialog.find( '.wef_i18n_text' ).each( function( i, htmlItem ) {
    try {
      var item = $( htmlItem );
      var code = item.text();
      var translated = i18n[code];
      if ( typeof translated !== 'undefined' ) {
        item.text( translated );
        item.removeClass( 'wef_i18n_text' );
      }
    } catch ( err ) {
      mw.log.warn( 'Unable to translate element text: ' + err );
    }
  } );
  dialog.find( '.wef_i18n_label' ).each( function( i, htmlItem ) {
    try {
      var item = $( htmlItem );
      var code = item.text();
      wef_LabelsCache.getOrQueue( code, function( label, description ) {
        if ( !WEF_Utils.isEmpty( label ) ) {
          item.text( label );
        }
        if ( !WEF_Utils.isEmpty( description ) ) {
          item.attr( 'title', description );
        }
        item.removeClass( 'wef_i18n_label' );

        if ( item.hasClass( 'wef_editor_tab_anchor' ) ) {
          item.data( DATAKEY_ANCHOR_ORIGINAL_TEXT, label );
          updateAnchorCounter( item );
        }
      } );
    } catch ( err ) {
      mw.log.warn( 'Unable to translate element text: ' + err );
    }
  } );

  function updateLinkedAnchorCounter() {
    if ( enableAnchorCounterUpdate === false )
      return;

    try {
      /** @type {WEF_ClaimEditorsTable} */
      var currentClaimEditorTable = this;
      if ( typeof currentClaimEditorTable.wefTabAnchor === 'undefined' ) {
        return;
      }
      var anchor = currentClaimEditorTable.wefTabAnchor;
      updateAnchorCounter( anchor );
    } catch ( err ) {
      mw.log.warn( 'Unable to update editors count on tab: ' + err );
    }
  }

  function updateAnchorCounter( anchor ) {
    if ( enableAnchorCounterUpdate === false )
      return;

    try {
      var claimEditorTables = anchor.data( DATAKEY_ANCHOR_EDITOR_TABLES );
      if ( typeof claimEditorTables === 'undefined' ) {
        return;
      }
      var counter = 0;
      $.each( claimEditorTables, function( index, claimEditorTable ) {
        counter += claimEditorTable.getHasDataSize();
      } );

      var newText = anchor.data( DATAKEY_ANCHOR_ORIGINAL_TEXT ) + ' (' + counter + ')';
      anchor.text( newText );
    } catch ( err ) {
      mw.log.warn( 'Unable to update editors count on tab: ' + err );
    }
  }

  dialog.find( '.wef_editor_tab_anchor' ).each( function( i, anchor ) {
    var jAnchor = $( anchor );
    jAnchor.data( DATAKEY_ANCHOR_ORIGINAL_TEXT, jAnchor.text() );
  } );

  dialog.find( '.wef_labels_editor' ).each( function( i, htmlItem ) {
    var item = $( htmlItem );

    labelsEditor = new WEF_LabelsEditor();
    labelsEditor.replaceAll( item );
  } );

  dialog.find( '.wef_claim_editors' ).each( function( i, htmlItem ) {
    var item = $( htmlItem );

    var check = WEF_Utils.isEmpty( item.data( 'check' ) ) ? undefined : new RegExp( item.data( 'check' ) );
    var code = item.data( 'code' );
    var datatype = item.data( 'datatype' );
    var flag = item.data( 'flag' );
    var label = item.data( 'label' );
    var template = WEF_Utils.isEmpty( item.data( 'template' ) ) ? undefined : item.data( 'template' );

    if ( typeof label === 'undefined' ) {
      label = code;
    }

    var definition = new WEF_Definition( {
      check: check,
      code: code,
      datatype: datatype,
      flag: flag,
      label: label,
      columns: [],
      qualifiers: [],
      template: template,
    } );

    item.find( 'tr' ).each( function( k, qItem ) {
      var qualifier = $( qItem );
      var qDefinition = new WEF_Definition( {
        code: qualifier.data( 'code' ),
        editordatatype: qualifier.data( 'editordatatype' ),
        datatype: qualifier.data( 'datatype' ),
        label: qualifier.data( 'label' ),
      } );
      if ( WEF_Utils.isEmpty( qDefinition.label ) ) {
        qDefinition.label = qualifier.data( 'code' );
      }
      if ( qualifier.data( 'as-column' ) === true ) {
        definition.columns.push( qDefinition );
      } else {
        definition.qualifiers.push( qDefinition );
      }
    } );

    WEF_Utils.processDefinition( definition );
    if ( $.isFunction( definitionEnhanceCallback ) )
      definitionEnhanceCallback( definition );

    var claimEditorTable = new WEF_ClaimEditorsTable( definition );
    claimEditorsTables.push( claimEditorTable );

    try {
      // find corresponding anchor to future tab label update
      var tab = item.parents( '.wef_editor_tab' );
      var anchor = dialog.find( 'a.wef_editor_tab_anchor[href="#' + tab.attr( 'id' ) + '"]' );
      if ( anchor.length > 0 ) {
        claimEditorTable.wefTabAnchor = anchor;
        if ( anchor.data( DATAKEY_ANCHOR_EDITOR_TABLES ) == null ) {
          anchor.data( DATAKEY_ANCHOR_EDITOR_TABLES, [] );
        }
        anchor.data( DATAKEY_ANCHOR_EDITOR_TABLES ).push( claimEditorTable );
      }
      $( claimEditorTable ).change( updateLinkedAnchorCounter );
    } catch ( err ) {
      mw.log.warn( 'Unable to attach updateAnchorCounter() listener to claimEditorTable: ' + err );
    }

    claimEditorTable.replaceAll( item );
  } );

  dialog.find( '.wef_tabs' ).tabs();
  dialog.dialog( {
    autoOpen: false,
    width: 1000,
    title: originalTitle,
    buttons: [ {
      text: i18n.dialogButtonUpdateLabelsText,
      label: i18n.dialogButtonUpdateLabelsLabel,
      click: function() {
        wef_LabelsCache.clearCacheAndRequeue();
      },
      style: 'position: absolute; left: 1em;',
    }, {
      text: i18n.dialogButtonSaveText,
      label: i18n.dialogButtonSaveLabel,
      click: function() {
        dialog.dialog( 'close' );
        var saveD = wef_analyze_and_save( editorForm.currentPageItem, editorForm.entityId, labelsEditor, claimEditorsTables );
        saveD.done( function( entityId ) {
          WEF_Utils.tagRevisions( entityId, true ).always( function() {
            editDeferred.resolve( entityId );
          } );
        } );
        saveD.fail( function() {
          editDeferred.reject();
        } );
      },
    }, {
      text: i18n.dialogButtonCancelText,
      label: i18n.dialogButtonCancelLabel,
      click: function() {
        $( this ).dialog( 'close' );
        editDeferred.reject();
      }
    } ],
  } );

  this.load = function( entity ) {
    this.entityId = entity.id.toUpperCase();

    wef_LabelsCache.getOrQueue( this.entityId, function( label ) {
      dialog.dialog( 'option', 'title', '«' + label + '» — ' + originalTitle );
    } );

    if ( labelsEditor != null ) {
      labelsEditor.load( entity );
    }
    $.each( claimEditorsTables, function( i, claimEditorsTable ) {
      claimEditorsTable.init( entity );
    } );
    enableAnchorCounterUpdate = true;
    dialog.find( 'a.wef_editor_tab_anchor' ).each( function( i, anchor ) {
      updateAnchorCounter( $( anchor ) );
    } );
  };

  this.initAsEmpty =
  /**
   * @param {Boolean}
   *            currentPageItem
   * @param {?String}
   *            initTypeId
   */
  function( currentPageItem, initTypeId ) {
    if ( !WEF_Utils.isEmpty( initTypeId ) )
      WEF_Utils.assertCorrectEntityId( initTypeId );

    this.entityId = null;

    var newTitle = i18n.dialogTitleNewElement + ' — ' + originalTitle;
    dialog.attr( 'title', newTitle );
    dialog.dialog( 'option', 'title', newTitle );

    if ( labelsEditor != null ) {
      labelsEditor.initAsEmpty( currentPageItem );
    }
    $.each( claimEditorsTables,
    /**
     * @param {number}
     *            i
     * @param {WEF_ClaimEditorsTable}
     *            claimEditorsTable
     */
    function( i, claimEditorsTable ) {
      if ( !WEF_Utils.isEmpty( initTypeId ) && claimEditorsTable.definition.code == 'P31' ) {
        claimEditorsTable.onFoundEntityIdValue( initTypeId );
      } else {
        claimEditorsTable.initAsEmpty( currentPageItem );
      }
    } );
    enableAnchorCounterUpdate = true;
    dialog.find( 'a.wef_editor_tab_anchor' ).each( function( i, anchor ) {
      updateAnchorCounter( $( anchor ) );
    } );
  };

  this.open = function() {
    dialog.dialog( 'open' );
  };
};
window.WEF_EditorForm = WEF_EditorForm;

/**
 * @class
 */
WEF_Editor = function( dialogHtml ) {
  "use strict";

  if ( typeof dialogHtml === 'undefined' ) {
    throw new Error( 'Dialog HTML is not specified' );
  }

  this.i18n = {};
  this.dialogHtml = dialogHtml;
  this.definitionEnhanceCallback = null;
};
window.WEF_Editor = WEF_Editor;


WEF_Editor.prototype.edit =
/**
 * @param {!Boolean}
 *            currentPageItem
 * @param {?String}
 *            entityId
 * @param {?String}
 *            entityTypeId
 */
function( currentPageItem, entityId, entityTypeId ) {
  "use strict";

  if ( !WEF_Utils.isEmpty( entityId ) )
    WEF_Utils.assertCorrectEntityId( entityId );
  if ( !WEF_Utils.isEmpty( entityTypeId ) )
    WEF_Utils.assertCorrectEntityId( entityTypeId );

  var editDeferred = $.Deferred();
  var editor = this;
  var i18n = this.i18n;

  if ( entityId === null ) {
    // empty item
    var editorForm = new WEF_EditorForm( editor.i18n.dialogTitle, editor.dialogHtml, editor.definitionEnhanceCallback, editor.i18n, currentPageItem, editDeferred );
    editorForm.initAsEmpty( currentPageItem, entityTypeId );
    editorForm.open();
    return editDeferred;
  }

  var statusDialog = $( document.createElement( 'div' ) );
  statusDialog.attr( 'title', this.i18n.dialogTitle );
  statusDialog.append( $( document.createElement( 'p' ) ).text( this.i18n.statusLoadingWikidata ) );
  statusDialog.dialog();

  WEF_Utils.getWikidataApi().get( {
    action: 'wbgetentities',
    ids: entityId,
  } ).done( function( result ) {
    var editorForm = new WEF_EditorForm( editor.i18n.dialogTitle, editor.dialogHtml, editor.definitionEnhanceCallback, editor.i18n, currentPageItem, editDeferred );
    editorForm.load( result.entities[entityId] );
    editorForm.open();
  } ).fail( function() {
    alert( i18n.errorLoadingWikidata );
    editDeferred.reject( 'Unable to load from Wikidata' );
  } ).always( function() {
    statusDialog.dialog( 'close' );
  } );

  return editDeferred;
};
