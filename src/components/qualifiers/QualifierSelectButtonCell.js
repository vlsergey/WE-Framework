// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from './i18n';
import PropTypes from 'prop-types';

export default class QualifierSelectButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { disabled, onClick } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon="ui-icon-tag"
      label={i18n.buttonAddQualifier}
      onClick={onClick} />;
  }

}
