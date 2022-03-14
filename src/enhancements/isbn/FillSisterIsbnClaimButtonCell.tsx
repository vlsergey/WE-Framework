import React, { PureComponent } from 'react';
import ButtonCell from '../../components/ButtonCell';
import i18n from './i18n';
import { ISBN } from 'isbn';

type NormalizeFunction = (str : null | string) => null | string;

function normalize( mode : string ) : NormalizeFunction {
  return oldValue => {
    const withoutHypens = ( oldValue || '' ).replace( /[- ]/g, '' );
    const parsed = ISBN.parse( withoutHypens );
    const isCorrect = !!parsed && parsed[ 'is' + mode ]();
    if ( isCorrect ) {
      return parsed[ 'as' + mode ]( true );
    }
  };
}

type PropsType = {
  isbn : null | string,
  modeOwn : 'Isbn10' | 'Isbn13',
  modeSister : 'Isbn10' | 'Isbn13',
  onClaimsFill : ( normalizeFunction : NormalizeFunction, value : string ) => any,
};

export default class FillSisterIsbnClaimButtonCell
  extends PureComponent<PropsType> {

  static defaultProps = {
    isbn: '',
  };

  handleClick = () => {
    const { isbn, modeOwn, modeSister, onClaimsFill } = this.props;
    const withoutHypens : string = ( isbn || '' ).replace( /[- ]/g, '' );
    const parsed = ISBN.parse( withoutHypens );

    const isCorrect : boolean = !!parsed && parsed[ 'is' + modeOwn ]();
    if ( isCorrect ) {
      const hyphenatedSister : string = parsed[ 'as' + modeSister ]( true );
      onClaimsFill( normalize( modeSister ), hyphenatedSister );
    }
  }

  override render() {
    const { isbn, modeOwn } = this.props;
    const withoutHypens = ( isbn || '' ).replace( /[- ]/g, '' );

    const parsed = ISBN.parse( withoutHypens );
    const isCorrect = !!parsed && parsed[ 'is' + modeOwn ]();
    return <ButtonCell
      disabled={!isCorrect}
      icon="ui-icon-arrow-2-n-s"
      label={i18n.buttonLabelFillSisterIsbn}
      onClick={this.handleClick} />;
  }

}
