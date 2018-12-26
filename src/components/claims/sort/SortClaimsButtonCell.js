import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import { Claim } from 'model/Shapes';
import comparators from './comparators';
import { defaultMemoize } from 'reselect';
import expect from 'expect';
import i18n from './i18n';
import PropTypes from 'prop-types';
import SortClaimsDialog from './SortClaimsDialog';

export default class SortClaimsButtonCell extends PureComponent {

  static propTypes = {
    claims: PropTypes.arrayOf( PropTypes.shape( Claim ) ).isRequired,
    onClaimsReorder: PropTypes.func.isRequired,
  }

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

      expect( comparator.supports ).toBeA( 'function' );

      claims.forEach( claims => {
        if ( !claims.qualifiers ) return;

        Object.keys( claims.qualifiers )
          .forEach( propertyId => {
            const qualifiers = claims.qualifiers[ propertyId ];
            qualifiers.forEach( qualifier => {
              if ( checkedTrue.has( propertyId ) || checkedFalse.has( propertyId ) ) return;

              const supports = comparator.supports( propertyId, qualifier );
              if ( supports === true ) checkedTrue.add( propertyId );
              if ( supports === false ) checkedFalse.add( propertyId );
            } );
          } );
      } );

      checkedTrue.forEach( propertyId => {
        if ( result.has( propertyId ) ) {
          result.set( propertyId, [ ...result.get( propertyId ), comparator ] );
        } else {
          result.set( propertyId, [ comparator ] );
        }
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
