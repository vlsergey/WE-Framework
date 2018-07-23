import React, { PureComponent } from 'react';
import ClipLoader from 'react-spinners/dist/spinners/ClipLoader';
import PropTypes from 'prop-types';

export default class Spinner extends PureComponent {

  static propTypes = {
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 50,
  }

  render() {
    const { size, ...other } = this.props;
    return <ClipLoader size={size / 1.4} {...other} />;
  }
}
