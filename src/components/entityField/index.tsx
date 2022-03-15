import React, {PureComponent} from 'react';

import EntityLabel from '../../caches/EntityLabel';
import AutocompleteMode from './AutocompleteMode';
import {addLastRecentlyUsed, findLastRecentlyUsed} from './LruCache';
import SelectMode from './SelectMode';

interface PropsType
  extends Omit<React.ComponentPropsWithoutRef<typeof AutocompleteMode>, 'value' | 'onChange' | 'lruKey' | 'oneOf' | 'onSelect' | 'readOnly' | 'value'>{
  lruKey?: string;
  onChange: (entityId: null | string) => any;
  oneOf?: string[];
  readOnly?: boolean;
  value: null | string;
}

interface StateType {
  lruFromCache: null | string[];
  selectMode: boolean;
  selectOptions: string[];
}

export default class EntityField extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
  };

  WIKIDATA_LINK_URL = 'https://www.wikidata.org/wiki/';

  constructor (props: PropsType) {
    super(props);

    this.state = {
      lruFromCache: null,
      selectMode: !!this.props.oneOf?.length,
      selectOptions: [],
    };

    if (!this.props.oneOf?.length && this.props.lruKey) {
      void findLastRecentlyUsed(this.props.lruKey).then(arr => {
        if (Array.isArray(arr) && arr.length !== 0) {
          this.setState({lruFromCache: arr, selectMode: true});
        }
      });
    }
  }

  static getDerivedStateFromProps (props: PropsType, state: StateType) {
    if (state.selectMode) {
      const currentValue = props.value;
      if (props.oneOf?.length) {
        if (!!currentValue && !props.oneOf.includes(currentValue)) {
          return {selectOptions: [...props.oneOf, currentValue]};
        }
        return {selectOptions: props.oneOf};

      } else if (state.lruFromCache) {
        if (!!currentValue && !state.lruFromCache.includes(currentValue)) {
          return {selectOptions: [...state.lruFromCache, currentValue]};
        }
        return {selectOptions: state.lruFromCache};
      }
      throw new Error('Unsupported state: both oneOf and lruFromCache are null or empty');
    }
    return null;
  }

  handleOtherSelect = () => { this.setState({selectMode: false}); };

  handleSelect = (entityId: string | null) => {
    const {lruKey, onChange} = this.props;
    onChange(entityId);

    if (!!lruKey && !!entityId && entityId.trim() !== '')
      void addLastRecentlyUsed(lruKey, entityId);
  };

  override render () {
    const {value, onChange, lruKey, oneOf, readOnly, ...etc} = this.props;

    if (readOnly) {
      if (value) {
        return <a href={this.WIKIDATA_LINK_URL + value}>
          <EntityLabel entityId={value} />
        </a>;
      }
      return null;

    }

    return this.state.selectMode
      ? <SelectMode
        {...etc}
        onOtherSelect={this.handleOtherSelect}
        onSelect={this.handleSelect}
        oneOf={this.state.selectOptions}
        value={value} />
      : <AutocompleteMode
        {...etc}
        onSelect={this.handleSelect}
        value={value} />;
  }
}
