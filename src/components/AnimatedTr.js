import { animated, Spring } from 'react-spring';
import PropTypes from 'prop-types';
import React from 'react';

const AnimatedTr = ( { children } ) => typeof requestAnimationFrame === 'function'
  ? <Spring from={{ opacity: 0 }} native to={{ opacity: 1 }}>
    {props =>
      <animated.tr style={props}>
        {children}
      </animated.tr>
    }
  </Spring>
  : <tr>{children}</tr>;

AnimatedTr.propTypes = {
  children: PropTypes.node,
};

export default AnimatedTr;
