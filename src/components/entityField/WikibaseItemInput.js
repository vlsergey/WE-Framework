import React, { PureComponent } from 'react';

type PropsType = {
  entityId? : ?string,
  entityLabel? : ?string,
  inputRef? : any,
  onBlur : () => any,
  onChange : any => any,
  onFocus : () => any,
  value? : string,
};

type StateType = {
  focused : boolean,
  value : string,
};

export default class WikibaseItemInput extends PureComponent<PropsType, StateType> {

  static getEtcProps( props ) {
    /* eslint no-unused-vars: 0 */
    const { entityId, entityLabel, inputRef, value, onBlur, onChange, onFocus, ...etc } = props;
    return etc;
  }

  constructor() {
    super( ...arguments );
    this.state = {
      focused: false,
      value: this.props.entityLabel || this.props.entityId || '',
    };

    this.handleBlur = this.handleBlur.bind( this );
    this.handleChange = this.handleChange.bind( this );
    this.handleFocus = this.handleFocus.bind( this );
  }

  handleChange( event ) {
    this.setState( {
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
    const { focused, value } = this.state;

    let inputValue;
    if ( focused ) {
      inputValue = value;
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

  setValue( value ) {
    this.setState( { value } );
  }
}
