import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import ComparatorSelect from './ComparatorSelect';
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
    propertyIdToComparators: PropTypes.instanceOf( Map ).isRequired,
  }

  constructor() {
    super( ...arguments );

    if ( this.props.propertyIdToComparators.size === 0 ) {
      this.state = {
        emptyAs: 'asLast',
        comparator: null,
        order: 'asc',
        propertyId: null,
      };
    } else {
      const propertyId = this.props.propertyIdToComparators.keys().next().value;
      const comparator = this.props.propertyIdToComparators.get( propertyId )[ 0 ];

      this.state = {
        emptyAs: 'asLast',
        comparator,
        order: 'asc',
        propertyId,
      };
    }

    this.handleChange = this.handleChange.bind( this );
    this.handleComparatorChange = this.handleComparatorChange.bind( this );
    this.handleSortClick = this.handleSortClick.bind( this );
  }

  handleChange( event ) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState( { [ name ]: value } );
  }

  handleComparatorChange( newComparator ) {
    expect( newComparator ).toBeAn( 'object' );
    this.setState( { comparator: newComparator } );
  }

  handleSortClick() {
    this.props.onCloseClick();

    const { claims, onClaimsReorder } = this.props;
    const { comparator, emptyAs, order, propertyId } = this.state;
    const sortEmptyCompareConstant = emptyAs === 'asLast' ? +1 : -1;
    const sortOrderCompareConstant = order === 'asc' ? +1 : -1;
    const claimIds = claims.map( claim => claim.id );

    stableSort( claimIds, ( c1Id, c2Id ) => {
      const c1 = claims.find( claim => claim.id === c1Id ) || {};
      const c2 = claims.find( claim => claim.id === c2Id ) || {};

      const dataValue1 = ( ( ( c1.qualifiers || {} )[ propertyId ] || [] )[ 0 ] || {} ).datavalue || null;
      const dataValue2 = ( ( ( c2.qualifiers || {} )[ propertyId ] || [] )[ 0 ] || {} ).datavalue || null;

      if ( dataValue1 === null && dataValue2 === null ) return 0;
      return comparator.compare( dataValue1, dataValue2, sortEmptyCompareConstant, sortOrderCompareConstant );
    } );
    onClaimsReorder( claimIds );
  }

  render() {
    const { propertyIdToComparators } = this.props;
    const propertyIds = [ ...propertyIdToComparators.keys() ];
    const { comparator, propertyId } = this.state;
    const comparatorOptions = propertyIdToComparators.get( propertyId );
    expect( comparatorOptions ).toBeAn( 'array' );

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
                { cache => <select name="propertyId" onChange={this.handleChange} value={this.state.propertyId} >
                  {propertyIds.map( propertyId =>
                    <option
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
            <th>{i18n.fieldLabelComparator}</th>
            <td>
              <ComparatorSelect
                onChange={this.handleComparatorChange}
                options={comparatorOptions}
                value={comparator} />
            </td>
          </tr>
          <tr>
            <th>{i18n.fieldLabelSortOrder}</th>
            <td>
              <select name="order" onChange={this.handleChange} value={this.state.sortOrder}>
                <option value="asc">{i18n.optionSortOrderAsc}</option>
                <option value="desc">{i18n.optionSortOrderDesc}</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>{i18n.fieldLabelEmptyValuesSort}</th>
            <td>
              <select name="emptyAs" onChange={this.handleChange} value={this.state.sortEmptyAs}>
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
