import {PureComponent, ReactNode} from 'react';

interface PropsType<V> {
  initialValue: V;
  children: (currentValue: V, onChange : ((newValue: V) => unknown)) => ReactNode;
}

interface StateType<V> {
  value: V;
}

export default class ValueHolder<V> extends PureComponent<PropsType<V>, StateType<V>> {

  constructor (props: PropsType<V>) {
    super(props);

    this.state = {
      value: this.props.initialValue,
    };
  }

  handleChange = (newValue: V) => {
    try {
      console.debug('ValueHolder::handleChange(', this.state.value, '=>', newValue, ')');
      this.setState({
        value: newValue,
      });
    } catch (_err: unknown) {
      console.debug('ValueHolder::handleChange(', this.state.value, '=>', newValue, ')', _err);
    }
  };

  getValue () {
    return this.state.value;
  }

  override render (): ReactNode {
    const child = this.props.children;
    return child(this.state.value, this.handleChange);
  }

}
