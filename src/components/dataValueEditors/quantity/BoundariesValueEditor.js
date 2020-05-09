// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class BoundariesValueEditor extends PureComponent {

  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    value: PropTypes.object,
  };

  static defaultProps = {
    value: null,
    readOnly: false,
  };

  static canBeUsedForValue() : boolean {
    return true;
  }

  constructor() {
    super( ...arguments );

    this.handleAmountChange = this.handleAmountChange.bind( this );
    this.handleLowerBoundChange = this.handleLowerBoundChange.bind( this );
    this.handleUpperBoundChange = this.handleUpperBoundChange.bind( this );
  }

  handleFieldChange( field : string, event ) {
    this.props.onValueChange( {
      ...this.props.value,
      [ field ]: event.target.value || '',
    } );
  }

  handleAmountChange( event ) {
    this.handleFieldChange( 'amount', event );
  }

  handleLowerBoundChange( event ) {
    this.handleFieldChange( 'lowerBound', event );
  }

  handleUpperBoundChange( event ) {
    this.handleFieldChange( 'upperBound', event );
  }

  render() {
    const { readOnly, value } = this.props;

    if ( readOnly ) {
      if ( !value || !value.amount )
        return null;

      return ( value.lowerBound || '?' )
        + ' < ' + ( value.amount || '?' )
        + ' < ' + ( value.upperBound || '?' );
    }

    return <React.Fragment>
      <td>
        <input onChange={this.handleLowerBoundChange} value={value.lowerBound || ''} />
      </td>
      <td>&nbsp;&lt;&nbsp;</td>
      <td>
        <input onChange={this.handleAmountChange} value={value.amount || ''} />
      </td>
      <td>&nbsp;&lt;&nbsp;</td>
      <td>
        <input onChange={this.handleUpperBoundChange} value={value.upperBound || ''} />
      </td>
    </React.Fragment>;
  }

}
