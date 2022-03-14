import React, {ChangeEventHandler, FocusEventHandler, PureComponent} from 'react';

interface PropsType {
  entityId: string | null;
  entityLabel: string | null;
  inputRef?: any;
  onBlur: FocusEventHandler< HTMLInputElement >;
  onChange: ChangeEventHandler< HTMLInputElement >;
  onFocus: FocusEventHandler< HTMLInputElement >;
  value?: string;
}

interface StateType {
  focused: boolean;
  value: string;
}

export default class WikibaseItemInput extends PureComponent<PropsType, StateType> {

  static getEtcProps (props: PropsType) {
    /* eslint no-unused-vars: 0 */
    const {entityId, entityLabel, inputRef, value, onBlur, onChange, onFocus, ...etc} = props;
    return etc;
  }

  constructor (props: PropsType) {
    super(props);
    this.state = {
      focused: false,
      value: this.props.entityLabel || this.props.entityId || '',
    };
  }

  handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    this.setState({
      focused: true,
      value: event.currentTarget.value,
    });
    this.props.onChange(event);
  };

  handleFocus: FocusEventHandler<HTMLInputElement> = event => {
    this.setState({focused: true});
    this.props.onFocus(event);
  };

  handleBlur: FocusEventHandler<HTMLInputElement> = event => {
    this.setState({focused: false});
    this.props.onBlur(event);
  };

  override render () {
    const {entityId, entityLabel, inputRef} = this.props;
    const etc = WikibaseItemInput.getEtcProps(this.props);
    const {focused, value} = this.state;

    let inputValue;
    if (focused) {
      inputValue = value;
    } else if (entityId && entityLabel) {
      inputValue = entityLabel + ' (' + entityId + ')';
    } else if (entityId) {
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

  setValue = (value: string) => { this.setState({value}); };
}
