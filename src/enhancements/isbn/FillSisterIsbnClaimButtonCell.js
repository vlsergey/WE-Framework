// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from './i18n';
import { ISBN } from 'isbn';
import PropTypes from 'prop-types';

const normalize = mode => oldValue => {
  const withoutHypens = ( oldValue || '' ).replace( /[- ]/g, '' );
  const parsed = ISBN.parse( withoutHypens );
  const isCorrect = !!parsed && parsed[ 'is' + mode ]();
  if ( isCorrect ) {
    return parsed[ 'as' + mode ]( true );
  }
};

export default class FillSisterIsbnClaimButtonCell extends PureComponent {

  static propTypes = {
    isbn: PropTypes.string,
    modeOwn: PropTypes.oneOf( [ 'Isbn10', 'Isbn13' ] ),
    modeSister: PropTypes.oneOf( [ 'Isbn10', 'Isbn13' ] ),
    onClaimsFill: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isbn: '',
  };

  constructor() {
    super( ...arguments );

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    const { isbn, modeOwn, modeSister, onClaimsFill } = this.props;
    const withoutHypens = ( isbn || '' ).replace( /[- ]/g, '' );
    const parsed = ISBN.parse( withoutHypens );

    const isCorrect = !!parsed && parsed[ 'is' + modeOwn ]();
    if ( isCorrect ) {
      const hyphenatedSister = parsed[ 'as' + modeSister ]( true );
      onClaimsFill( normalize( modeSister ), hyphenatedSister );
    }
  }

  render() {
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
