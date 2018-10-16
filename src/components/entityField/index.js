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
  }

  static defaultProps = {
    readOnly: false,
  }

  constructor() {
    super( ...arguments );

    this.state = {
      selectMode: !!this.props.oneOf,
    };

    if ( !this.state.selectMode ) {
      if ( this.props.lruKey ) {
        findLastRecentlyUsed( this.props.lruKey )
          .then( arr => {
            if ( Array.isArray( arr ) && arr.length !== 0 ) {
              const currentValue = this.props.value || '';
              if ( currentValue === '' || arr.indexOf( currentValue ) !== -1 ) {
                this.oneOf = arr;
              } else {
                this.oneOf = [ ...arr, currentValue ];
              }
              this.setState( { selectMode: true } );
            }
          } );
      }
    } else {
      const currentValue = this.props.value;
      if ( !!currentValue && this.props.oneOf.indexOf( currentValue ) === -1 ) {
        this.oneOf = [ ...this.props.oneOf, currentValue ];
      } else {
        this.oneOf = this.props.oneOf;
      }
    }

    this.handleOtherSelect = () => this.setState( { selectMode: false } );
    this.handleSelect = this.handleSelect.bind( this );
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
        return <a href={'https://www.wikidata.org/wiki/' + value}>
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
        oneOf={this.oneOf}
        value={value} />
      : <AutocompleteMode
        {...etc}
        onSelect={this.handleSelect}
        value={value} />;
  }
}
