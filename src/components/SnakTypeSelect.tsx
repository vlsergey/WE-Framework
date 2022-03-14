import React, {ChangeEvent, PureComponent} from 'react';

import i18n from './core.i18n';
import styles from './SnakTypeSelect.css';

interface PropsType {
  onChange: (value: SnakTypeType) => any;
  value: SnakTypeType;
}

export default class SnakTypeSelect extends PureComponent<PropsType> {

  static defaultProps = {
    value: 'value',
  };

  ref = React.createRef< HTMLSelectElement >();

  override componentDidMount () {
    if (this.ref.current) {
      this.ref.current.focus();
    }
  }

  handleChange = (event: ChangeEvent< HTMLSelectElement >) => {
    const snakType = event.currentTarget.value as SnakTypeType;
    this.props.onChange(snakType);
    event.stopPropagation();
  };

  override render () {
    const {onChange, value, ...etc} = this.props;

    return <select
      {...etc}
      className={styles.select}
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
