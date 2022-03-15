import React from 'react';

import ButtonCell from '../../ButtonCell';
import i18n from '../../core.i18n';

interface PropsType {
  disabled?: boolean;
  entityId: null | string;
}

const WIKIDATA_LINK_URL = '//www.wikidata.org/wiki/';

const GoToWikidataButtonCell = ({
  disabled,
  entityId,
}: PropsType) => <ButtonCell
  disabled={disabled || !entityId}
  icon="ui-icon-extlink"
  label={i18n.buttonOnWikidata}>
  { (children: any) => <a href={entityId ? WIKIDATA_LINK_URL + entityId : '#'}
    rel="noopener noreferrer"
    target="_blank">{children}</a> }
</ButtonCell>;

export default React.memo(GoToWikidataButtonCell);
