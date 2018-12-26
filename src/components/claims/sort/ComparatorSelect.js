import React, { PureComponent } from 'react';
import i18n from './i18n';
import PropTypes from 'prop-types';

export default class ComparatorSelect extends PureComponent {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    value: PropTypes.object,
  }

  constructor() {
    super( ...arguments );
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    const { onChange } = this.props;

    const newCode = event.target.value;
    const newComparator = this.props.options.find( c => c.code === newCode );
    if ( newComparator ) {
      onChange( newComparator );
    }
  }

  render() {
    const { options, value } = this.props;
    const selectValue = ( value || {} ).code || '';

    return <select onChange={this.handleChange} value={selectValue}>
      {options.map( comparator => <option
        key={comparator.code}
        value={comparator.code}>
        { ( i18n.comparators || {} )[ comparator.code ] || comparator.code }
      </option> ) }
    </select>;
  }

}
