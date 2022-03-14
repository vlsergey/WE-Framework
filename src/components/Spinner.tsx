import React, { PureComponent } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

type PropsType = {
  size : number,
};

export default class Spinner extends PureComponent<PropsType> {

  static defaultProps = {
    size: 50,
  };

  override render() {
    const { size, ...etc } = this.props;
    return <ClipLoader {...etc} size={size / 1.4} />;
  }
}
