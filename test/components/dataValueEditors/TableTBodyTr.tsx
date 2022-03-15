import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

export default class TableTBodyTr extends PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  override render () {
    const {children} = this.props;

    return <table>
      <tbody>
        <tr>
          {children}
        </tr>
      </tbody>
    </table>;
  }
}
