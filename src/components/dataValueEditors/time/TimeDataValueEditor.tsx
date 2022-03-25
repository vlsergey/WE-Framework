import React, {ChangeEvent, ComponentProps, PureComponent} from 'react';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import * as ApiUtils from '../../../core/ApiUtils';
import DetailsArea from './DetailsArea';
import styles from './Time.css';

const POPUP_ON_CLICK_FOCUS: ComponentProps<typeof Popup>['on'] = ['click', 'focus'];

interface PropsType {
  datavalue: TimeDataValue | null;
  onDataValueChange: (datavalue: TimeDataValue | null) => any;
  readOnly?: boolean;
}

interface StateType {
  calendarModel: string | null;
  error: string | null;
  parsing: boolean;
  precision: number | null;
  renderedAsHtml: string;
  rendering: boolean;
  text: string | null;
}

export default class TimeDataValueEditor
  extends PureComponent<PropsType, StateType> {

  wikidataApi = ApiUtils.getWikidataApi();

  constructor (props: PropsType) {
    super(props);
    const text = ((this.props.datavalue || {}).value || {}).time || '';

    this.state = {
      parsing: false,
      rendering: false,
      error: null,
      text,
      renderedAsHtml: text,
      calendarModel: null,
      precision: null,
    };
  }

  override componentDidMount () {
    this.requestRender(true);
  }

  handleChangeManualCalendarModel = (calendarModel: null | string) => {
    this.setState({calendarModel});
    this.requestParsing();
  };

  handleChangeManualPrecision = (precision: number | null) => {
    this.setState({precision});
    this.requestParsing();
  };

  handleToggleManualCalendarModel = () => {
    const valueCalendarModel = ((this.props.datavalue || {}).value || {}).calendarmodel;
    if (this.state.calendarModel === null && !!valueCalendarModel) {
      this.setState({calendarModel: valueCalendarModel});
    } else {
      this.setState({calendarModel: null});
    }
    this.requestParsing();
  };

  handleToggleManualPrecision = () => {
    const valuePrecision = ((this.props.datavalue || {}).value || {}).precision;
    if (this.state.precision === null && valuePrecision !== null) {
      this.setState({precision: valuePrecision || null});
    } else {
      this.setState({precision: null});
    }
    this.requestParsing();
  };

  handleTextChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    this.setState({text: value});
    this.requestParsing();
  };

  requestParsing () {
    // we need to be sure that changes to state are applied
    setTimeout(() => { this.requestParsingImpl(); }, 0);
  }

  requestParsingImpl () {
    const {datavalue, onDataValueChange} = this.props;
    const value = this.state.text;
    this.setState({parsing: true});

    this.wikidataApi.get({
      action: 'wbparsevalue',
      datatype: 'time',
      values: value,
      options: JSON.stringify({
        lang: mw.config.get('wgUserLanguage'),
        precision: this.state.precision || undefined,
        calendar: this.state.calendarModel || undefined,
      }),
    }).catch((_code: string, {error}: {error: {info: string}}) => {
      // are still in sync?
      if (value !== this.state.text) return;
      this.setState({parsing: false, error: error.info});
      throw new Error(error.info);
    }).then((response: WbParseValueActionResult<TimeValue>) => {
      // are still in sync?
      if (value !== this.state.text) return;

      this.setState({parsing: false, error: null});
      onDataValueChange({
        ...datavalue,
        value: response.results.length !== 0 ? response.results[0]!.value : null,
        type: 'time',
      });
      this.requestRender(false);
    }).catch((error: any) => {
      mw.log.warn('Unable to parse time value: ' + error);
    });
  }

  requestRender (renderToText: boolean) {
    // we need to be sure that changes to state are applied
    setTimeout(() => { this.requestRenderImpl(renderToText); }, 0);
  }

  requestRenderImpl (renderToText: boolean) {
    const {datavalue} = this.props;
    if (!this.props.datavalue) {
      this.setState({rendering: false, renderedAsHtml: ''});
      return;
    }

    const parameters = {
      action: 'wbformatvalue',
      datatype: 'time',
      datavalue: JSON.stringify(datavalue),
      options: JSON.stringify({
        lang: mw.config.get('wgUserLanguage'),
      }),
    };

    this.setState({rendering: true});
    this.wikidataApi.get({
      ...parameters,
      generate: 'text/html',
    }).then((result: any) => {
      this.setState({rendering: false, renderedAsHtml: result.result});
    });

    if (renderToText) {
      this.wikidataApi.get({
        ...parameters,
        generate: 'text/plain',
      }).then((result: any) => {
        this.setState({text: result.result});
      });
    }
  }

  override render () {
    const {datavalue, readOnly} = this.props;
    const {calendarModel,
      // focused,
      parsing, rendering, error, precision, renderedAsHtml, text} = this.state;
    const value = datavalue?.value;

    if (readOnly) {
      if (rendering) {
        return <td className={styles.time} colSpan={12}>{text}</td>;
      }
      return <td className={styles.time} colSpan={12} dangerouslySetInnerHTML={{__html: renderedAsHtml}} />;
    }

    const input = <input
      onChange={this.handleTextChange}
      value={text || ''} />;

    const details = <DetailsArea
      error={error}
      manualCalendarModel={calendarModel}
      manualPrecision={precision}
      onManualCalendarModelChange={this.handleChangeManualCalendarModel}
      onManualCalendarModelToggle={this.handleToggleManualCalendarModel}
      onManualPrecisionChange={this.handleChangeManualPrecision}
      onManualPrecisionToggle={this.handleToggleManualPrecision}
      parsedCalendarModel={value?.calendarmodel}
      parsedPrecision={value?.precision}
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
