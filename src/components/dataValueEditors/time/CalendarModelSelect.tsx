import React, {ChangeEvent, PureComponent} from 'react';

import i18n from './i18n';
import {CALENDAR_MODELS} from './model';

const EMPTY_STRING = '';

interface PropsType {
  onChange: (value: string) => any;
  readOnly?: boolean;
  value: null | string;
}

export default class CalendarModelSelect extends PureComponent<PropsType> {

  handleChange = (event: ChangeEvent< HTMLSelectElement >) => {
    this.props.onChange(event.currentTarget.value);
    event.stopPropagation();
  };

  override render () {
    const {onChange, readOnly, value, ...etc} = this.props;

    return <select
      {...etc}
      disabled={readOnly}
      onChange={this.handleChange}
      value={value || EMPTY_STRING}>
      { CALENDAR_MODELS.map(calendarModel =>
        <option key={calendarModel} value={calendarModel}>
          {i18n.calendarModel[calendarModel]}
        </option>) }
    </select>;
  }
}
