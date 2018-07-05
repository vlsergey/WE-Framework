import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class WikibaseItemInput extends PureComponent {

  static propTypes = {
    entityId: PropTypes.string,
    entityLabel: PropTypes.string,
    value: PropTypes.string,

    inputRef: PropTypes.func,

    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  }

  static getEtcProps( props ) {
    /* eslint no-unused-vars: 0 */
    const { entityId, entityLabel, inputRef, value, onBlur, onChange, onFocus, ...etc } = props;
    return etc;
  }

  constructor() {
    super( ...arguments );
    this.state = {
      dirty: false,
      focused: false,
      value: this.props.entityLabel || this.props.entityId || '',
    };

    this.handleBlur = this.handleBlur.bind( this );
    this.handleChange = this.handleChange.bind( this );
    this.handleFocus = this.handleFocus.bind( this );
  }

  clearDirtyState() {
    this.setState( {
      dirty: false,
    } );
  }

  handleChange( event ) {
    this.setState( {
      dirty: true,
      focused: true,
      value: event.target.value,
    } );
    this.props.onChange( event );
  }

  handleFocus( ) {
    this.setState( {
      focused: true,
    } );
    this.props.onFocus();
  }

  handleBlur( ) {
    this.setState( {
      focused: false,
    } );
    this.props.onBlur();
  }

  render() {
    const { entityId, entityLabel, inputRef } = this.props;
    const etc = WikibaseItemInput.getEtcProps( this.props );
    const { dirty, focused, value } = this.state;

    let inputValue;
    if ( dirty ) {
      inputValue = value;
    } else if ( focused ) {
      inputValue = entityLabel || entityId || '';
    } else if ( entityId && entityLabel ) {
      inputValue = entityLabel + ' (' + entityId + ')';
    } else if ( entityId ) {
      inputValue = entityId;
    } else {
      inputValue = '';
    }

    return <input
      {...etc}
      onBlur={this.handleBlur}
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      ref={inputRef}
      value={inputValue} />;
  }
}
