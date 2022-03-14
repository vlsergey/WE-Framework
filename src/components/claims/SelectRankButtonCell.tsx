import React, {PureComponent} from 'react';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import ButtonCell from '../ButtonCell';
import i18n from '../core.i18n';
import RankSelect from './RankSelect';
import styles from './SelectRankButtonCell.css';

const ICONS: {[rank in RankType]: string} = Object.freeze({
  preferred: 'ui-icon-arrowthickstop-1-n',
  normal: 'ui-icon-arrowthick-2-n-s',
  deprecated: 'ui-icon-arrowthickstop-1-s',
});

interface PropsType {
  disabled: boolean;
  onChange: (value: RankType) => any;
  value: RankType;
}

export default class SelectRankButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
    value: 'normal',
  };

  handleChange = (value: RankType) => {
    if (value !== this.props.value) {
      const {onChange} = this.props;
      if (onChange)
        onChange(value);
    }
  };

  override render () {
    const {disabled, value} = this.props;

    return <ButtonCell
      disabled={disabled}
      icon={ICONS[value]}
      label={i18n.rank[value]}>{ (children: any) => <Popup
        basic
        className={styles.selectRankPopup}
        hoverable
        on="click"
        position="bottom left"
        trigger={children}
        verticalOffset={-10}
        wide={false}>
        <RankSelect
          onChange={this.handleChange}
          value={value} />
      </Popup>}</ButtonCell>;
  }

}
