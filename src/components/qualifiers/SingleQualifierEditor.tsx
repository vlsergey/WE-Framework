import React, { PureComponent } from 'react';
import i18n from './i18n';
import PropertyDescription from '../../core/PropertyDescription';
import SnaksArrayEditor from '../snaks/SnaksArrayEditor';

type PropsType = {
  claim : ClaimType,
  claimPropertyDescription : PropertyDescription,
  onClaimUpdate : (claim : ClaimType) => any,
  qualifierPropertyDescription : PropertyDescription,
};

export default class SingleQualifierEditor extends PureComponent<PropsType> {

  confirmRemoveQualifierMessage : string;

  constructor(props : PropsType) {
    super( props );

    const { claimPropertyDescription, qualifierPropertyDescription } = this.props;
    this.confirmRemoveQualifierMessage = i18n.confirmRemoveQualifierTemplate
      .replace( '{claimPropertyId}', claimPropertyDescription.id )
      .replace( '{claimPropertyLabel}', claimPropertyDescription.label || claimPropertyDescription.id )
      .replace( '{qualifierPropertyId}', qualifierPropertyDescription.id )
      .replace( '{qualifierPropertyLabel}', qualifierPropertyDescription.label || qualifierPropertyDescription.id );
  }

  handleSnaksArrayUpdate = ( snaksArray : null | SnakType[] ) => {
    const qualifierPropertyId = this.props.qualifierPropertyDescription.id;
    const newClaim : ClaimType = {
      ...this.props.claim,
      qualifiers: {
        ...( this.props.claim || {} ).qualifiers,
        [ qualifierPropertyId ]: snaksArray || [],
      },
    }
    this.props.onClaimUpdate( newClaim );
  }

  override render() {
    const { claim, qualifierPropertyDescription } = this.props;
    const propertyId = qualifierPropertyDescription.id;

    return <SnaksArrayEditor
      displayEmpty
      displayLabels={false}
      onSnaksArrayUpdate={this.handleSnaksArrayUpdate}
      propertyDescription={qualifierPropertyDescription}
      readOnly={false}
      removeButtonConfirmMessage={this.confirmRemoveQualifierMessage}
      removeButtonLabel={i18n.buttonLabelRemoveQualifier}
      snaksArray={( claim.qualifiers || {} )[ propertyId ]} />;
  }

}
