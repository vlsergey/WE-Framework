import React, {PureComponent} from 'react';

import ButtonCell from '../../ButtonCell';
import i18n from '../../core.i18n';

const NOOP = () => {};

interface PropsType {
  disabled?: boolean;
  entityId: null | string;
}

const WIKIDATA_LINK_URL = '//www.wikidata.org/wiki/';

export default class GoToWikidataButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
    entityId: null,
  };

  override render () {
    const {disabled, entityId} = this.props;

    return <ButtonCell
      disabled={disabled || !entityId}
      icon="ui-icon-extlink"
      label={i18n.buttonOnWikidata}
      onClick={NOOP}>{ (children: any) => <a href={entityId ? WIKIDATA_LINK_URL + entityId : '#'}
        rel="noopener noreferrer"
        target="_blank">{children}</a> }</ButtonCell>;
  }

}
