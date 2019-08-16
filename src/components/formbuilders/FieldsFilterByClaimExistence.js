import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { defaultMemoize } from 'reselect';
import expect from 'expect';
import { FieldShape } from './FormShapes';
import PropTypes from 'prop-types';

const EMPTY_OBJECT = {};

const hasPropertyIdSet = defaultMemoize( allClaims =>
  new Set( Object.keys( allClaims ).filter( key => allClaims[ key ].length > 0 ) ) );

class FieldsFilterByClaimExistence extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    claims: PropTypes.object.isRequired,
    fields: PropTypes.arrayOf( PropTypes.shape( FieldShape ) ).isRequired,
  };

  render() {
    const { children, claims, fields } = this.props;
    expect( children ).toBeA( 'function' );

    const set = hasPropertyIdSet( claims );
    const filtered = fields.filter( field => set.has( field.property ) );
    return children( filtered );
  }
}

const mapStateToProps = state => ( {
  claims: state.entity.claims || EMPTY_OBJECT,
} );

const FilterConnected = connect( mapStateToProps )( FieldsFilterByClaimExistence );

export default class Filter extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    fields: PropTypes.arrayOf( PropTypes.shape( FieldShape ) ).isRequired,
  };

  render() {
    const { children, enabled, fields } = this.props;
    expect( children ).toBeA( 'function' );

    return enabled
      ? <FilterConnected fields={fields} key="FieldsFilterByClaimExistence">{children}</FilterConnected>
      : <div key="FieldsFilterByClaimExistence">{children( fields )}</div>;
  }
}
