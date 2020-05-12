// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from './i18n';

type PropsType = {
  disabled? : ?boolean,
  href? : ?string,
};

export default class GoToUrlButtonCell extends PureComponent<PropsType> {

  render() {
    const { disabled, href } = this.props;

    return <ButtonCell
      disabled={disabled || !href}
      icon="ui-icon-extlink"
      label={i18n.buttonUrlNavigate}>
      { children => <a href={href ? href : '#'}
        rel="noopener noreferrer"
        target="_blank">{children}</a>}
    </ButtonCell>;
  }

}
