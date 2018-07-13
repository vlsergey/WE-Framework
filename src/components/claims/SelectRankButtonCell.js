import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import PropTypes from 'prop-types';
import RankSelect from './RankSelect';
import styles from './SelectRankButtonCell.css';

const icons = {
  preferred: 'ui-icon-arrowthickstop-1-n',
  normal: 'ui-icon-arrowthick-2-n-s',
  deprecated: 'ui-icon-arrowthickstop-1-s',
};

export default class SelectRankButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOf( [ 'deprecated', 'normal', 'preferred' ] ),
  };

  static defaultProps = {
    disabled: false,
    value: 'value',
  };

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( value ) {
    if ( value !== this.props.value ) {
      const { onChange } = this.props;
      if ( onChange )
        onChange( ...arguments );
    }
  }

  render() {
    const { disabled, value } = this.props;

    return <ButtonCell
      className={styles.selectRankButtonCell}
      disabled={disabled}
      icon={icons[ value ]}
      label={i18n.rank[ value ]}
      onClick={this.handleClick}
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
