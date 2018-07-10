import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TableTBodyTr extends PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;

    return <table>
      <tbody>
        <tr>
          {children}
        </tr>
      </tbody>
    </table>;
  }
}
