// @flow

import React, { PureComponent } from 'react';
import i18n from 'components/core.i18n';
import styles from './labelalike.css';
import TagsInput from 'react-tagsinput';

const EMPTY_ARRAY = Object.freeze( [] );

const INPUT_PROPS = {
  className: styles[ 'react-tagsinput-input' ],
  placeholder: i18n.placeholderAliases,
};

const TAG_PROPS = {
  className: styles[ 'react-tagsinput-tag' ],
  classNameRemove: styles[ 'react-tagsinput-remove' ],
};

type PropsType = {
  draft : string,
  onChange : ?( string[] ) => any,
  onChangeDraft : ?string => any,
  values : string[],
};

export default class AliasesEditor extends PureComponent<PropsType> {

  static defaultProps = {
    draft: '',
    values: EMPTY_ARRAY,
  };

  render() {
    const { draft, values, onChange, onChangeDraft } = this.props;

    return <TagsInput
      className={styles[ 'react-tagsinput' ]}
      focusedClassName={styles[ 'react-tagsinput--focused' ]}
      inputProps={INPUT_PROPS}
      inputValue={draft || ''}
      onChange={onChange}
      onChangeInput={onChangeDraft}
      onlyUnique
      tagProps={TAG_PROPS}
      value={values} />;
  }

}
