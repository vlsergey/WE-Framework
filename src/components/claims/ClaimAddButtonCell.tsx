import React from 'react';

import ButtonCell from '../ButtonCell';
import i18n from '../core.i18n';

interface PropsType {
  disabled?: boolean;
  onClick: () => unknown;
}

const ClaimAddButtonCell = ({disabled, onClick}: PropsType) =>
  <ButtonCell
    disabled={disabled}
    icon="ui-icon-plus"
    label={i18n.buttonAddClaim}
    onClick={onClick} />;

export default React.memo(ClaimAddButtonCell);
