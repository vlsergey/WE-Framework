import animations from './animations.css';
import PropTypes from 'prop-types';
import React from 'react';

const AnimatedTr = ( { children, className, ...etc } ) => {
  const resultClassName = className
    ? className + ' ' + animations.animatedFateIn
    : animations.animatedFateIn;
  return <tr className={resultClassName} {...etc}>{children}</tr>;
};

AnimatedTr.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default AnimatedTr;
