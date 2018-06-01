import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class ButtonCell extends PureComponent {

  render() {
    return <td className={styles.wef_button_cell}>{this.props.children}</td>;
  }
}

ButtonCell.propTypes = {
  children: PropTypes.node,
};
