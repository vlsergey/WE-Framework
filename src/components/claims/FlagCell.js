// @flow

import React, { PureComponent } from 'react';
import FlagImageHtmlProvider from 'caches/FlagImageHtmlProvider';
import styles from './FlagCell.css';

type PropsType = {
  flagImage : ?string
};

export default class FlagCell extends PureComponent<PropsType> {

  render() {
    const { flagImage } = this.props;
    if ( !flagImage ) {
      return <td className={styles.wef_flag_cell} />;
    }

    return <td className={styles.wef_flag_cell}>
      <FlagImageHtmlProvider fileName={flagImage}>
        {flagImageHtml => flagImage
          ? <div dangerouslySetInnerHTML={{ __html: flagImageHtml }} />
          : null }
      </FlagImageHtmlProvider>
    </td>;
  }
}
