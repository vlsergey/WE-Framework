// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';
import comparators from './comparators';
import { DatavalueComparator } from './DatavalueComparator';
import { defaultMemoize } from 'reselect';
import i18n from './i18n';
import SortClaimsDialog from './SortClaimsDialog';

// Flow typecheck hack
const entries = <T>( obj : { [string] : T } ) : [string, T][] => Object.keys( obj ).map( key => [ key, obj[ key ] ] );

type PropsType = {
  claims : ClaimType[],
  onClaimsReorder : string[] => any,
};

type StateType = {
  displayEditor : boolean,
};

export default class SortClaimsButtonCell
  extends PureComponent<PropsType, StateType> {

  state = {
    displayEditor: false,
  };

  @boundMethod
  handleClick() {
    this.setState( ( { displayEditor } ) => ( { displayEditor: !displayEditor } ) );
  }

  propertyIdToComparatorsMemoize = defaultMemoize( ( claims : ClaimType[] ) => {
    // propertyId to array of comparators
    const result : Map< string, DatavalueComparator[] > = new Map();

    comparators.forEach( ( comparator : DatavalueComparator ) => {
      const checkedTrue = new Set();
      const checkedFalse = new Set();

      const cmpSupports : ( string, QualifierType ) => ?boolean = comparator.supports;

      claims.forEach( ( claim : ClaimType ) => {
        if ( !claim.qualifiers ) return;

        for ( const [ propertyId, qualifiers ] of entries( claim.qualifiers ) ) {
          qualifiers.forEach( qualifier => {
            if ( checkedTrue.has( propertyId ) || checkedFalse.has( propertyId ) ) return;

            const supports : ?boolean = cmpSupports( propertyId, qualifier );
            if ( supports === null ) return;
            if ( supports ) checkedTrue.add( propertyId );
            if ( !supports ) checkedFalse.add( propertyId );
          } );
        }
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
