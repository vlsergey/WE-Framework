import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import i18n from './i18n';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import SnaksArrayEditor from 'components/snaks/SnaksArrayEditor';

export default class SingleQualifierEditor extends PureComponent {

  static propTypes = {
    claim: PropTypes.shape( Claim ).isRequired,
    claimPropertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    qualifierPropertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
  }

  constructor() {
    super( ...arguments );

    const { claimPropertyDescription, qualifierPropertyDescription } = this.props;
    this.confirmRemoveQualifierMessage = i18n.confirmRemoveQualifierTemplate
      .replace( '{claimPropertyId}', claimPropertyDescription.id )
      .replace( '{claimPropertyLabel}', claimPropertyDescription.label || claimPropertyDescription.id )
      .replace( '{qualifierPropertyId}', qualifierPropertyDescription.id )
      .replace( '{qualifierPropertyLabel}', qualifierPropertyDescription.label || qualifierPropertyDescription.id );

    this.handleSnaksArrayUpdate = this.handleSnaksArrayUpdate.bind( this );
  }

  handleSnaksArrayUpdate( snaksArray ) {
    this.props.onClaimUpdate( {
      ...this.props.claim,
      qualifiers: {
        ...( this.props.claim || {} ).qualifiers,
        [ this.props.qualifierPropertyDescription.id ]: snaksArray,
      },
    } );
  }

  render() {
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
