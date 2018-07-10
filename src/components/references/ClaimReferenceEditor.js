import React, { PureComponent } from 'react';
import generateRandomString from 'utils/generateRandomString';
import i18n from './i18n';
import PropTypes from 'prop-types';
import ReferencePropertySelect from './ReferencePropertySelect';
import SnaksMapEditor from 'components/snaks/SnaksMapEditor';
import styles from './references.css';

export default class ClaimReferenceEditor extends PureComponent {

  static propTypes = {
    onReferenceChange: PropTypes.func.isRequired,
    reference: PropTypes.object.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleReferencePropertyAdd = this.handleReferencePropertyAdd.bind( this );
    this.handleSnaksMapUpdate = this.handleSnaksMapUpdate.bind( this );
  }

  handleReferencePropertyAdd( propertyId ) {
    const { onReferenceChange, reference } = this.props;
    const existing = ( reference.snaks || {} )[ propertyId ] || [];

    onReferenceChange( {
      ...reference,
      snaks: {
        ...reference.snaks,
        [ propertyId ]: [
          ...existing,
          {
            snaktype: 'value',
            property: propertyId,
            hash: generateRandomString(),
          },
        ],
      },
    } );
  }

  handleSnaksMapUpdate( snaks ) {
    this.props.onReferenceChange( {
      ...this.props.reference,
      snaks,
    } );
  }

  removeButtonConfirmMessageF( snakPropertyDescription ) {
    return i18n.confirmRemoveSnakTemplate
      .replace( '{snakPropertyId}', snakPropertyDescription.id )
      .replace( '{snakPropertyLabel}', snakPropertyDescription.label || snakPropertyDescription.id );
  }

  render() {
    const { reference } = this.props;
    const snaks = reference.snaks || {};
    const propertyIds = Object.keys( snaks );

    return <table className={styles.claimReferenceEditor}>
      <SnaksMapEditor
        addButtonLabel={i18n.buttonLabelAddQualifier}
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
