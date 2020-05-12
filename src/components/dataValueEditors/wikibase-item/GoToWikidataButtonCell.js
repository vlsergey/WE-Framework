// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';

const NOOP = () => {};

type PropsType = {
  disabled : boolean,
  entityId : ?string,
};

const WIKIDATA_LINK_URL : string = '//www.wikidata.org/wiki/';

export default class GoToWikidataButtonCell extends PureComponent<PropsType> {

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
      onClick={NOOP}>{ children => <a href={entityId ? WIKIDATA_LINK_URL + entityId : '#'}
        rel="noopener noreferrer"
        target="_blank">{children}</a> }</ButtonCell>;
  }

}
