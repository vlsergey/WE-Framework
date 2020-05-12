// @flow

import { DEFAULT_CALENDAR_MODEL, DEFAULT_PRECISION } from './model';
import React, { PureComponent } from 'react';
import CalendarModelSelect from './CalendarModelSelect';
import i18n from './i18n';
import PrecisionSelect from './PrecisionSelect';
import Spinner from 'components/Spinner';
import styles from './Time.css';

type PropsType = {
  error : ?string,
  manualCalendarModel : ?string,
  manualPrecision : ?number,
  onManualCalendarModelChange : any => any,
  onManualCalendarModelToggle : any => any,
  onManualPrecisionChange : any => any,
  onManualPrecisionToggle : any => any,
  parsedCalendarModel : ?string,
  parsedPrecision : ?number,
  preview : ?string,
  spinner : boolean,
};

export default class DetailsArea extends PureComponent<PropsType> {

  render() {
    const { spinner, error, preview,
      manualCalendarModel, manualPrecision,
      parsedCalendarModel, parsedPrecision,
      onManualCalendarModelToggle, onManualPrecisionToggle,
      onManualCalendarModelChange, onManualPrecisionChange,
    } = this.props;

    // we need tabindex thus popup will be able to stay open when clicked on DetailsArea
    return <table className={styles.timeDetails + ' ui-widget'} tabIndex={0}>
      <tbody>
        <tr>
          <th colSpan={3}>
            {i18n.labelWillBeDisplayedAs}
          </th>
        </tr>
        <tr>
          <td className={styles.timeRendered} colSpan={3}>{
            spinner
              ? <Spinner size={15} />
              : error
                ? <span className={styles.timeError}>{error}</span>
                : <span dangerouslySetInnerHTML={{ __html: preview }} />
          }</td>
        </tr>
        <tr>
          <th>{i18n.labelPrecision}</th>
          <td>
            <PrecisionSelect
              onChange={onManualPrecisionChange}
              readOnly={manualPrecision == null}
              value={manualPrecision || parsedPrecision || DEFAULT_PRECISION} />
          </td>
          <td>
            <label>
              <input
                checked={manualPrecision !== null}
                onChange={onManualPrecisionToggle}
                type="checkbox" />
              {i18n.labelSetManually}
            </label>
          </td>
        </tr>
        <tr>
          <th>{i18n.labelCalendar}</th>
          <td>
            <CalendarModelSelect
              onChange={onManualCalendarModelChange}
              readOnly={manualCalendarModel == null}
              value={manualCalendarModel || parsedCalendarModel || DEFAULT_CALENDAR_MODEL} />
          </td>
          <td>
            <label>
              <input
                checked={manualCalendarModel !== null}
                onChange={onManualCalendarModelToggle}
                type="checkbox" />
              {i18n.labelSetManually}
            </label>
          </td>
        </tr>
      </tbody>
    </table>;
  }

}
