import React, { PureComponent } from 'react';
import ClaimEditors from './ClaimEditors';
import propertiesCacheContext from '../core/propertiesCacheContext';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class EditorPage extends PureComponent {

  render() {
    const { fields } = this.props;

    return <table className={styles.wef_table}>
      <propertiesCacheContext.Consumer>
        { propertiesCacheContext => 
          fields.map( fieldDescription => {

            const propertyId = fieldDescription.property;

            let actualLabel;
            if ( fieldDescription.label ) {
              actualLabel = fieldDescription.label;
            } else {
              const propertyDescription = propertiesCacheContext.getOrQueue( propertyId );
              if ( !propertyDescription || !propertyDescription.label )
                actualLabel = <span>{propertyId}</span>;
              else
                actualLabel = <span title={propertyDescription.description}>{propertyDescription.label}</span>;
            }

            return <ClaimEditors key={fieldDescription.property} label={actualLabel} propertyId={propertyId} />;

          } )
        }
      </propertiesCacheContext.Consumer>
    </table>;
  }

}

EditorPage.propTypes = {
  fields: PropTypes.array,
};
