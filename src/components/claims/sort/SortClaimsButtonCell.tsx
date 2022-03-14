import React, { PureComponent } from 'react';
import ButtonCell from '../../ButtonCell';
import comparators from './comparators';
import { DatavalueComparator } from './DatavalueComparator';
import { defaultMemoize } from 'reselect';
import i18n from './i18n';
import SortClaimsDialog from './SortClaimsDialog';

type PropsType = {
  claims : ClaimType[],
  onClaimsReorder : (claimIds : string[]) => any,
};

type StateType = {
  displayEditor : boolean,
};

export default class SortClaimsButtonCell
  extends PureComponent<PropsType, StateType> {

  override state : StateType = {
    displayEditor: false,
  };

  handleClick = () =>
    this.setState( ( { displayEditor } ) => ( { displayEditor: !displayEditor } ) );

  propertyIdToComparatorsMemoize = defaultMemoize( ( claims : ClaimType[] ) => {
    // propertyId to array of comparators
    const result : Map< string, DatavalueComparator[] > = new Map();

    comparators.forEach( ( comparator : DatavalueComparator ) => {
      const checkedTrue : Set<string> = new Set();
      const checkedFalse : Set<string> = new Set();

      const cmpSupports : ( _ : string, __ : QualifierType ) => boolean | null = comparator.supports;

      claims.forEach( ( claim : ClaimType ) => {
        if ( !claim.qualifiers ) return;

        for ( const [ propertyId, qualifiers ] of Object.entries( claim.qualifiers ) ) {
          qualifiers.forEach( qualifier => {
            if ( checkedTrue.has( propertyId ) || checkedFalse.has( propertyId ) ) return;

            const supports = cmpSupports( propertyId, qualifier );
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

  override render() {
    const propertyIdToComparators = this.propertyIdToComparatorsMemoize( this.props.claims );

    return <ButtonCell
      disabled={propertyIdToComparators.size === 0}
      icon="ui-icon-arrow-2-n-s"
      label={i18n.buttonLabelSortClaims}
      onClick={this.handleClick}>
      { (children : any) => <React.Fragment>
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
