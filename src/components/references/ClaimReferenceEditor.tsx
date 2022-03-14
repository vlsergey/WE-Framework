import React, {PureComponent} from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import generateRandomString from '../../utils/generateRandomString';
import SnaksMapEditor from '../snaks/SnaksMapEditor';
import i18n from './i18n';
import ReferencePropertySelect from './ReferencePropertySelect';
import styles from './references.css';

const EMPTY_OBJECT = Object.freeze({});

interface PropsType {
  onReferenceChange: (ref: ReferenceType) => any;
  reference: ReferenceType;
}

export default class ClaimReferenceEditor extends PureComponent<PropsType> {

  handleReferencePropertyAdd = (propertyId: string) => {
    const {onReferenceChange, reference} = this.props;
    const existing = (reference.snaks || {})[propertyId] || [];

    onReferenceChange({
      ...reference,
      snaks: {
        ...reference.snaks,
        [propertyId]: [
          ...existing,
          {
            snaktype: 'value',
            property: propertyId,
            hash: generateRandomString(),
          },
        ],
      },
    });
  };

  handleSnaksMapUpdate = (snaks: SnaksType) =>
    this.props.onReferenceChange({
      ...this.props.reference,
      snaks,
    });

  removeButtonConfirmMessageF (snakPropertyDescription: PropertyDescription) {
    return i18n.confirmRemoveSnakTemplate
      .replace('{snakPropertyId}', snakPropertyDescription.id)
      .replace('{snakPropertyLabel}', snakPropertyDescription.label || snakPropertyDescription.id);
  }

  override render () {
    const {reference} = this.props;
    const snaks: SnaksType = reference.snaks || EMPTY_OBJECT;
    const propertyIds = Object.keys(snaks);

    return <table className={styles.claimReferenceEditor}>
      <SnaksMapEditor
        onSnaksMapUpdate={this.handleSnaksMapUpdate}
        removeButtonConfirmMessageF={this.removeButtonConfirmMessageF}
        removeButtonLabel={i18n.buttonTitleRemoveQualifier}
        snaksMap={reference.snaks} />
      <tbody>
        <tr>
          <td colSpan={99}>
            <ReferencePropertySelect
              alreadyPresent={propertyIds}
              onSelect={this.handleReferencePropertyAdd} />
          </td>
        </tr>
      </tbody>
    </table>;
  }

}
