// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';

type PropsType = {
  entityId? : ?string,
  entityLabel? : ?string,
  inputRef? : any,
  onBlur : SyntheticEvent< HTMLInputElement > => any,
  onChange : SyntheticEvent< HTMLInputElement > => any,
  onFocus : SyntheticEvent< HTMLInputElement > => any,
  value? : string,
};

type StateType = {
  focused : boolean,
  value : string,
};

export default class WikibaseItemInput extends PureComponent<PropsType, StateType> {

  static getEtcProps( props : PropsType ) {
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
  }

  @boundMethod
  handleChange( event : SyntheticEvent< HTMLInputElement > ) {
    this.setState( {
      focused: true,
      value: event.currentTarget.value,
    } );
    this.props.onChange( event );
  }

  @boundMethod
  handleFocus( event : SyntheticEvent< HTMLInputElement > ) {
    this.setState( {
      focused: true,
    } );
    this.props.onFocus( event );
  }

  @boundMethod
  handleBlur( event : SyntheticEvent< HTMLInputElement > ) {
    this.setState( {
      focused: false,
    } );
    this.props.onBlur( event );
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

  @boundMethod
  setValue( value : string ) {
    this.setState( { value } );
  }
}
