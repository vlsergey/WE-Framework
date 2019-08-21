import React, { PureComponent } from 'react';
import { CALENDAR_MODELS } from './model';
import i18n from './i18n';
import PropTypes from 'prop-types';
import styles from './Time.css';

const EMPTY_STRING = '';

export default class CalendarModelSelect extends PureComponent {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    readOnly: PropTypes.bool.isRequired,
  };

  constructor() {
    super( ...arguments );
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    this.props.onChange( event.target.value );
    event.stopPropagation();
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, readOnly, value, ...other } = this.props;

    return <select
      className={styles.calendarModelSelect}
      disabled={readOnly}
      onChange={this.handleChange}
      value={value || EMPTY_STRING}
      {...other}>
      { CALENDAR_MODELS.map( calendarModel =>
        <option key={calendarModel} value={calendarModel}>
          {i18n.calendarModel[ calendarModel ]}
        </option> ) }
    </select>;
  }
}
