// @flow

import { addLastRecentlyUsed, findLastRecentlyUsed } from './LruCache';
import React, { PureComponent } from 'react';
import AutocompleteMode from './AutocompleteMode';
import EntityLabel from 'caches/EntityLabel';
import SelectMode from './SelectMode';

type PropsType = {
  lruKey? : ?string,
  onChange : any => any,
  oneOf? : ?( string[] ),
  readOnly? : ?boolean,
  value? : ?string,
};

type StateType = {
  lruFromCache : ?string[],
  selectMode : boolean,
  selectOptions : string[],
};

export default class EntityField extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
  };

  WIKIDATA_LINK_URL = 'https://www.wikidata.org/wiki/';

  constructor() {
    super( ...arguments );

    this.state = {
      lruFromCache: null,
      selectMode: !!this.props.oneOf,
      selectOptions: [],
    };

    if ( !this.props.oneOf && this.props.lruKey ) {
      findLastRecentlyUsed( this.props.lruKey ).then( arr => {
        if ( Array.isArray( arr ) && arr.length !== 0 ) {
          this.setState( { lruFromCache: arr, selectMode: true } );
        }
      } );
    }

    this.handleOtherSelect = () => this.setState( { selectMode: false } );
    this.handleSelect = this.handleSelect.bind( this );
  }

  static getDerivedStateFromProps( props, state ) {
    if ( state.selectMode ) {
      const currentValue = props.value;
      if ( props.oneOf ) {
        if ( !!currentValue && props.oneOf.indexOf( currentValue ) === -1 ) {
          return { selectOptions: [ ...props.oneOf, currentValue ] };
        }
        return { selectOptions: props.oneOf };

      } else if ( state.lruFromCache ) {
        if ( !!currentValue && state.lruFromCache.indexOf( currentValue ) === -1 ) {
          return { selectOptions: [ ...state.lruFromCache, currentValue ] };
        }
        return { selectOptions: state.lruFromCache };
      }
      throw new Error( 'Unsupported state: both oneOf and lruFromCache are null or empty' );
    }
    return null;
  }

  handleSelect( entityId : ?string ) {
    const { lruKey, onChange } = this.props;
    onChange( entityId );

    if ( !!lruKey && !!entityId && entityId.trim() !== '' )
      addLastRecentlyUsed( lruKey, entityId );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "(lruKey|onChange|oneOf)" }] */
    const { value, onChange, lruKey, oneOf, readOnly, ...etc } = this.props;

    if ( readOnly ) {
      if ( value ) {
        return <a href={this.WIKIDATA_LINK_URL + value}>
          <EntityLabel entityId={value} />
        </a>;
      }
      return null;

    }

    return this.state.selectMode
      ? <SelectMode
        {...etc}
        oneOf={this.state.selectOptions}
        onOtherSelect={this.handleOtherSelect}
        onSelect={this.handleSelect}
        value={value} />
      : <AutocompleteMode
        {...etc}
        onSelect={this.handleSelect}
        value={value} />;
  }
}
