import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const ok = x => typeof x === 'string' && x.trim() !== '';

export default class ExactValueEditor extends PureComponent {

  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    value: PropTypes.object,
  };

  static defaultProps = {
    value: {},
    readOnly: false,
  };

  static canBeUsedForValue( value ) {
    const { amount, lowerBound, upperBound } = value;

    return !ok( lowerBound ) && !ok( upperBound )
      || Number( lowerBound ) === Number( amount ) && Number( upperBound ) === Number( amount );
  }

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    /* eslint no-unused-vars: 0 */
    const { lowerBound, amount, upperBound, ...etc } = this.props.value;
    this.props.onValueChange( {
      ...etc,
      amount: event.target.value || '',
    } );
  }

  render() {
    const { readOnly, value } = this.props;

    if ( readOnly ) {
      if ( !value ) {
        return null;
      }
      return value.amount || null;
    }

    return <td>
      <input onChange={this.handleChange} value={value.amount || ''} />
    </td>;
  }

}
