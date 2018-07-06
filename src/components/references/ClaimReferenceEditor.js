import React, { PureComponent } from 'react';
import PropertyDescriptionsProvider from 'core/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import ReferencePropertySnaksEditor from './ReferencePropertySnaksEditor';
import styles from './references.css';

export default class ClaimReferenceEditor extends PureComponent {

  static propTypes = {
    onReferenceChange: PropTypes.func.isRequired,
    reference: PropTypes.object.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleSnaksChange = this.handleSnaksChange.bind( this );
  }

  handleSnaksChange( propertyId, snaks ) {
    const { onReferenceChange, reference } = this.props;
    onReferenceChange( {
      ...reference,
      snaks: {
        ...reference.snaks,
        [ propertyId ]: snaks,
      },
    } );
  }

  render() {
    const { reference } = this.props;
    const snaks = reference.snaks || {};
    const propertyIds = Object.keys( snaks );

    return <table className={styles.claimReferenceEditor}>
      <tbody>
        <PropertyDescriptionsProvider propertyIds={propertyIds}>{ cache =>
          propertyIds.map( propertyId => {
            const propertyDescription = cache[ propertyId ];
            if ( !propertyDescription ) {
              return <tr>
                <td colSpan={99}>
                  <i>Loading property description of {propertyId}...</i>
                </td>
              </tr>;
            }
            return <ReferencePropertySnaksEditor
              key={propertyId}
              onSnaksChange={this.handleSnaksChange}
              propertyDescription={propertyDescription}
              snaks={snaks[ propertyId ]} />;
          } )
        }</PropertyDescriptionsProvider>
      </tbody>
    </table>;
  }

}
