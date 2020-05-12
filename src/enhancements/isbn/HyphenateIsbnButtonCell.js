// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';
import i18n from './i18n';
import { ISBN } from 'isbn';

type PropsType = {
  isbn? : ?string,
  mode : 'Isbn10' | 'Isbn13',
  onHyphenate : any => any,
};

export default class HyphenateIsbnButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    isbn: '',
  };

  @boundMethod
  handleClick() {
    const { isbn, mode, onHyphenate } = this.props;
    const withoutHypens = ( isbn || '' ).replace( /[- ]/g, '' );
    const parsed = ISBN.parse( withoutHypens );

    const isCorrect = !!parsed && parsed[ 'is' + mode ]();
    if ( isCorrect ) {
      const hyphenated = parsed[ 'as' + mode ]( true );
      onHyphenate( hyphenated );
    }
  }

  render() {
    const { isbn, mode } = this.props;
    const withoutHypens = ( isbn || '' ).replace( /[- ]/g, '' );

    const parsed = ISBN.parse( withoutHypens );
    const isCorrect = !!parsed && parsed[ 'is' + mode ]();
    return <ButtonCell
      disabled={!isCorrect || isbn !== parsed[ 'as' + mode ]()}
      icon="ui-icon-transfer-e-w"
      label={i18n.buttonLabelHyphenate}
      onClick={this.handleClick} />;
  }

}
