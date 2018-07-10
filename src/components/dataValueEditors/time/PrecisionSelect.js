import React, { PureComponent } from 'react';
import i18n from './i18n';
import PropTypes from 'prop-types';
import styles from './Time.css';

const EMPTY_STRING = '';

export default class PrecisionSelect extends PureComponent {

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
    this.props.onChange( Number( event.target.value ) );
    event.stopPropagation();
  }

  render() {
    /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, readOnly, value, ...other } = this.props;

    return <select
      className={styles.precisionSelect}
      disabled={readOnly}
      onChange={this.handleChange}
      value={value || EMPTY_STRING}
      {...other}>
      {[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ].map( precision =>
        <option key={precision} value={precision}>{i18n.precision[ precision ]}</option>
      )}
    </select>;
  }
}
