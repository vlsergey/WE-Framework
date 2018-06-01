import * as ApiUtils from './ApiUtils';
import * as CalendarUtils from './CalendarUtils';
import * as ModelUtils from './ModelUtils';
import * as WEF_Utils from './utils';
import i18n from './core.i18n';
import styles from './core.css';
import WEF_ItemInput from './ItemInput';
import WEF_ItemSelect from './ItemSelect';
import wef_LabelsCache from './labelsCache';
import WEF_LanguageInput from './LanguageInput';
import WEF_SelectEditor from './SelectEditor';

/** @type {string} */
const WIKIDATA_URI_PREFIX = 'http://www.wikidata.org/entity/';

/** @type {string} */
const GLOBE_EARTH = 'Q2';
/** @type {string[]} */
const GLOBES = [
  'Q308', // MERCURY
  'Q313', // VENUS
  GLOBE_EARTH, // EARTH
  'Q405', // MOON
  'Q111', // MARS
  'Q319', // JUPITER
];

/** @type {string} */
const CALENDAR_GREGORIAN = 'Q1985727';
/** @type {string} */
const CALENDAR_JULIAN = 'Q1985786';
/** @type {string[]} */
const CALENDAR_MODELS = [ WIKIDATA_URI_PREFIX + CALENDAR_GREGORIAN, WIKIDATA_URI_PREFIX + CALENDAR_JULIAN ];
const PRECISION_DAYS = 11;
const PRECISION_MONTHS = 10;
const PRECISION_YEARS = 9;
const PRECISION_CENTURIES = 7;


export default class WEF_SnakValueEditor {

