import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from './i18n';
import { ISBN } from 'isbn';
import PropTypes from 'prop-types';

export default class HyphenateIsbnButtonCell extends PureComponent {

  static propTypes = {
    isbn: PropTypes.string,
    mode: PropTypes.oneOf( [ 'Isbn10', 'Isbn13' ] ),
    onHyphenate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isbn: '',
  };

  constructor() {
    super( ...arguments );

    this.handleClick = this.handleClick.bind( this );
  }

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
      disabled={!isCorrect}
      icon="ui-icon-transfer-e-w"
      label={i18n.buttonLabelHyphenate}
      onClick={this.handleClick} />;
  }

}
