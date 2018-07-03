import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';
import PropTypes from 'prop-types';

const NOOP = () => {};

export default class GoToUrlButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    href: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    href: null,
  };

  render() {
    const { disabled, href } = this.props;

    return <ButtonCell
      disabled={disabled || !href}
      icon="ui-icon-extlink"
      label={i18n.buttonUrlNavigate}
      onClick={NOOP}>
      { children => <a href={href ? href : '#'}
        rel="noopener noreferrer"
        target="_blank">{children}</a>}
    </ButtonCell>;
  }

}
