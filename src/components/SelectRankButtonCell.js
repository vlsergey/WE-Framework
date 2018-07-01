import React, { Component } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import JQueryButton from 'wrappers/JQueryButton';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import RankSelect from './RankSelect';
import styles from './core.css';

const icons = {
  preferred: 'ui-icon-arrowthickstop-1-n',
  normal: 'ui-icon-arrowthick-2-n-s',
  deprecated: 'ui-icon-arrowthickstop-1-s',
};

export default class SelectRankButtonCell extends Component {

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
    this.handleClick = this.handleClick.bind( this );
    this.handleChange = this.handleChange.bind( this );

    this.state = {
      open: false,
    };
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

  handleClick() {
    this.setState( {
      open: !this.state.open,
    } );
  }

  render() {
    const { disabled, value } = this.props;

    return <ButtonCell>
      <Popup
        arrow={false}
        contentStyle={{ padding: 0 }}
        open={this.state.open}
        position="bottom left"
        trigger={
          <JQueryButton
            className={styles.wef_select_rank_button}
            disabled={disabled}
            icon={icons[ value ]}
            label={i18n.rank[ value ]}
            onClick={this.handleClick}
            ref={this.ref}
            text={false} />
        }>
        <RankSelect
          onChange={this.handleChange}
          value={value} />
      </Popup>
    </ButtonCell>;
  }

}
