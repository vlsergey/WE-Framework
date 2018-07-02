import React, { PureComponent } from 'react';
import i18n from './core.i18n';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class SnakTypeSelect extends PureComponent {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'value',
  };

  constructor() {
    super( ...arguments );
    this.ref = React.createRef();
    this.handleChange = this.handleChange.bind( this );
  }

  componentDidMount() {
    this.ref.current.focus();
  }

  handleChange( event ) {
    this.props.onChange( this.ref.current.value );
    event.stopPropagation();
  }

  render() {
    /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, value, ...other } = this.props;

    return <select
      className={styles[ 'wef-snaktypeselector-menu' ]}
      onChange={this.handleChange}
      ref={this.ref}
      size={3}
      value={value}
      {...other}>
      <option
        title={i18n.snakTypeTitle.value}
        value='value'>{i18n.snakType.value}</option>
      <option
        title={i18n.snakTypeTitle.novalue}
        value='novalue'>{i18n.snakType.novalue}</option>
      <option
        title={i18n.snakTypeTitle.somevalue}
        value='somevalue'>{i18n.snakType.somevalue}</option>
    </select>;
  }
}
