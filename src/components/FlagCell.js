import React, { Component } from 'react';
import flags from '../utils/flags';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class FlagCell extends Component {

  render() {
    const { code } = this.props;
    const flagHtml = flags[ code ];
    if ( !flagHtml )
      return <td className={styles.wef_property_editor_flag}></td>;

    return <td className={styles.wef_property_editor_flag} dangerouslySetInnerHTML={{ ___html: flagHtml }}></td>;
  }
}

FlagCell.propTypes = {
  code: PropTypes.string,
};
