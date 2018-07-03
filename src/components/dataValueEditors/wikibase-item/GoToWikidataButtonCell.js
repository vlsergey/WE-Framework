import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';
import PropTypes from 'prop-types';

const NOOP = () => {};

export default class GoToWikidataButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    entityId: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    entityId: null,
  };

  render() {
    const { disabled, entityId } = this.props;

    return <ButtonCell
      disabled={disabled || !entityId}
      icon="ui-icon-extlink"
      label={i18n.buttonOnWikidata}
      onClick={NOOP}>{ children => <a href={entityId ? '//www.wikidata.org/wiki/' + entityId : '#'}
        rel="noopener noreferrer"
        target="_blank">{children}</a> }</ButtonCell>;
  }

}
