import React, {ChangeEvent, PureComponent} from 'react';

import PropertyDescriptionsProvider from '../../../caches/PropertyDescriptionsProvider';
import stableSort from '../../../utils/stableSort';
import DialogWrapper from '../../../wrappers/DialogWrapper';
import ComparatorSelect from './ComparatorSelect';
import comparators from './comparators';
import {ComparatorCode} from './DatavalueComparator';
import i18n from './i18n';
import styles from './SortClaimsDialog.css';

interface PropsType {
  claims: ClaimType[];
  onClaimsReorder: (claimIds: string[]) => any;
  onCloseClick: () => any;
  propertyIdToComparators: Map< string, ComparatorCode[] >;
}

interface StateType {
  comparatorCode: ComparatorCode | null;
  emptyAs: 'asLast' | 'asFirst';
  order: 'asc' | 'desc';
  propertyId: string | null;
}

function findFirstQuailifierDataValue (
    claims: ClaimType[],
    claimId: string,
    propertyId: string
): DataValueType | null {
  const claim: ClaimType | null = claims.find(({id}) => id === claimId) || null;
  if (!claim) return null;

  const qualifiersObject = claim.qualifiers;
  if (!qualifiersObject) return null;

  const qualifiersArray = qualifiersObject[propertyId];
  if (!qualifiersArray || qualifiersArray.length === 0) return null;

  const qualifier = qualifiersArray[0];
  if (!qualifier) return null;
  return qualifier.datavalue || null;
}

export default class SortClaimsDialog extends PureComponent<PropsType, StateType> {

  constructor (props: PropsType) {
    super(props);

    const firstPropertyEntry: [string, ComparatorCode[]] | null = this.props.propertyIdToComparators.entries().next().value;
    if (!firstPropertyEntry) {
      this.state = {
        emptyAs: 'asLast',
        comparatorCode: null,
        order: 'asc',
        propertyId: null,
      };
    } else {
      const propertyId: string = firstPropertyEntry[0];
      const comparatorCode = firstPropertyEntry[1][0] || null;
      if (!comparatorCode) throw new Error('Assertion error: non-empty map keys iterator returned empty first key value');

      this.state = {
        emptyAs: 'asLast',
        comparatorCode,
        order: 'asc',
        propertyId,
      };
    }
  }

  handleChange = ({currentTarget: {name, value}}: ChangeEvent< HTMLSelectElement >) => {
    // @ts-expect-error
    this.setState({[name]: value});
  };

  handleComparatorChange = (comparatorCode: ComparatorCode | null) => this.setState({comparatorCode});

  handleSortClick = () => {
    this.props.onCloseClick();

    const {claims, onClaimsReorder} = this.props;
    const {comparatorCode, emptyAs, order, propertyId} = this.state;
    const sortEmptyCompareConstant: number = emptyAs === 'asLast' ? +1 : -1;
    const sortOrderCompareConstant: number = order === 'asc' ? +1 : -1;
    const claimIds: string[] = claims.map(claim => claim.id);
    if (!propertyId || !comparatorCode) return;

    stableSort(claimIds, (claimId1: string, claimId2: string) => {
      const dataValue1: DataValueType | null = findFirstQuailifierDataValue(claims, claimId1, propertyId);
      const dataValue2: DataValueType | null = findFirstQuailifierDataValue(claims, claimId2, propertyId);

      if (!dataValue1 && !dataValue2) return 0;
      return comparators[comparatorCode].compare(dataValue1, dataValue2, sortEmptyCompareConstant, sortOrderCompareConstant);
    });
    onClaimsReorder(claimIds);
  };

  override render () {
    const {propertyIdToComparators} = this.props;
    const propertyIds = [...propertyIdToComparators.keys()];
    const {comparatorCode, propertyId} = this.state;
    const comparatorOptions = (propertyId ? propertyIdToComparators.get(propertyId) : []) || [];

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
                  {propertyIds.map(propertyId =>
                    <option
                      key={propertyId}
                      title={cache[propertyId]?.description}
                      value={propertyId}>
                      {cache[propertyId]?.label || ''}
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
                value={comparatorCode} />
            </td>
          </tr>
          <tr>
            <th>{i18n.fieldLabelSortOrder}</th>
            <td>
              <select name="order" onChange={this.handleChange} value={this.state.order}>
                <option value="asc">{i18n.optionSortOrderAsc}</option>
                <option value="desc">{i18n.optionSortOrderDesc}</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>{i18n.fieldLabelEmptyValuesSort}</th>
            <td>
              <select name="emptyAs" onChange={this.handleChange} value={this.state.emptyAs}>
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
