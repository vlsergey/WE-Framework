import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { defaultMemoize } from 'reselect';

const EMPTY_OBJECT = {};

const hasPropertyIdSet = defaultMemoize( allClaims =>
  new Set( Object.keys( allClaims ).filter( key => allClaims[ key ].length > 0 ) ) );

type FieldsFilterByClaimExistencePropsType = {
  children : any => any,
  claims : any,
  fields : FieldDefType[],
};

class FieldsFilterByClaimExistence
  extends PureComponent<FieldsFilterByClaimExistencePropsType> {

  render() {
    const { children, claims, fields } = this.props;

    const set = hasPropertyIdSet( claims );
    const filtered = fields.filter( field => set.has( field.property ) );
    return children( filtered );
  }
}

const mapStateToProps = state => ( {
  claims: state.entity.claims || EMPTY_OBJECT,
} );

const FilterConnected = connect( mapStateToProps )( FieldsFilterByClaimExistence );

type FilterPropsType = {
  children : any => any,
  enabled : boolean,
  fields : FieldDefType[],
};

export default class Filter extends PureComponent<FilterPropsType> {

  render() {
    const { children, enabled, fields } = this.props;

    return enabled
      ? <FilterConnected fields={fields} key="FieldsFilterByClaimExistence">{children}</FilterConnected>
      : <div key="FieldsFilterByClaimExistence">{children( fields )}</div>;
  }
}
