import React, { PureComponent } from 'react';
import { ChildrenContainer } from './FormShapes';
import ClaimEditors from 'components/ClaimEditors';
import EntityLabel from 'components/EntityLabel';
import ErrorBoundary from './ErrorBoundary';
import expect from 'expect';
import LanguageSelectContainer from 'components/labelalike/LanguageSelectContainer';
import propertiesCacheContext from 'core/propertiesCacheContext';
import styles from 'components/core.css';

export default class ChildrenBuilder extends PureComponent {

  static propTypes = ChildrenContainer;

  render() {
    return <React.Fragment>
      {this.renderSpecials()}
      {this.renderFields()}
      {this.renderFieldsets()}
    </React.Fragment>;
  }

  renderField( propertiesCacheContext, field ) {
    expect ( field ).toBeAn( 'object' );

    const propertyId = field.property;
    expect ( propertyId ).toBeAn( 'string',
      'Property attribute is not specified in field description: ' + JSON.stringify( field ) );

    const propertyDescription = propertiesCacheContext.getOrQueue( propertyId );
    if ( !propertyDescription || !propertyDescription.label ) {
      return <tbody><tr><td colSpan={ClaimEditors.TABLE_COLUMNS}>
        <span>Loading property description of {propertyId}...</span>
      </td></tr></tbody>;
    }

    const actualLabel = field.label
      ? field.label
      : <span title={propertyDescription.description}>{propertyDescription.label}</span>;

    return <ClaimEditors label={actualLabel} propertyDescription={propertyDescription} />;
  }

  renderFields() {
    const { fields } = this.props;
    if ( !fields || fields.length == 0 )
      return null;

    return <table className={styles.wef_table}>
      <propertiesCacheContext.Consumer>
        { propertiesCacheContext =>
          fields.map( field =>
            <ErrorBoundary description={'field: ' + JSON.stringify( field )} key={field.property}>
              {this.renderField( propertiesCacheContext, field )}
            </ErrorBoundary>
          )
        }
      </propertiesCacheContext.Consumer>
    </table>;
  }

  renderFieldset( fieldset ) {
    expect ( fieldset ).toBeAn( 'object' );

    return <fieldset >
      { fieldset.label && <legend>{fieldset.label}</legend> }
      { fieldset.labelEntityId && <legend>
        <EntityLabel entityId={fieldset.labelEntityId} />
      </legend> }
      <ChildrenBuilder {...fieldset} />
    </fieldset>;
  }

  renderFieldsets() {
    const { fieldsets } = this.props;
    if ( !fieldsets || fieldsets.length === 0 )
      return null;

    return fieldsets.map( ( fieldset, index ) =>
      <ErrorBoundary description={'fieldset: ' + JSON.stringify( fieldset )} key={fieldset.key || 'fieldset-' + index}>
        {this.renderFieldset( fieldset )}
      </ErrorBoundary>
    );
  }

  renderSpecials() {
    const { specials } = this.props;
    if ( !specials || specials.length == 0 )
      return null;

    return specials.map( ( { key, type } ) => {
      if ( type === 'LabelsAndDescriptionArea' ) {
        return <LanguageSelectContainer key={key || type} />;
      }
      return <span key={key || type}>unsupported special type: {type}</span>;
    } );
  }

}
