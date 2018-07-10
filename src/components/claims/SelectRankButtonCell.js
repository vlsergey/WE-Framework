import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import RankSelect from './RankSelect';
import styles from 'components/core.css';

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

    this.state = {
      open: false,
    };

    this.handleClick = () => this.setState( state => ( { open: !state.open } ) );
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( value ) {
    this.setState( {
      open: false,
    } );

    if ( value !== this.props.value ) {
      const { onChange } = this.props;
      if ( onChange )
        onChange( ...arguments );
    }
  }

  render() {
    const { disabled, value } = this.props;

    return <ButtonCell
      className={styles.wef_select_rank_button}
      disabled={disabled}
      icon={icons[ value ]}
      label={i18n.rank[ value ]}
      onClick={this.handleClick}
      text={false}>{ children => <Popup
        arrow={false}
        contentStyle={{ padding: 0 }}
        open={this.state.open}
        position="bottom left"
        trigger={children}>
        <RankSelect
          onChange={this.handleChange}
          value={value} />
      </Popup>}</ButtonCell>;
  }

}
