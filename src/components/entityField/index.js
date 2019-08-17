import { addLastRecentlyUsed, findLastRecentlyUsed } from './LruCache';
import React, { PureComponent } from 'react';
import AutocompleteMode from './AutocompleteMode';
import EntityLabel from 'caches/EntityLabel';
import PropTypes from 'prop-types';
import SelectMode from './SelectMode';

export default class EntityField extends PureComponent {

  static propTypes = {
    lruKey: PropTypes.string,
    oneOf: PropTypes.arrayOf( PropTypes.string ),
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
  };

  static defaultProps = {
    readOnly: false,
  };

  WIKIDATA_LINK_URL = 'https://www.wikidata.org/wiki/';

  constructor() {
    super( ...arguments );

    this.state = {
      lruFromCache: null,
      selectMode: !!this.props.oneOf,
      selectOptions: null,
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
        } else {
          return { selectOptions: props.oneOf };
        }
      } else if ( state.lruFromCache ) {
        if ( !!currentValue && state.lruFromCache.indexOf( currentValue ) === -1 ) {
          return { selectOptions: [ ...state.lruFromCache, currentValue ] };
        } else {
          return { selectOptions: state.lruFromCache };
        }
      } else {
        throw new Error( 'Unsupported state: both oneOf and lruFromCache are null or empty' );
      }
    }
  }

  handleSelect( entityId ) {
    const { lruKey, onChange } = this.props;
    onChange( entityId );

    if ( entityId !== null && entityId.trim() !== '' )
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
      } else {
        return null;
      }
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
