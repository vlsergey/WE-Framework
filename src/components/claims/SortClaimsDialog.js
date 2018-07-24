import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import DialogWrapper from 'wrappers/DialogWrapper';
import expect from 'expect';
import i18n from './i18n';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import stableSort from 'utils/stableSort';
import styles from './SortClaimsDialog.css';

const EMPTY_OBJECT = {};

export default class SortClaimsDialog extends PureComponent {

  static propTypes = {
    claims: PropTypes.arrayOf( PropTypes.shape( Claim ) ).isRequired,
    onClaimsReorder: PropTypes.func.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    propertyIds: PropTypes.arrayOf( PropTypes.string ).isRequired,
  }

  constructor() {
    super( ...arguments );

    this.state = {
      sortBy: this.props.propertyIds[ 0 ] || '',
      sortOrder: 'asc',
      sortEmptyAs: 'asLast',
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSortClick = this.handleSortClick.bind( this );
  }

  handleChange( event ) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState( { [ name ]: value } );
  }

  handleSortClick() {
    this.props.onCloseClick();

    const { claims, onClaimsReorder } = this.props;
    const { sortBy, sortOrder, sortEmptyAs } = this.state;
    const sortEmptyCompareConstant = sortEmptyAs === 'asLast' ? +1 : -1;
    const sortOrderCompareConstant = sortOrder === 'asc' ? +1 : -1;
    const claimIds = claims.map( claim => claim.id );
    stableSort( claimIds, ( c1Id, c2Id ) => {
      const c1 = claims.find( claim => claim.id === c1Id ) || {};
      const c2 = claims.find( claim => claim.id === c2Id ) || {};
      let v1 = ( ( ( ( ( c1.qualifiers || {} )[ sortBy ] || [] )[ 0 ] || {} ).datavalue || {} ).value || {} ).time || '';
      let v2 = ( ( ( ( ( c2.qualifiers || {} )[ sortBy ] || [] )[ 0 ] || {} ).datavalue || {} ).value || {} ).time || '';
      if ( v1 === '' && v2 === '' ) return 0;
      if ( v1 === '' && v2 !== '' ) return sortEmptyCompareConstant;
      if ( v1 !== '' && v2 === '' ) return -sortEmptyCompareConstant;
      v1 = v1.replace( /^[+-]\d+-/, s => s.padStart( 15, '0' ) );
      v2 = v2.replace( /^[+-]\d+-/, s => s.padStart( 15, '0' ) );
      return v1 === v2 ? 0 : v1 > v2 ? sortOrderCompareConstant : -sortOrderCompareConstant;
    } );
    onClaimsReorder( claimIds );
  }

  render() {
    const { propertyIds } = this.props;
    expect( propertyIds ).toBeAn( 'array' );

    return <DialogWrapper
      buttons={[
        {
          text: i18n.dialogButtonTextSortClaims,
          label: i18n.dialogButtonLabelSortClaims,
          click: this.handleSortClick,
        },
        {
          text: i18n.dialogButtonTextCancel,
          label: i18n.dialogButtonLabelCancel,
          click: this.props.onCloseClick,
        },
      ]}
      title={i18n.dialogTitleSortClaims}
      width="auto">
      <table className={styles.dialogTable}>
        <tbody>
          <tr>
            <th>{i18n.fieldLabelSortBy}</th>
            <td>
              <PropertyDescriptionsProvider propertyIds={propertyIds}>
                { cache => <select name="sortBy" onChange={this.handleChange} value={this.state.sortBy} >
                  {propertyIds.map( propertyId =>
                    <option
                      disabled={( cache[ propertyId ] || EMPTY_OBJECT ).datatype !== 'time'}
                      key={propertyId}
                      title={( cache[ propertyId ] || EMPTY_OBJECT ).description}
                      value={propertyId}>
                      {( cache[ propertyId ] || EMPTY_OBJECT ).label}
                    </option>
                  ) }
                </select> }
              </PropertyDescriptionsProvider>
            </td>
          </tr>
          <tr>
            <th>{i18n.fieldLabelSortOrder}</th>
            <td>
              <select name="sortOrder" onChange={this.handleChange} value={this.state.sortOrder}>
                <option value="asc">{i18n.optionSortOrderAsc}</option>
                <option value="desc">{i18n.optionSortOrderDesc}</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>{i18n.fieldLabelEmptyValuesSort}</th>
            <td>
              <select name="sortEmptyAs" onChange={this.handleChange} value={this.state.sortEmptyAs}>
                <option value="asFirst">{i18n.optionSortAsFirst}</option>
                <option value="asLast">{i18n.optionSortAsLast}</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </DialogWrapper>;
  }

}
