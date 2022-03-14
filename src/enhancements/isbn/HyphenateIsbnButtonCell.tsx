import {ISBN} from 'isbn';
import React, {PureComponent} from 'react';

import ButtonCell from '../../components/ButtonCell';
import i18n from './i18n';

interface PropsType {
  isbn: null | string;
  mode: 'Isbn10' | 'Isbn13';
  onHyphenate: (value: string) => any;
}

export default class HyphenateIsbnButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    isbn: '',
  };

  handleClick = () => {
    const {isbn, mode, onHyphenate} = this.props;
    const withoutHypens = (isbn || '').replace(/[- ]/g, '');
    const parsed = ISBN.parse(withoutHypens);

    const isCorrect = !!parsed && parsed['is' + mode]();
    if (isCorrect) {
      const hyphenated = parsed['as' + mode](true) as string;
      onHyphenate(hyphenated);
    }
  };

  override render () {
    const {isbn, mode} = this.props;
    const withoutHypens = (isbn || '').replace(/[- ]/g, '');

    const parsed = ISBN.parse(withoutHypens);
    const isCorrect = !!parsed && parsed['is' + mode]();
    return <ButtonCell
      disabled={!isCorrect || isbn !== parsed['as' + mode]()}
      icon="ui-icon-transfer-e-w"
      label={i18n.buttonLabelHyphenate}
      onClick={this.handleClick} />;
  }

}
