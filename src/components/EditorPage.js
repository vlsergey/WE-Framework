import React, { PureComponent } from 'react';
import ClaimEditors from './ClaimEditors';
import { Entity } from '../model/Shapes';
import propertiesCacheContext from '../core/propertiesCacheContext';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class EditorPage extends PureComponent {

  render() {
    const { entity, fields } = this.props;

    return <table className={styles.wef_table}>
      <tbody>
        <propertiesCacheContext.Consumer>
          { propertiesCacheContext => 
            fields.map( fieldDescription => {

              const code = fieldDescription.code;
              const isPropertyEditor = /^P\d+$/i.test( code );

              let actualLabel;
              if ( fieldDescription.label ) {
                actualLabel = fieldDescription.label;
              } else if ( isPropertyEditor ) {
                const propertyDescription = propertiesCacheContext.getOrQueue( code );
                if ( !propertyDescription || !propertyDescription.label )
                  actualLabel = <span>{code}</span>;
                else
                  actualLabel = <span title={propertyDescription.description}>{propertyDescription.label}</span>;
              } else {
                // TODO: qualifier value label 
                actualLabel = code;
              }

              return <ClaimEditors code={fieldDescription.code} entity={entity} key={fieldDescription.code} label={actualLabel} />;

            } )
          }
        </propertiesCacheContext.Consumer>
      </tbody>
    </table>;
  }

}

EditorPage.propTypes = {
  entity: PropTypes.shape( Entity ).isRequired,
  fields: PropTypes.array,
};
