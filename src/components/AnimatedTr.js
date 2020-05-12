// @flow

import React, { PureComponent } from 'react';
import animations from './animations.css';

type PropsType = {
  children : any,
  className? : ?string,
};

export default class AnimatedTr extends PureComponent<PropsType> {
  render() {
    const { children, className, ...etc } = this.props;

    const resultClassName = className
      ? className + ' ' + animations.animatedFateIn
      : animations.animatedFateIn;
    return <tr {...etc} className={resultClassName}>
      {children}
    </tr>;
  }
}
