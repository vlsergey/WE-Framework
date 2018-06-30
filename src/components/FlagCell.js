import React, { Component } from 'react';
import FlagImageHtmlProvider from 'caches/FlagImageHtmlProvider';
import PropTypes from 'prop-types';
import styles from './FlagCell.css';

export default class FlagCell extends Component {

  static propTypes = {
    flagImage: PropTypes.string,
  };

  render() {
    const { flagImage } = this.props;
    if ( !flagImage )
      return <td className={styles.wef_flag_cell}></td>;

    return <td className={styles.wef_flag_cell}>
      <FlagImageHtmlProvider fileName={flagImage}>
        {flagImageHtml => flagImage
          ? <div dangerouslySetInnerHTML={{ __html: flagImageHtml }} />
          : null }
      </FlagImageHtmlProvider>
    </td>;
  }
}
