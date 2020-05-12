// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import i18n from './core.i18n';
import styles from './core.css';

type PropsType = {
  onChange : SnakTypeType => any,
  value : SnakTypeType,
};

export default class SnakTypeSelect extends PureComponent<PropsType> {

  static defaultProps = {
    value: 'value',
  };

  ref : ReactObjRef< HTMLSelectElement > = React.createRef();

  componentDidMount() {
    if ( this.ref.current ) {
      this.ref.current.focus();
    }
  }

  @boundMethod
  handleChange( event : SyntheticEvent< HTMLSelectElement > ) {
    // $FlowFixMe
    const snakType : SnakTypeType = event.currentTarget.value;
    this.props.onChange( snakType );
    event.stopPropagation();
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, value, ...etc } = this.props;

    return <select
      {...etc}
      className={styles[ 'wef-snaktypeselector-menu' ]}
      onChange={this.handleChange}
      size={3}
      value={value}>
      <option
        title={i18n.snakTypeTitle.value}
        value="value">{i18n.snakType.value}</option>
      <option
        title={i18n.snakTypeTitle.somevalue}
        value="somevalue">{i18n.snakType.somevalue}</option>
      <option
        title={i18n.snakTypeTitle.novalue}
        value="novalue">{i18n.snakType.novalue}</option>
    </select>;
  }
}
