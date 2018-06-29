import React, { Component } from 'react';
import MediawikiPreview from 'components/MediawikiPreview';
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
      <MediawikiPreview spinnerSize={22} wikitext={'[[File:' + flagImage + '|22x22px|frameless]]'} />
    </td>;
  }
}
