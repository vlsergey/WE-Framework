import React from 'react';

import ButtonCell from '../ButtonCell';
import i18n from './i18n';

interface PropsType {
  disabled?: boolean;
  onClick: () => unknown;
}

const SnakAddButtonCell = ({
  disabled = false,
  onClick
}: PropsType) =>
  <ButtonCell
    disabled={disabled}
    icon="ui-icon-plus"
    label={i18n.buttonLabelAdd}
    onClick={onClick} />;

export default React.memo(SnakAddButtonCell);
