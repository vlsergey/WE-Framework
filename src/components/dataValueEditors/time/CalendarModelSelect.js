// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import { CALENDAR_MODELS } from './model';
import i18n from './i18n';
import styles from './Time.css';

const EMPTY_STRING : string = '';

type PropsType = {
  onChange : string => any,
  readOnly? : ?boolean,
  value : string,
};

export default class CalendarModelSelect extends PureComponent<PropsType> {

  @boundMethod
  handleChange( event : SyntheticEvent< HTMLSelectElement > ) {
    this.props.onChange( event.currentTarget.value );
    event.stopPropagation();
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, readOnly, value, ...etc } = this.props;

    return <select
      {...etc}
      className={styles.calendarModelSelect}
      disabled={readOnly}
      onChange={this.handleChange}
      value={value || EMPTY_STRING}>
      { CALENDAR_MODELS.map( calendarModel =>
        <option key={calendarModel} value={calendarModel}>
          {i18n.calendarModel[ calendarModel ]}
        </option> ) }
    </select>;
  }
}