  /**
   * @param initialDataValue
   *            {WEF_Snak} datavalue to initialize editor. If empty, new editor
   *            will be created
   * @class
   */
  constructor( parent, dataDataType, editorDataType, initialDataValue, options ) {
    if ( WEF_Utils.isEmpty( dataDataType ) ) {
      throw new Error( 'DataType is not specified' );
    }

    const snakValueEditor = this;

    const _jThis = $( this );
    function changeF() {
      _jThis.trigger( 'change' );
    }

    this.mainElement = $( document.createElement( 'span' ) ).appendTo( parent );

    const unsupportedF = function() {
      throw new Error( 'DataType "' + dataDataType + '" is not supported' );
    };

    /** @type {function(): boolean} */
    this.hasValue = unsupportedF;
    /** @type {function(): object} */
    this.toDataValue = unsupportedF;
    /** @type {function(object)} */
    this.setDataValue = unsupportedF;
    /** @type {function(): object} */
    this.getAsLabel = unsupportedF;

    const addTr = function( table, textLabel, textTitle, input ) {
      const tr = $( document.createElement( 'tr' ) ).attr( 'title', textTitle ).appendTo( table );
      if ( typeof textLabel !== 'undefined' ) {
        input.uniqueId();
        const th = $( document.createElement( 'th' ) ).appendTo( tr );
        $( document.createElement( 'label' ) ).text( textLabel + ': ' ).attr( 'id', input.attr( 'id' ) ).appendTo( th );
      }
      const td = $( document.createElement( 'td' ) ).appendTo( tr );
      if ( typeof textLabel === 'undefined' ) {
        td.attr( 'colspan', 2 );
      }
      td.append( input );
    };

    if ( typeof editorDataType === 'undefined' ) {
    // autodetect enabled
      editorDataType = dataDataType;
      if ( editorDataType === 'time' ) {
        if ( typeof initialDataValue === 'undefined' || typeof initialDataValue.value === 'undefined' || CALENDAR_MODELS.indexOf( initialDataValue.value.calendarmodel ) === -1 ) {
          editorDataType = 'time-days-gregorian';
        } else {
          const initialValue = initialDataValue.value;
          if ( !/^[\\+\\-][0-9]{1,4}\-/.test( initialValue.time ) ) {
            editorDataType = 'time';
          } else if ( !WEF_Utils.isEmpty( initialValue ) && !WEF_Utils.isEmpty( initialValue.precision ) ) {
            const precision = initialValue.precision;
            if ( precision === PRECISION_CENTURIES && initialValue.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) === CALENDAR_GREGORIAN ) {
              editorDataType = 'time-centuries';
            } else if ( precision === PRECISION_YEARS && initialValue.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) === CALENDAR_GREGORIAN ) {
              editorDataType = 'time-years';
            } else if ( precision === PRECISION_MONTHS && initialValue.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) === CALENDAR_GREGORIAN ) {
              editorDataType = 'time-months';
            } else if ( precision === PRECISION_DAYS ) {
              if ( initialValue.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) === CALENDAR_GREGORIAN ) {
                editorDataType = 'time-days-gregorian';
              } else {
                editorDataType = 'time-days';
              }
            }
          }
        }
      }
      if ( editorDataType === 'quantity' ) {
        if ( typeof initialDataValue === 'undefined' || typeof initialDataValue.value === 'undefined' ) {
          editorDataType = 'quantity-exact';
        } else {
          const unit = initialDataValue.value.unit;
          const amount = initialDataValue.value.amount;
          const upperBound = initialDataValue.value.upperBound;
          const lowerBound = initialDataValue.value.lowerBound;

          if ( unit === '1' && amount === upperBound && amount === lowerBound ) {
            editorDataType = 'quantity-exact';
          } else if ( unit === '1' && Number( upperBound ) - Number( amount ) === Number( amount ) - Number( lowerBound ) ) {
            editorDataType = 'quantity-plus-minus';
          }
        }
      }
    }

    this.dataDataType = dataDataType;
    this.editorDataType = editorDataType;
    this.mainElement.addClass( styles[ 'wef_snak_value_editor_' + editorDataType ] );

    const switchDataType = function( newEditorDataType, dataValue ) {
      snakValueEditor.mainElement.remove();
      WEF_SnakValueEditor.call( snakValueEditor, parent, snakValueEditor.dataDataType, newEditorDataType, dataValue, options );
    };

    let selectQuantityMode;
    if ( editorDataType.substring( 0, 'quantity-'.length ) === 'quantity-' ) {
      selectQuantityMode = $( document.createElement( 'select' ) )
        .addClass( styles.wef_quantity_mode );

      selectQuantityMode.append( $( document.createElement( 'option' ) )
        .attr( 'value', 'quantity-exact' )
        .text( i18n.inputQuantityModeExact ) );
      selectQuantityMode.append( $( document.createElement( 'option' ) )
        .attr( 'value', 'quantity-plus-minus' )
        .text( i18n.inputQuantityModePlusMinus ) );
      selectQuantityMode.append( $( document.createElement( 'option' ) )
        .attr( 'value', 'quantity' )
        .text( i18n.inputQuantityModeOther ) );

      selectQuantityMode.val( editorDataType );
      selectQuantityMode.change( function() {
        const newDataType = selectQuantityMode.val();
        if ( newDataType !== editorDataType ) {
          if ( snakValueEditor.hasValue() ) {
            switchDataType( newDataType, snakValueEditor.toDataValue() );
          } else {
            switchDataType( newDataType, undefined );
          }
        }
      } );
    }

    let selectDateTimePrecision;
    if ( editorDataType.substring( 0, 5 ) === 'time-' ) {
      selectDateTimePrecision = $( document.createElement( 'select' ) )
        .addClass( styles.wef_select_date_time_precision )
        .attr( 'title', i18n.inputTimePrecisionTitle );
      selectDateTimePrecision.append( $( document.createElement( 'option' ) )
        .attr( 'value', 'time-days' )
        .data( 'precision', PRECISION_DAYS )
        .text( i18n[ 'timePrecision' + PRECISION_DAYS ] ) );
      selectDateTimePrecision.append( $( document.createElement( 'option' ) )
        .attr( 'value', 'time-months' )
        .data( 'precision', PRECISION_MONTHS )
        .text( i18n[ 'timePrecision' + PRECISION_MONTHS ] ) );
      selectDateTimePrecision.append( $( document.createElement( 'option' ) )
        .attr( 'value', 'time-years' )
        .data( 'precision', PRECISION_YEARS )
        .text( i18n[ 'timePrecision' + PRECISION_YEARS ] ) );
      selectDateTimePrecision.append( $( document.createElement( 'option' ) )
        .attr( 'value', 'time-centuries' )
        .data( 'precision', PRECISION_CENTURIES )
        .text( i18n[ 'timePrecision' + PRECISION_CENTURIES ] ) );
      selectDateTimePrecision.append( $( document.createElement( 'option' ) )
        .attr( 'value', 'time' )
        .text( i18n.timePrecisionOther ) );
      if ( editorDataType === 'time-days-gregorian' ) {
        selectDateTimePrecision.val( 'time-days' );
      } else {
        selectDateTimePrecision.val( editorDataType );
      }
      selectDateTimePrecision.change( function() {
        const newDataType = selectDateTimePrecision.val();
        if ( newDataType !== editorDataType ) {
          if ( snakValueEditor.hasValue() ) {
            const dataValue = snakValueEditor.toDataValue();
            if ( typeof dataValue.value !== 'undefined' && newDataType !== 'time' ) {
              dataValue.value.precision = Number( selectDateTimePrecision.find( 'option:selected' ).data( 'precision' ) );
            }
            switchDataType( newDataType, dataValue );
          } else {
            switchDataType( newDataType, undefined );
          }
        }
      } );
    }

    if ( editorDataType === 'commonsMedia' ) {
      ( function() {
        const input = $( document.createElement( 'input' ) )
          .attr( 'type', 'text' )
          .addClass( styles.wef_commonsMedia )
          .appendTo( snakValueEditor.mainElement );
        this.setDataValue = function( newDataValue ) {
          input.val( newDataValue.value );
        };
        this.hasValue = function() {
          return input.val() != null && !WEF_Utils.isEmpty( input.val().trim() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }
          return {
            type: 'string',
            value: input.val() == null ? null : input.val().trim(),
          };
        };
        this.getAsLabel = function() {

          const span = $( document.createElement( 'a' ) ).attr( 'href', '//commons.wikimedia.org/wiki/File:' + encodeURI( input.val() ) ).text( input.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'commonsMedia', this.toDataValue(), span );
          return span;
        };

        input.autocomplete( {
          source: function( request, response ) {
            const term = request.term;
            $.ajax(
              {
                type: 'GET',
                dataType: 'json',
                url: '//commons.wikimedia.org/w/api.php?format=json&origin=' + encodeURIComponent( location.protocol + mw.config.get( 'wgServer' ) )
                    + '&action=query&list=prefixsearch&psnamespace=6&pslimit=15&pssearch=' + encodeURIComponent( term ),
              } ).then( ( result ) => {
              const list = [];
              $.each( result.query.prefixsearch, function( index, p ) {
                list.push( p.title.substring( 'File:'.length ) );
              } );
              response( list );
            } );
          },
          select: function( event, ui ) {
            input.val( ui.item.value );
            input.change();
          },
        } );

        input.change( changeF );
        input.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'globe-coordinate' ) {
      ( function() {

        const table = $( document.createElement( 'table' ) )
          .addClass( styles.wef_globecoordinate_table )
          .appendTo( this.mainElement );

        const inputLatitude = $( document.createElement( 'input' ) )
          .attr( 'type', 'number' )
          .attr( 'step', 'any' )
          .attr( 'min', '-90' )
          .attr( 'max', '90' )
          .attr( 'pattern', '[0-9]{1,2}(\.[0-9]{0,9})?' )
          .addClass( styles.wef_globecoordinate_latitude )
          .attr( 'placeholder', i18n.inputGlobeLatitudeLabel );
        const inputLongitude = $( document.createElement( 'input' ) )
          .attr( 'type', 'number' )
          .attr( 'step', 'any' )
          .attr( 'min', '-180' )
          .attr( 'max', '180' )
          .attr( 'pattern', '[0-9]{1,3}(\.[0-9]{0,9})?' )
          .addClass( styles.wef_globecoordinate_longitude )
          .attr( 'placeholder', i18n.inputGlobeLongitudeLabel );
        const inputAltitude = $( document.createElement( 'input' ) )
          .attr( 'type', 'number' )
          .attr( 'step', 'any' )
          .addClass( styles.wef_globecoordinate_altitude )
          .attr( 'placeholder', i18n.inputGlobeAltitudeLabel );
        const inputPrecision = $( document.createElement( 'input' ) )
          .attr( 'type', 'number' )
          .attr( 'step', 'any' )
          .addClass( styles.wef_globecoordinate_precision )
          .attr( 'placeholder', i18n.inputGlobePrecisionLabel );

        const inputGlobe = new WEF_ItemSelect();
        inputGlobe.select.addClass( styles.wef_globecoordinate_globe );
        GLOBES.forEach( globeId => inputGlobe.addOption( globeId ) );
        inputGlobe.val( GLOBE_EARTH );

        addTr( table, i18n.inputGlobeLatitudeLabel, i18n.inputGlobeLatitudeTitle, inputLatitude );
        addTr( table, i18n.inputGlobeLongitudeLabel, i18n.inputGlobeLongitudeTitle, inputLongitude );
        addTr( table, i18n.inputGlobeAltitudeLabel, i18n.inputGlobeAltitudeTitle, inputAltitude );
        addTr( table, i18n.inputGlobePrecisionLabel, i18n.inputGlobePrecisionTitle, inputPrecision );
        addTr( table, i18n.inputGlobeGlobeLabel, i18n.inputGlobeGlobeTitle, inputGlobe.select );

        this.setDataValue = function( newDataValue ) {
          inputLatitude.val( newDataValue.value.latitude == null ? '' : newDataValue.value.latitude );
          inputLongitude.val( newDataValue.value.longitude == null ? '' : newDataValue.value.longitude );
          inputAltitude.val( newDataValue.value.altitude == null ? '' : newDataValue.value.altitude );
          inputPrecision.val( newDataValue.value.precision == null ? '' : newDataValue.value.precision );
          inputGlobe.val( newDataValue.value.globe.substr( WIKIDATA_URI_PREFIX.length ) );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( inputLatitude.val() ) || !WEF_Utils.isEmpty( inputLongitude.val() ) || !WEF_Utils.isEmpty( inputAltitude.val() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }
          return {
            type: 'globecoordinate',
            value: {
              latitude: !WEF_Utils.isEmpty( inputLatitude.val() ) ? Number( inputLatitude.val() ) : null,
              longitude: !WEF_Utils.isEmpty( inputLongitude.val() ) ? Number( inputLongitude.val() ) : null,
              altitude: !WEF_Utils.isEmpty( inputAltitude.val() ) ? Number( inputAltitude.val() ) : null,
              precision: !WEF_Utils.isEmpty( inputPrecision.val() ) ? Number( inputPrecision.val() ) : 0,
              globe: WIKIDATA_URI_PREFIX + inputGlobe.val(),
            },
          };
        };
        this.getAsLabel = function() {

          const span = $( document.createElement( 'span' ) )
            .addClass( styles.wef_snak_replacement_label_globe )
            .text( inputLatitude.val() + '; ' + inputLongitude.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'globe-coordinate', this.toDataValue(), span );
          return span;
        };

        inputLatitude.change( changeF );
        inputLatitude.keyup( changeF );
        inputLongitude.change( changeF );
        inputLongitude.keyup( changeF );
        inputAltitude.change( changeF );
        inputAltitude.keyup( changeF );
        inputPrecision.change( changeF );
        inputPrecision.keyup( changeF );
        inputGlobe.select.change( changeF );
        inputGlobe.select.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'monolingualtext' ) {
      ( function() {
        const table = $( document.createElement( 'table' ) )
          .addClass( styles.wef_monolingualtext_table )
          .appendTo( snakValueEditor.mainElement );
        const tr = $( document.createElement( 'tr' ) )
          .addClass( styles.wef_monolingualtext_tr )
          .appendTo( table );

        const langSelect = new WEF_LanguageInput()
          .appendTo( $( document.createElement( 'td' ) )
            .addClass( styles.wef_monolingualtext_td_language )
            .appendTo( tr ) );
        const input = $( document.createElement( 'input' ) )
          .attr( 'type', 'text' )
          .addClass( styles.wef_monolingualtext_text ).appendTo(
            $( document.createElement( 'td' ) )
              .addClass( styles.wef_monolingualtext_td_text )
              .appendTo( tr ) );

        try {
          if ( typeof options === 'object' && typeof options.check === 'object' ) {
            input.attr( 'pattern', WEF_Utils.regexpGetHtmlPattern( options.check ) );
          }
        } catch ( err ) {
          mw.log.warn( 'Unable to attach check pattern to input: ' + err );
        }

        this.setDataValue = function( newDataValue ) {
          langSelect.val( newDataValue.value.language );
          input.val( newDataValue.value.text );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( input.val().trim() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }
          return {
            type: 'monolingualtext',
            value: {
              text: input.val() == null ? null : input.val().trim(),
              language: langSelect.val(),
            },
          };
        };
        this.getAsLabel = function() {

          const span = $( document.createElement( 'span' ) ).text( '(' + langSelect.val() + ') ' + input.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'monolingualtext', this.toDataValue(), span );
          return span;
        };

        langSelect.change( changeF );
        langSelect.keyup( changeF );
        input.change( changeF );
        input.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'quantity' ) {
      ( function() {

        const table = $( document.createElement( 'table' ) )
          .addClass( styles.wef_quantity_table )
          .appendTo( this.mainElement );

        const inputUnit = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( styles.wef_quantity_unit );
        const inputLowerBound = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( styles.wef_quantity_lower_bound );
        const inputAmount = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( styles.wef_quantity_amount );
        const inputUpperBound = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( styles.wef_quantity_upper_bound );

        addTr( table, i18n.inputQuantityUnitLabel, i18n.inputQuantityUnitTitle, inputUnit );
        addTr( table, i18n.inputQuantityLowerBoundLabel, i18n.inputQuantityLowerBoundTitle, inputLowerBound );
        addTr( table, i18n.inputQuantityAmountLabel, i18n.inputQuantityAmountTitle, inputAmount );
        addTr( table, i18n.inputQuantityUpperBoundLabel, i18n.inputQuantityUpperBoundTitle, inputUpperBound );

        this.setDataValue = function( newDataValue ) {
          inputUnit.val( newDataValue.value.unit );
          inputLowerBound.val( newDataValue.value.lowerBound );
          inputAmount.val( newDataValue.value.amount );
          inputUpperBound.val( newDataValue.value.upperBound );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( inputAmount.val() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }
          return {
            type: 'quantity',
            value: {
              unit: inputUnit.val(),
              lowerBound: WEF_Utils.formatQuantity( inputLowerBound.val() ),
              amount: WEF_Utils.formatQuantity( inputAmount.val() ),
              upperBound: WEF_Utils.formatQuantity( inputUpperBound.val() ),
            },
          };
        };
        this.getAsLabel = function() {
          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_quantity ).text(
            inputLowerBound.val() + ' / ' + inputAmount.val() + ' / ' + inputUpperBound.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'quantity', this.toDataValue(), span );
          return span;
        };

        inputUnit.change( changeF );
        inputUnit.keyup( changeF );
        inputLowerBound.change( changeF );
        inputLowerBound.keyup( changeF );
        inputAmount.change( changeF );
        inputAmount.keyup( changeF );
        inputUpperBound.change( changeF );
        inputUpperBound.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'quantity-exact' ) {
      ( function() {

        selectQuantityMode.appendTo( this.mainElement );
        const inputAmount = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( styles.wef_quantity_amount ).appendTo( this.mainElement );

        this.setDataValue = function( newDataValue ) {
          inputAmount.val( newDataValue.value.amount );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( inputAmount.val() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }
          return {
            type: 'quantity',
            value: {
              unit: '1',
              lowerBound: WEF_Utils.formatQuantity( inputAmount.val() ),
              amount: WEF_Utils.formatQuantity( inputAmount.val() ),
              upperBound: WEF_Utils.formatQuantity( inputAmount.val() ),
            },
          };
        };
        this.getAsLabel = function() {

          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_quantity ).text( inputAmount.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'quantity', this.toDataValue(), span );
          return span;
        };

        inputAmount.change( changeF );
        inputAmount.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'quantity-plus-minus' ) {
      ( function() {

        selectQuantityMode.appendTo( this.mainElement );
        const inputAmount = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( styles.wef_quantity_amount ).appendTo( this.mainElement );
        $( document.createElement( 'span' ) ).text( '±' ).appendTo( this.mainElement );
        const inputDifference = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( styles.wef_quantity_difference ).appendTo( this.mainElement );

        this.setDataValue = function( newDataValue ) {
          inputDifference.val( Number( newDataValue.value.amount ) - Number( newDataValue.value.lowerBound ) );
          inputAmount.val( newDataValue.value.amount );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( inputAmount.val() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }
          const amount = Number( inputAmount.val() );
          const difference = Number( inputDifference.val() );
          return {
            type: 'quantity',
            value: {
              unit: '1',
              lowerBound: WEF_Utils.formatQuantity( amount - difference ),
              amount: WEF_Utils.formatQuantity( inputAmount.val() ),
              upperBound: WEF_Utils.formatQuantity( amount + difference ),
            },
          };
        };
        this.getAsLabel = function() {

          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_quantity ).text( inputAmount.val() + '±' + inputDifference.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'quantity', this.toDataValue(), span );
          return span;
        };

        inputAmount.change( changeF );
        inputAmount.keyup( changeF );
        inputDifference.change( changeF );
        inputDifference.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'string' || editorDataType === 'external-id' ) {
      ( function() {
        const input = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_' + editorDataType ).appendTo( this.mainElement );

        if ( typeof options === 'object' && typeof options.autocomplete === 'object' ) {
          input.autocomplete( options.autocomplete );
          input.on( 'autocompleteselect', function( event, ui ) {
            input.val( ui.item.value );
            input.change();
          } );
        }
        try {
          if ( typeof options === 'object' && typeof options.check === 'object' ) {
            input.attr( 'pattern', WEF_Utils.regexpGetHtmlPattern( options.check ) );
          }
        } catch ( err ) {
          mw.log.warn( 'Unable to attach check pattern to input: ' + err );
        }

        this.setDataValue = function( newDataValue ) {
          input.val( newDataValue.value );
        };
        this.hasValue = function() {
          return input.val() != null && !WEF_Utils.isEmpty( input.val().trim() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }
          return {
            type: 'string',
            value: input.val() == null ? null : input.val().trim(),
          };
        };
        this.getAsLabel = function() {
          return $( document.createElement( 'span' ) ).text( input.val() );
        };

        input.change( changeF );
        input.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'time' ) {
      ( function() {

        const table = $( document.createElement( 'table' ) ).addClass( styles.wef_time_table ).appendTo( this.mainElement );

        const inputTime = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( styles.wef_time_time ).attr( 'placeholder', i18n.inputTimeTimeTitle );
        const inputTimeZone = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( styles.wef_time_timezone ).attr( 'placeholder', i18n.inputTimeTimeZoneTitle );

        const inputPrecision = $( document.createElement( 'select' ) ).addClass( styles.wef_time_precision );
        for ( let i = 0; i < 15; i++ ) {
          const option = $( document.createElement( 'option' ) );
          option.attr( 'value', i );
          option.text( i18n[ 'timePrecision' + i ] );
          inputPrecision.append( option );
        }
        inputPrecision.val( 11 );

        const inputCalendarModel = new WEF_ItemSelect();
        inputCalendarModel.select.addClass( styles.wef_time_calendarmodel );
        inputCalendarModel.addOption( CALENDAR_GREGORIAN );
        inputCalendarModel.addOption( CALENDAR_JULIAN );
        inputCalendarModel.val( CALENDAR_GREGORIAN );

        addTr( table, i18n.inputTimeTimeLabel, i18n.inputTimeTimeTitle, inputTime );
        addTr( table, i18n.inputTimeTimeZoneLabel, i18n.inputTimeTimeZoneTitle, inputTimeZone );
        addTr( table, i18n.inputTimePrecisionLabel, i18n.inputTimePrecisionTitle, inputPrecision );
        addTr( table, i18n.inputTimeCalendarModelLabel, i18n.inputTimeCalendarModelTitle, inputCalendarModel.select );

        this.setDataValue = function( newDataValue ) {
          inputTime.val( newDataValue.value.time );
          inputTimeZone.val( newDataValue.value.timezone );
          inputPrecision.val( newDataValue.value.precision );
          inputCalendarModel.val( newDataValue.value.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( inputTime.val() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }
          return {
            type: 'time',
            value: {
              time: inputTime.val(),
              timezone: Number( inputTimeZone.val() ),
              precision: Number( inputPrecision.val() ),
              before: 0,
              after: 0,
              calendarmodel: WIKIDATA_URI_PREFIX + inputCalendarModel.val(),
            },
          };
        };
        this.getAsLabel = function() {

          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_time ).text( inputTime.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'time', this.toDataValue(), span );
          return span;
        };

        inputTime.change( changeF );
        inputTime.keyup( changeF );
        inputTimeZone.change( changeF );
        inputTimeZone.keyup( changeF );
        inputPrecision.change( changeF );
        inputPrecision.keyup( changeF );
        inputCalendarModel.select.change( changeF );
        inputCalendarModel.select.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'time-days' ) {
      ( function() {
        const grDays = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'min', '1' ).attr( 'step', '1' ).attr( 'max', '31' ).addClass( styles.wef_time_day )
          .appendTo( this.mainElement ).val( '' );
        const grMonths = $( document.createElement( 'select' ) ).addClass( styles.wef_time_month ).appendTo( this.mainElement );
        CalendarUtils.fillSelectWithMonthes( grMonths );
        const grYears = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).val( '' ).addClass( styles.wef_time_year ).appendTo( this.mainElement );
        const grSpan = $( document.createElement( 'span' ) ).append( grDays, grMonths, grYears );

        const juDays = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'min', '1' ).attr( 'step', '1' ).attr( 'max', '31' ).addClass( styles.wef_time_day )
          .appendTo( this.mainElement ).val( '' );
        const juMonths = $( document.createElement( 'select' ) ).addClass( styles.wef_time_month ).appendTo( this.mainElement );
        CalendarUtils.fillSelectWithMonthes( juMonths );
        const juYears = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).val( '' ).addClass( styles.wef_time_year ).appendTo( this.mainElement );
        const juSpan = $( document.createElement( 'span' ) ).append( juDays, juMonths, juYears );

        const inputCalendarModel = new WEF_ItemSelect();
        inputCalendarModel.select.addClass( styles.wef_time_calendarmodel );
        inputCalendarModel.addOption( CALENDAR_GREGORIAN );
        inputCalendarModel.addOption( CALENDAR_JULIAN );
        inputCalendarModel.val( CALENDAR_GREGORIAN );

        const table = $( document.createElement( 'table' ) ).addClass( styles.wef_time_table ).appendTo( this.mainElement );
        const addTrExt = function( textLabel, labelQId, textTitle, input ) {
          const tr = $( document.createElement( 'tr' ) ).attr( 'title', textTitle ).appendTo( table );
          if ( typeof textLabel !== 'undefined' ) {
            input.uniqueId();
            const th = $( document.createElement( 'th' ) ).appendTo( tr );
            $( document.createElement( 'label' ) ).text( textLabel + ': ' ).attr( 'id', input.attr( 'id' ) ).appendTo( th );
          }
          if ( typeof labelQId !== 'undefined' ) {
            input.uniqueId();
            const th = $( document.createElement( 'th' ) ).appendTo( tr );
            const jLabel = $( document.createElement( 'label' ) ).text( labelQId + ': ' ).attr( 'id', input.attr( 'id' ) ).appendTo( th );
            wef_LabelsCache.getOrQueue( labelQId, function( label, title ) {
              jLabel.text( label + ': ' );
              jLabel.attr( 'title', title );
            } );
          }
          const td = $( document.createElement( 'td' ) ).appendTo( tr );
          if ( typeof textLabel === 'undefined' && typeof labelQId === 'undefined' ) {
            td.attr( 'colspan', 2 );
          }
          td.append( input );
        };

        addTrExt( i18n.inputTimePrecisionLabel, undefined, i18n.inputTimePrecisionTitle, selectDateTimePrecision );
        addTrExt( i18n.inputTimeCalendarModelLabel, undefined, i18n.inputTimeCalendarModelTitle, inputCalendarModel.select );
        addTrExt( undefined, 'Q12138', i18n.inputTimeAsGregorianLabel, grSpan );
        addTrExt( undefined, 'Q11184', i18n.inputTimeAsJulianLabel, juSpan );
        table.appendTo( this.mainElement );

        let inProgress = false;
        const recalculateGregorian = function() {
          if ( inProgress )
            return;
          inProgress = true;
          if ( !ifSpecified( juDays, juMonths, juYears ) ) {
            grDays.val( '' );
            grMonths.val( -1 );
            grYears.val( '' );
          } else {
            const converted = CalendarUtils.convertJulianToGregorian( juYears.val(), juMonths.val(), juDays.val() );
            grDays.val( converted[ 2 ] );
            grMonths.val( converted[ 1 ] );
            grYears.val( converted[ 0 ] );
          }
          inProgress = false;
        };
        const recalculateJulian = function() {
          if ( inProgress )
            return;
          inProgress = true;
          if ( !ifSpecified( grDays, grMonths, grYears ) ) {
            juDays.val( '' );
            juMonths.val( -1 );
            juYears.val( '' );
          } else {
            const converted = CalendarUtils.convertGregorianToJulian( grYears.val(), grMonths.val(), grDays.val() );
            juDays.val( converted[ 2 ] );
            juMonths.val( converted[ 1 ] );
            juYears.val( converted[ 0 ] );
          }
          inProgress = false;
        };

        const ifSpecified = function( days, months, years ) {
          return !WEF_Utils.isEmpty( days.val() ) && Number( days.val() ) !== 0
            && !WEF_Utils.isEmpty( months.val() ) && Number( months.val() ) !== -1 && Number( months.val() ) !== 0
            && !WEF_Utils.isEmpty( years.val() ) && Number( years.val() ) !== 0;
        };

        this.setDataValue = function( newDataValue ) {
          if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }

          inputCalendarModel.val( newDataValue.value.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) );

          let date = CalendarUtils.parseISO8601( newDataValue.value.time );
          if ( isNaN( date ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }
          // TODO: реализовать по-человечески. Временный фикс, см. тему «Формат двойной даты в Викиданных» на ВП:Ф-Т
          if ( newDataValue.switched ) {
            date = new Date( date );
            grYears.val( date.getUTCFullYear() );
            grMonths.val( date.getUTCMonth() + 1 );
            grDays.val( date.getUTCDate() );
            recalculateJulian();
          } else {
            date = new Date( date );
            juYears.val( date.getUTCFullYear() );
            juMonths.val( date.getUTCMonth() + 1 );
            juDays.val( date.getUTCDate() );
            recalculateGregorian();
          }
        };
        this.hasValue = function() {

          return ifSpecified( grDays, grMonths, grYears );
        };
        this.toDataValue = function() {

          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }

          return {
            type: 'time',
            value: {
              time: inputCalendarModel.val() === CALENDAR_GREGORIAN
                ? CalendarUtils.formatDate( grYears.val(), grMonths.val(), grDays.val() )
                : CalendarUtils.formatDate( juYears.val(), juMonths.val(), juDays.val() ),
              timezone: 0,
              precision: PRECISION_DAYS,
              before: 0,
              after: 0,
              calendarmodel: WIKIDATA_URI_PREFIX + inputCalendarModel.val(),
            },
          };
        };
        this.getAsLabel = function() {

          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_time_days ).text(
            juDays.val() + ' ' + mw.config.get( 'wgMonthNames' )[ juMonths.val() ] + ' ' + juYears.val() + ' ( ' + grDays.val() + ' '
                + mw.config.get( 'wgMonthNames' )[ grMonths.val() ] + ' ' + grYears.val() + ' )' );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'time', this.toDataValue(), span );
          return span;
        };

        grDays.change( changeF );
        grDays.keyup( changeF );
        grMonths.change( changeF );
        grMonths.keyup( changeF );
        grYears.change( changeF );
        grYears.keyup( changeF );
        inputCalendarModel.select.change( changeF );
        inputCalendarModel.select.keyup( changeF );

        grDays.change( recalculateJulian );
        grDays.keyup( recalculateJulian );
        grMonths.change( recalculateJulian );
        grMonths.keyup( recalculateJulian );
        grYears.change( recalculateJulian );
        grYears.keyup( recalculateJulian );

        juDays.change( recalculateGregorian );
        juDays.keyup( recalculateGregorian );
        juMonths.change( recalculateGregorian );
        juMonths.keyup( recalculateGregorian );
        juYears.change( recalculateGregorian );
        juYears.keyup( recalculateGregorian );

      } ).call( this );
    } else if ( editorDataType === 'time-days-gregorian' ) {
      ( function() {

        selectDateTimePrecision.appendTo( this.mainElement );

        const days = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'min', '1' ).attr( 'step', '1' ).attr( 'max', '31' ).val( '' ).addClass( styles.wef_time_day ).appendTo( this.mainElement );

        const months = $( document.createElement( 'select' ) ).addClass( styles.wef_time_month ).appendTo( this.mainElement );
        CalendarUtils.fillSelectWithMonthes( months );

        const years = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).val( '' ).addClass( styles.wef_time_year ).appendTo( this.mainElement );

        const showJulianSpan = $( document.createElement( 'span' ) ).addClass( styles.wef_time_oldstyle_span ).appendTo( this.mainElement );

        const showJulianCheckbox = $( document.createElement( 'input' ) ).attr( 'type', 'checkbox' ).addClass( styles.wef_time_oldstyle );
        showJulianCheckbox.attr( 'title', i18n.checkboxShowJulianTitle );
        showJulianCheckbox.uniqueId();
        showJulianCheckbox.change( changeF );
        showJulianCheckbox.keyup( changeF );
        showJulianCheckbox.appendTo( showJulianSpan );

        const afterCalendarModelChange = function() {
          if ( showJulianCheckbox.is( ':checked' ) ) {
            if ( snakValueEditor.hasValue() ) {
            // TODO: реализовать по-человечески. Временный фикс, см. тему «Формат двойной даты в Викиданных» на ВП:Ф-Т
              const tempFixObject = snakValueEditor.toDataValue();
              tempFixObject.switched = true;
              switchDataType( 'time-days', tempFixObject );
            } else {
              switchDataType( 'time-days', undefined );
            }
          }
        };
        showJulianCheckbox.change( afterCalendarModelChange );
        showJulianCheckbox.keyup( afterCalendarModelChange );

        const showJulianCheckboxLabel = $( document.createElement( 'label' ) );
        showJulianCheckboxLabel.attr( 'for', showJulianCheckbox.attr( 'id' ) );
        showJulianCheckboxLabel.attr( 'title', i18n.checkboxShowJulianTitle );
        showJulianCheckboxLabel.text( i18n.checkboxShowJulian );
        showJulianCheckboxLabel.appendTo( showJulianSpan );

        this.setDataValue = function( newDataValue ) {
          if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }

          if ( newDataValue.value.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) !== CALENDAR_GREGORIAN ) {
            switchDataType( 'time-days', newDataValue );
            return;
          }

          let date = CalendarUtils.parseISO8601( newDataValue.value.time );
          if ( isNaN( date ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }
          date = new Date( date );
          years.val( date.getUTCFullYear() );
          months.val( date.getUTCMonth() + 1 );
          days.val( date.getUTCDate() );

          showJulianCheckbox.attr( 'checked', false );
        };
        this.hasValue = function() {

          return !WEF_Utils.isEmpty( days.val() ) && Number( days.val() ) !== 0
            && !WEF_Utils.isEmpty( months.val() ) && Number( months.val() ) !== -1 && Number( months.val() ) !== 0
            && !WEF_Utils.isEmpty( years.val() ) && Number( years.val() ) !== 0;
        };
        this.toDataValue = function() {

          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }

          return {
            type: 'time',
            value: {
              time: CalendarUtils.formatDate( years.val(), months.val(), days.val() ),
              timezone: 0,
              precision: PRECISION_DAYS,
              before: 0,
              after: 0,
              calendarmodel: WIKIDATA_URI_PREFIX + ( showJulianCheckbox.is( ':checked' ) ? CALENDAR_JULIAN : CALENDAR_GREGORIAN ),
            },
          };
        };
        this.getAsLabel = function() {

          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_time_days ).text(
            days.val() + ' ' + mw.config.get( 'wgMonthNames' )[ months.val() ] + ' ' + years.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'time', this.toDataValue(), span );
          return span;
        };

        days.change( changeF );
        days.keyup( changeF );
        months.change( changeF );
        months.keyup( changeF );
        years.change( changeF );
        years.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'time-months' ) {
      ( function() {

        selectDateTimePrecision.appendTo( this.mainElement );

        const months = $( document.createElement( 'select' ) ).addClass( styles.wef_time_month ).appendTo( this.mainElement );
        CalendarUtils.fillSelectWithMonthes( months );

        const years = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).appendTo( this.mainElement );
        this.setDataValue = function( newDataValue ) {
          if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }

          let date = CalendarUtils.parseISO8601( newDataValue.value.time );
          if ( isNaN( date ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }
          date = new Date( date );
          months.val( date.getMonth() + 1 );
          years.val( date.getFullYear() );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( months.val() ) || !WEF_Utils.isEmpty( years.val() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }

          return {
            type: 'time',
            value: {
              time: CalendarUtils.formatDate( years.val(), months.val() ),
              timezone: 0,
              precision: PRECISION_MONTHS,
              before: 0,
              after: 0,
              calendarmodel: WIKIDATA_URI_PREFIX + CALENDAR_GREGORIAN,
            },
          };
        };
        this.getAsLabel = function() {
          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_time_months ).text(
            mw.config.get( 'wgMonthNames' )[ months.val() ] + ' ' + years.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'time', this.toDataValue(), span );
          return span;
        };

        months.change( changeF );
        months.keyup( changeF );
        years.change( changeF );
        years.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'time-years' ) {
      ( function() {

        selectDateTimePrecision.appendTo( this.mainElement );

        const years = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).appendTo( this.mainElement );

        this.setDataValue = function( newDataValue ) {
          if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }

          let date = CalendarUtils.parseISO8601( newDataValue.value.time );
          if ( isNaN( date ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }
          date = new Date( date );
          years.val( date.getFullYear() );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( years.val() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }

          return {
            type: 'time',
            value: {
              time: CalendarUtils.formatDate( years.val() ),
              timezone: 0,
              precision: PRECISION_YEARS,
              before: 0,
              after: 0,
              calendarmodel: WIKIDATA_URI_PREFIX + CALENDAR_GREGORIAN,
            },
          };
        };
        this.getAsLabel = function() {
          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_time_years ).text( years.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'time', this.toDataValue(), span );
          return span;
        };

        years.change( changeF );
        years.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'time-centuries' ) {
      ( function() {

        selectDateTimePrecision.appendTo( this.mainElement );

        const centuries = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).appendTo( this.mainElement );

        this.setDataValue = function( newDataValue ) {
          if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }

          let date = CalendarUtils.parseISO8601( newDataValue.value.time );
          if ( isNaN( date ) ) {
            switchDataType( 'time', newDataValue );
            return;
          }
          date = new Date( date );
          const year = date.getUTCFullYear();
          let century;
          if ( date.getUTCFullYear() < 0 ) {
            century = Math.floor( ( Math.abs( year ) - 1 ) / 100 ) + 1;
          } else {
            century = Math.floor( ( year - 1 ) / 100 ) + 1;
          }
          centuries.val( century );
        };
        this.hasValue = function() {
          return !WEF_Utils.isEmpty( centuries.val() );
        };
        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }

          return {
            type: 'time',
            value: {
              time: CalendarUtils.formatCentury( centuries.val() ),
              timezone: 0,
              precision: PRECISION_CENTURIES,
              before: 0,
              after: 0,
              calendarmodel: WIKIDATA_URI_PREFIX + CALENDAR_GREGORIAN,
            },
          };
        };
        this.getAsLabel = function() {
          const century = centuries.val();
          let str;
          if ( century === 0 ) {
            str = '0';
          } else {
            if ( century < 0 ) {
              str = WEF_Utils.toRoman( Math.abs( century ) ) + ' BC';
            } else {
              str = WEF_Utils.toRoman( century ) + ' AD';
            }
          }
          return $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_time_centuries ).text( str );
        };

        centuries.change( changeF );
        centuries.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'url' ) {
      ( function() {

        const input = $( document.createElement( 'input' ) ).attr( 'type', 'url' ).addClass( styles.wef_url ).appendTo( this.mainElement );
        this.setDataValue = function( newDataValue ) {
          input.val( WEF_Utils.urlNice( newDataValue.value ) );
        };

        try {
          if ( typeof options === 'object' && typeof options.check === 'object' ) {
            input.attr( 'pattern', WEF_Utils.regexpGetHtmlPattern( options.check ) );
          }
        } catch ( err ) {
          mw.log.warn( 'Unable to attach check pattern to input: ' + err );
        }

        this.hasValue = function() {
          return !WEF_Utils.isEmpty( input.val() );
        };

        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }

          return {
            type: 'string',
            value: WEF_Utils.urlUnnice( input.val() ),
          };
        };
        this.getAsLabel = function() {
          const span = $( document.createElement( 'span' ) ).addClass( styles.wef_snak_replacement_label_url ).text( input.val() );
          if ( this.hasValue() )
            WEF_Utils.formatValueRemotely( 'url', this.toDataValue(), span );
          return span;
        };

        input.change( changeF );
        input.keyup( changeF );
      } ).call( this );
    } else if ( editorDataType === 'wikibase-item' ) {
      ( function() {
        const inputClass = $.isEmptyObject( options ) || !$.isFunction( options.inputClass ) ? WEF_ItemInput : options.inputClass;

        const table = $( document.createElement( 'table' ) ).addClass( 'wef_wikibase-item_table' ).appendTo( snakValueEditor.mainElement );
        const tr = $( document.createElement( 'tr' ) ).addClass( 'wef_wikibase-item_tr' ).appendTo( table );
        const input = new inputClass().appendTo( $( document.createElement( 'td' ) ).addClass( 'wef_wikibase-item_td_input' ).appendTo( tr ) );

        this.setDataValue = function( newDataValue ) {
          this.setDataValueImpl( WEF_Utils.getEntityIdFromDatavalue( newDataValue ) );
        };
        this.setDataValueImpl = function( entityId ) {
          input.val( entityId );
        };

        this.hasValue = function() {
          return !WEF_Utils.isEmpty( input.val() );
        };

        this.toDataValue = function() {
          if ( !this.hasValue() ) {
            throw new Error( 'No value' );
          }

          let dataValue;
          if ( !WEF_Utils.isEmpty( input.val() ) )
            dataValue = ModelUtils.newWikibaseItemDataValue( input.val() );
          else
            dataValue = ModelUtils.newWikibaseItemDataValue();

          return dataValue;
        };
        this.getAsLabel = function() {
          const entityId = input.val();
          if ( WEF_Utils.isEmpty( entityId ) ) {
            return $( document.createElement( 'span' ) );
          }

          const result = $( document.createElement( 'span' ) );
          result.text( '(' + entityId + ')' );
          wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
            result.text( label + ' (' + entityId + ')' );
            result.attr( 'title', description );
          } );
          return result;
        };

        /** @type {WEF_SelectEditor} */
        let selectCreateEditor = null;
        let selectEditEditor = null;

        const createOrEditButton = $( document.createElement( 'div' ) )
          .css( 'cursor', 'pointer' )
          .addClass( 'wef_wikibase-item_button' )
          .appendTo(
            $( document.createElement( 'td' ) )
              .addClass( styles.wef_wikibase_item_td_button )
              .addClass( styles.wef_button_cell )
              .appendTo( tr ) );
        createOrEditButton.button( {
          icons: {
            primary: 'ui-icon-pencil'
          },
          text: false,
          label: i18n.buttonCreateOrEdit,
        } );
        $( this ).on( 'change', function() {
          if ( selectCreateEditor != null )
            selectCreateEditor.hide();
          if ( selectEditEditor != null )
            selectEditEditor.hide();
        } );

        createOrEditButton.click( function() {
          const entityId = input.val();
          if ( WEF_Utils.isEmpty( entityId ) ) {
            if ( selectCreateEditor == null ) {
              selectCreateEditor = new WEF_SelectEditor( createOrEditButton, i18n.buttonCreateOrEditPrefixCreate, function( classEntityId, editor ) {
                editor
                  .edit( false, null, classEntityId )
                  .then( function( newEntityId ) {
                    if ( !WEF_Utils.isEmpty( newEntityId ) ) {
                      snakValueEditor.setDataValueImpl( newEntityId );
                    }
                    ApiUtils.purgeAsync();
                  } );
              } );
              selectCreateEditor.show();
            } else {
              selectCreateEditor.toggle();
            }
          } else {
            if ( selectEditEditor == null ) {
              selectEditEditor = new WEF_SelectEditor( createOrEditButton, i18n.buttonCreateOrEditPrefixEdit, function( classEntityId, editor ) {
                editor.edit( false, entityId ).then( () => ApiUtils.purgeAsync() );
              } );
              selectEditEditor.show();
            } else {
              selectEditEditor.toggle();
            }
          }
        } );

        const onWikidata = $( document.createElement( 'a' ) )
          .css( 'cursor', 'pointer' )
          .attr( 'target', '_blank' )
          .addClass( 'wef_wikibase-item_button' )
          .appendTo(
            $( document.createElement( 'td' ) )
              .addClass( styles.wef_wikibase_item_td_button )
              .addClass( styles.wef_button_cell )
              .appendTo( tr ) );
        onWikidata.button( {
          icons: {
            primary: 'ui-icon-extlink'
          },
          text: false,
          label: i18n.buttonOnWikidata,
        } );
        $( this ).on( 'change', function() {
          const entityId = input.val();
          if ( !WEF_Utils.isEmpty( entityId ) ) {
            onWikidata.attr( 'href', '//www.wikidata.org/wiki/' + entityId );
            onWikidata.button( 'enable' );
          } else {
            onWikidata.attr( 'href', '' );
            onWikidata.button( 'disable' );
          }
        } );

        input.change( changeF );
        input.keyup( changeF );
      } ).call( this );
    } else {
      throw new Error( 'Unsupported data type: ' + editorDataType );
    }

    if ( typeof initialDataValue !== 'undefined' ) {
      this.setDataValue( initialDataValue );
    } else {
      changeF();
    }
  }

  hide() {
    this.mainElement.hide();
  }

  show() {
    this.mainElement.show();
  }

}
