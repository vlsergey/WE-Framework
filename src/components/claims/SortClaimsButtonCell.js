import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import { Claim } from 'model/Shapes';
import { defaultMemoize } from 'reselect';
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

  propertyIdsMemoize = defaultMemoize( claims => {
    const checkedTrue = new Set();
    const checkedFalse = new Set();

    claims.forEach( claims => {
      if ( !claims.qualifiers ) return;
      Object.keys( claims.qualifiers )
        .filter( propertyId => !checkedTrue.has( propertyId ) )
        .filter( propertyId => !checkedFalse.has( propertyId ) )
        .forEach( propertyId => {
          const qualifiers = claims.qualifiers[ propertyId ];
          const datatype = ( qualifiers[ 0 ] || {} ).datatype || null;
          if ( datatype === null ) return;
          if ( datatype === 'time' ) checkedTrue.add( propertyId );
          if ( datatype !== 'time' ) checkedFalse.add( propertyId );
        } );
    } );
    return [ ...checkedTrue ];
  } );

  render() {
    const propertyIds = this.propertyIdsMemoize( this.props.claims );

    return <ButtonCell
      disabled={propertyIds.length === 0}
      icon="ui-icon-arrow-2-n-s"
      label={i18n.buttonLabelSortClaims}
      onClick={this.handleClick}>
      { children => <React.Fragment>
        {children}
        {this.state.displayEditor && <SortClaimsDialog
          claims={this.props.claims}
          onClaimsReorder={this.props.onClaimsReorder}
          onCloseClick={this.handleClick}
          propertyIds={propertyIds} />}
      </React.Fragment> }
    </ButtonCell>;
  }

}
