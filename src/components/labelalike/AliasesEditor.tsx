import React from 'react';
import TagsInput from 'react-tagsinput';

import i18n from '../core.i18n';
import styles from './labelalike.css';

const EMPTY_ARRAY = Object.freeze([]);

const INPUT_PROPS = {
  className: styles['react-tagsinput-input'],
  placeholder: i18n.placeholderAliases,
};

const TAG_PROPS = {
  className: styles['react-tagsinput-tag'],
  classNameRemove: styles['react-tagsinput-remove'],
};

interface PropsType {
  draft: string;
  onChange: (aliases: null | string[]) => any;
  onChangeDraft: (draft: null | string) => any;
  values: readonly string[];
}

const AliasesEditor = ({
  draft = '',
  values = EMPTY_ARRAY,
  onChange,
  onChangeDraft
}: PropsType) =>
  <TagsInput
    className={styles['react-tagsinput']}
    focusedClassName={styles['react-tagsinput--focused']}
    inputProps={INPUT_PROPS}
    inputValue={draft || ''}
    onChange={onChange}
    onChangeInput={onChangeDraft}
    onlyUnique
    tagProps={TAG_PROPS}
    value={values as string[]} />;

export default React.memo(AliasesEditor);
