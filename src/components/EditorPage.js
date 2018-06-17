import React, { PureComponent } from 'react';
import ClaimEditors from './ClaimEditors';
import LanguageSelectContainer from './labelalike/LanguageSelectContainer';
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

            if ( fieldDescription.type === 'LabelsAndDescriptionArea' ) {
              return <tbody key="_LabelalikesContainer"><tr><td colSpan={ClaimEditors.TABLE_COLUMNS}>
                <LanguageSelectContainer />
              </td></tr></tbody>;
            }

            const propertyId = fieldDescription.property;
            const propertyDescription = propertiesCacheContext.getOrQueue( propertyId );
            if ( !propertyDescription || !propertyDescription.label ) {
              return <tbody key={fieldDescription.property}><tr><td colSpan={ClaimEditors.TABLE_COLUMNS}>
                <span>Loading property description of {propertyId}...</span>
              </td></tr></tbody>;
            }

            const actualLabel = fieldDescription.label
              ? fieldDescription.label
              : <span title={propertyDescription.description}>{propertyDescription.label}</span>;

            return <ClaimEditors key={fieldDescription.property} label={actualLabel} propertyDescription={propertyDescription} />;
          } )
        }
      </propertiesCacheContext.Consumer>
    </table>;
  }

}

EditorPage.propTypes = {
  fields: PropTypes.array,
};
