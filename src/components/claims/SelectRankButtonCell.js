// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import RankSelect from './RankSelect';
import styles from './SelectRankButtonCell.css';

const ICONS : { [RankType] : string } = Object.freeze( {
  preferred: 'ui-icon-arrowthickstop-1-n',
  normal: 'ui-icon-arrowthick-2-n-s',
  deprecated: 'ui-icon-arrowthickstop-1-s',
} );

type PropsType = {
  disabled : boolean,
  onChange : RankType => any,
  value : RankType,
};

export default class SelectRankButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
    value: 'normal',
  };

  @boundMethod
  handleChange( value : RankType ) {
    if ( value !== this.props.value ) {
      const { onChange } = this.props;
      if ( onChange )
        onChange( value );
    }
  }

  render() {
    const { disabled, value } = this.props;

    return <ButtonCell
      className={styles.selectRankButtonCell}
      disabled={disabled}
      icon={ICONS[ value ]}
      label={i18n.rank[ value ]}
      text={false}>{ children => <Popup
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
