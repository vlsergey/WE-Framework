import React, { PureComponent } from 'react';
import i18n from 'components/core.i18n';
import PropTypes from 'prop-types';
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

export default class AliasesEditor extends PureComponent {

  static propTypes = {
    draft: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onChangeDraft: PropTypes.func.isRequired,
    values: PropTypes.arrayOf( PropTypes.string ),
  }

  static defaultProps = {
    draft: '',
    values: EMPTY_ARRAY,
  }

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
