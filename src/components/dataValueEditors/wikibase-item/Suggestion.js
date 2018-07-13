import React, { PureComponent } from 'react';
import dataTypeStyles from './WikibaseItem.css';
import EntityDescription from 'caches/EntityDescription';
import EntityLabel from 'caches/EntityLabel';
import MediawikiPreview from 'components/MediawikiPreview';
import PropTypes from 'prop-types';

export default class Suggestion extends PureComponent {

  static propTypes = {
    entityId: PropTypes.string.isRequired,
  }

  render() {
    const { entityId } = this.props;

    const wikitext = '{{#if:{{#property:P18|from=' + entityId + '}}|[[File:{{#property:P18|from=' + entityId + '}}|45x45px|frameless|link=]]}}';
    return <table className={dataTypeStyles.suggestionContainer}>
      <tbody>
        <tr>
          <td className={dataTypeStyles.suggestionImage}>
            <MediawikiPreview spinnerSize={35} wikitext={wikitext} />
          </td>
          <td className={dataTypeStyles.suggestionText}>
            <span className={dataTypeStyles.suggestionLabel}>&nbsp;&nbsp;<EntityLabel entityId={entityId} /></span>
            <br />
            <span className={dataTypeStyles.suggestionDescription}>&nbsp;&nbsp;<EntityDescription entityId={entityId} /></span>
          </td>
        </tr>
      </tbody>
    </table>;
  }
}
