import expect from 'expect';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

export default class ValueHolder extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    initialValue: PropTypes.any,
  };

  constructor() {
    super( ...arguments );
    this.state = {
      value: this.props.initialValue,
    };
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( newValue ) {
    console.log( 'ValueHolder::handleChange( «' + this.state.value + '» => «' + newValue + '» )' );
    this.setState( {
      value: newValue,
    } );
  }

  getValue() {
    return this.state.value;
  }

  render() {
    const child = this.props.children;
    expect( child ).toBeA( 'function' );

    return child( this.state.value, this.handleChange );
  }

}
