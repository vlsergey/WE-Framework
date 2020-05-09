// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import comparators from './comparators';
import { defaultMemoize } from 'reselect';
import i18n from './i18n';
import SortClaimsDialog from './SortClaimsDialog';

type PropsType = {
  claims : ClaimType[],
  onClaimsReorder : string[] => any,
};

type StateType = {
  displayEditor : boolean,
};

export default class SortClaimsButtonCell
  extends PureComponent<PropsType, StateType> {

  constructor() {
    super( ...arguments );

    this.state = {
      displayEditor: false,
    };

    this.handleClick =
      () => this.setState( state => ( { displayEditor: !state.displayEditor } ) );
  }

  propertyIdToComparatorsMemoize = defaultMemoize( claims => {
    // propertyId to array of comparators
    const result = new Map();

    comparators.forEach( comparator => {
      const checkedTrue = new Set();
      const checkedFalse = new Set();

      const cmpSupports : ( string, QualifierType ) => ?boolean = comparator.supports;

      claims.forEach( claims => {
        if ( !claims.qualifiers ) return;

        Object.keys( claims.qualifiers )
          .forEach( propertyId => {
            const qualifiers = claims.qualifiers[ propertyId ];
            qualifiers.forEach( qualifier => {
              if ( checkedTrue.has( propertyId ) || checkedFalse.has( propertyId ) ) return;

              const supports : ?boolean = cmpSupports( propertyId, qualifier );
              if ( supports === null ) return;
              if ( supports ) checkedTrue.add( propertyId );
              if ( !supports ) checkedFalse.add( propertyId );
            } );
          } );
      } );

      checkedTrue.forEach( propertyId => {
        result.set( propertyId, [ ...( result.get( propertyId ) || [] ), comparator ] );
      } );
    } );

    return result;
  } );

  render() {
    const propertyIdToComparators = this.propertyIdToComparatorsMemoize( this.props.claims );

    return <ButtonCell
      disabled={propertyIdToComparators.size === 0}
      icon="ui-icon-arrow-2-n-s"
      label={i18n.buttonLabelSortClaims}
      onClick={this.handleClick}>
      { children => <React.Fragment>
        {children}
        {this.state.displayEditor && <SortClaimsDialog
          claims={this.props.claims}
          onClaimsReorder={this.props.onClaimsReorder}
          onCloseClick={this.handleClick}
          propertyIdToComparators={propertyIdToComparators} />}
      </React.Fragment> }
    </ButtonCell>;
  }

}
