// @flow

import React, { PureComponent } from 'react';
import EntityDescription from 'caches/EntityDescription';
import EntityLabel from 'caches/EntityLabel';
import MediawikiPreview from 'components/MediawikiPreview';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Suggestion extends PureComponent {

  static propTypes = {
    entityId: PropTypes.string.isRequired,
  };

  render() {
    const { entityId } = this.props;

    const wikitext = '{{#if:{{#property:P18|from=' + entityId + '}}|[[File:{{#property:P18|from=' + entityId + '}}|45x45px|frameless|link=]]}}';
    return <table className={styles.suggestionContainer}>
      <tbody>
        <tr>
          <td className={styles.suggestionImage}>
            <MediawikiPreview spinnerSize={35} wikitext={wikitext} />
          </td>
          <td className={styles.suggestionText}>
            <span className={styles.suggestionLabel}>&nbsp;&nbsp;<EntityLabel entityId={entityId} /></span>
            <br />
            <span className={styles.suggestionDescription}>&nbsp;&nbsp;<EntityDescription entityId={entityId} /></span>
          </td>
        </tr>
      </tbody>
    </table>;
  }
}
