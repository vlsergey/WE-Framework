import * as ApiUtils from 'core/ApiUtils';
import * as Shapes from 'model/Shapes';
import React, { PureComponent } from 'react';
import DetailsArea from './DetailsArea';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import PropTypes from 'prop-types';
import styles from './Time.css';

const POPUP_ON_CLICK_FOCUS = [ 'click', 'focus' ];

export default class TimeDataValueEditor extends PureComponent {

  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
  }

  constructor() {
    super( ...arguments );
    const text = ( ( this.props.datavalue || {} ).value || {} ).time || '';
    this.state = {
      ...this.state,
      parsing: false,
      rendering: false,
      error: null,
      text,
      renderedAsHtml: text,
      calendarModel: null,
      precision: null,
    };
    this.wikidataApi = ApiUtils.getWikidataApi();

    this.handleTextChange = this.handleTextChange.bind( this );
    this.handleChangeManualCalendarModel = calendarModel => { this.setState( { calendarModel } ); this.requestParsing( ); };
    this.handleChangeManualPrecision = precision => { this.setState( { precision } ); this.requestParsing( ); };

    this.handleToggleManualCalendarModel = this.handleToggleManualCalendarModel.bind( this );
    this.handleToggleManualPrecision = this.handleToggleManualPrecision.bind( this );

    this.refPopup = React.createRef();
  }

  componentDidMount() {
    this.requestRender( true );
  }

  handleToggleManualCalendarModel() {
    const valueCalendarModel = ( ( this.props.datavalue || {} ).value || {} ).calendarmodel;
    if ( this.state.calendarModel === null && !!valueCalendarModel ) {
      this.setState( { calendarModel: valueCalendarModel } );
    } else {
      this.setState( { calendarModel: null } );
    }
    this.requestParsing( );
  }

  handleToggleManualPrecision() {
    const valuePrecision = ( ( this.props.datavalue || {} ).value || {} ).precision;
    if ( this.state.precision === null && valuePrecision !== null ) {
      this.setState( { precision: valuePrecision } );
    } else {
      this.setState( { precision: null } );
    }
    this.requestParsing( );
  }

  handleTextChange( event ) {
    const value = event.target.value;

    this.setState( { text: value } );
    this.requestParsing( );
  }

  requestParsing( ) {
    // we need to be sure that changes to state are applied
    setTimeout( () => this.requestParsingImpl( ), 0 );
  }

  requestParsingImpl( ) {
    const { datavalue, onDataValueChange } = this.props;
    const value = this.state.text;
    this.setState( { parsing: true } );

    this.wikidataApi.get( {
      action: 'wbparsevalue',
      datatype: 'time',
      values: value,
      options: JSON.stringify( {
        lang: mw.config.get( 'wgUserLanguage' ),
        precision: this.state.precision || undefined,
        calendarmodel: this.state.calendarModel || undefined,
      } ),
    } ).catch( ( code, { error } ) => {
      // are still in sync?
      if ( value !== this.state.text ) return;
      this.setState( { parsing: false, error: error.info } );
      throw new Error( error.info );
    } ).then( response => {
      // are still in sync?
      if ( value !== this.state.text ) return;

      this.setState( { parsing: false, error: null } );
      onDataValueChange( {
        ...datavalue,
        value: response.results.length !== 0 ? response.results[ 0 ].value : null,
        type: 'time',
      } );
      this.requestRender();
    } ).catch( error => {
      mw.warn( 'Unable to parse time value: ' + error );
    } );
  }

  requestRender( renderToText ) {
    // we need to be sure that changes to state are applied
    setTimeout( () => this.requestRenderImpl( renderToText ), 0 );
  }

  requestRenderImpl( renderToText ) {
    const datavalue = this.props.datavalue;
    if ( !this.props.datavalue ) {
      this.setState( { rendering: false, renderedAsHtml: '' } );
      return;
    }

    const parameters = {
      action: 'wbformatvalue',
      datatype: 'time',
      datavalue: JSON.stringify( datavalue ),
      options: JSON.stringify( {
        lang: mw.config.get( 'wgUserLanguage' ),
      } ),
    };

    this.setState( { rendering: true } );
    this.wikidataApi.get( {
      ...parameters,
      generate: 'text/html',
    } ).then( result => {
      this.setState( { rendering: false, renderedAsHtml: result.result } );
    } );

    if ( renderToText ) {
      this.wikidataApi.get( {
        ...parameters,
        generate: 'text/plain',
      } ).then( result => {
        this.setState( { text: result.result } );
      } );
    }
  }

  render() {
    const { datavalue, readOnly } = this.props;
    const { calendarModel,
      // focused,
      parsing, rendering, error, precision, renderedAsHtml, text } = this.state;
    const value = ( datavalue || {} ).value || {};

    if ( readOnly ) {
      if ( rendering ) {
        return <td className={styles.time} colSpan={12} >{text}</td>;
      }
      return <td className={styles.time} colSpan={12} dangerouslySetInnerHTML={{ __html: renderedAsHtml }} />;
    }

    const input = <input
      onChange={this.handleTextChange}
      onKeyDown={this.handleKeyDown}
      value={text} />;

    const details = <DetailsArea
      error={error}
      manualCalendarModel={calendarModel}
      manualPrecision={precision}
      onManualCalendarModelChange={this.handleChangeManualCalendarModel}
      onManualCalendarModelToggle={this.handleToggleManualCalendarModel}
      onManualPrecisionChange={this.handleChangeManualPrecision}
      onManualPrecisionToggle={this.handleToggleManualPrecision}
      parsedCalendarModel={value.calendarmodel}
      parsedPrecision={value.precision}
      preview={renderedAsHtml}
      spinner={parsing || rendering} />;

    // closeOnTriggerBlur={false}

    return <td className={styles.time} colSpan={12}>
      <Popup
        className={styles.timeDetailsPopup}
        closeOnTriggerClick={false}
        hoverable
        on={POPUP_ON_CLICK_FOCUS}
        position="bottom left"
        trigger={input}
        wide={false}>
        {details}
      </Popup>
    </td>;
  }
}
