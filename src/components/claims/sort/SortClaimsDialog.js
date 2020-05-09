// @flow

import React, { PureComponent } from 'react';
import ComparatorSelect from './ComparatorSelect';
import { DatavalueComparator } from './DatavalueComparator';
import DialogWrapper from 'wrappers/DialogWrapper';
import i18n from './i18n';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import stableSort from 'utils/stableSort';
import styles from './SortClaimsDialog.css';

const EMPTY_OBJECT = {};

type PropsType = {
  claims : ClaimType[],
  onClaimsReorder : string[] => any,
  onCloseClick : () => any,
  propertyIdToComparators : Map< string, DatavalueComparator[] >,
};

type StateType = {
  comparator : ?DatavalueComparator,
  emptyAs : 'asLast' | 'asFirst',
  order : 'asc' | 'desc',
  propertyId : ?string,
};

function findFirstQuailifierDataValue(
    claims : ClaimType[],
    claimId : string,
    propertyId : string
) : ?DataValueType {
  const claim : ?ClaimType = claims.find( ( { id } ) => id === claimId ) || null;
  if ( !claim ) return null;

  const qualifiersObject : ?{ [string] : QualifierType[] } = claim.qualifiers;
  if ( !qualifiersObject ) return null;

  const qualifiersArray : ?QualifierType[] = qualifiersObject[ propertyId ];
  if ( !qualifiersArray || qualifiersArray.length === 0 ) return null;

  const qualifier : QualifierType = qualifiersArray[ 0 ];
  if ( !qualifier ) return null;
  return qualifier.datavalue;
}

export default class SortClaimsDialog extends PureComponent<PropsType, StateType> {

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
      const propertyId : ?string = this.props.propertyIdToComparators.keys().next().value;
      if ( !propertyId ) throw new Error( 'Assertion error: non-empty map keys iterator returned empty first key' );
      const comparator : ?DatavalueComparator = this.props.propertyIdToComparators.get( propertyId )[ 0 ];
      if ( !comparator ) throw new Error( 'Assertion error: non-empty map keys iterator returned empty first key value' );

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

  handleChange( { target: { name, value } } ) {
    this.setState( { [ name ]: value } );
  }

  handleComparatorChange( comparator : ?DatavalueComparator ) {
    this.setState( { comparator } );
  }

  handleSortClick() {
    this.props.onCloseClick();

    const { claims, onClaimsReorder } = this.props;
    const { comparator, emptyAs, order, propertyId } = this.state;
    const sortEmptyCompareConstant = emptyAs === 'asLast' ? +1 : -1;
    const sortOrderCompareConstant = order === 'asc' ? +1 : -1;
    const claimIds : string[] = claims.map( claim => claim.id );
    if ( !propertyId ) return;

    stableSort( claimIds, ( claimId1 : string, claimId2 : string ) => {
      const dataValue1 : ?DataValueType = findFirstQuailifierDataValue( claims, claimId1, propertyId );
      const dataValue2 : ?DataValueType = findFirstQuailifierDataValue( claims, claimId2, propertyId );

      if ( !dataValue1 && !dataValue2 ) return 0;
      return comparator.compare( dataValue1, dataValue2, sortEmptyCompareConstant, sortOrderCompareConstant );
    } );
    onClaimsReorder( claimIds );
  }

  render() {
    const { propertyIdToComparators } = this.props;
    const propertyIds = [ ...propertyIdToComparators.keys() ];
    const { comparator, propertyId } = this.state;
    const comparatorOptions : DatavalueComparator[] =
      ( propertyId ? propertyIdToComparators.get( propertyId ) : [] ) || [];

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
                { cache => <select name="propertyId" onChange={this.handleChange} value={propertyId || ''}>
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
