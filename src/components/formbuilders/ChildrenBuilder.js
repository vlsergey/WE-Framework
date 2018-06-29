import React, { PureComponent } from 'react';
import { ChildrenContainer } from './FormShapes';
import ClaimEditors from 'components/ClaimEditors';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import { defaultMemoize } from 'reselect';
import EntityLabel from 'caches/EntityLabel';
import ErrorBoundary from './ErrorBoundary';
import expect from 'expect';
import LanguageSelectContainer from 'components/labelalike/LanguageSelectContainer';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'core/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import SparqlPropertyGroup from './SparqlPropertyGroup';
import styles from 'components/core.css';

function compare( a, b ) {
  if ( typeof a === 'undefined' && typeof b === 'undefined' )
    return 0;
  if ( typeof a === 'undefined' && typeof b !== 'undefined' )
    return 1;
  if ( typeof a !== 'undefined' && typeof b === 'undefined' )
    return -1;

  if ( a < b ) {
    return -1;
  } else if ( a > b ) {
    return 1;
  } else {
    return 0;
  }
}

const compareByLabel = ( a, b ) => compare( a.label, b.label );

function compareLanguageCodes( a, b ) {
  const empty = x => typeof x === 'undefined' || x === null || x.length == 0;
  if ( empty( a ) && empty( b ) ) return 0;
  if ( empty( a ) && !empty( b ) ) return +1;
  if ( !empty( a ) && empty( b ) ) return -1;

  for ( let i = 0; i < DEFAULT_LANGUAGES.length; i++ ) {
    const lc = DEFAULT_LANGUAGES[ i ];
    if ( a.indexOf( lc ) === -1 && b.indexOf( lc ) !== -1 ) return +1;
    if ( a.indexOf( lc ) !== -1 && b.indexOf( lc ) === -1 ) return -1;
  }

  const aFirst = [ ...a ].sort()[ 0 ];
  const bFirst = [ ...a ].sort()[ 0 ];
  return compare( aFirst, bFirst );
}

const compareByLanguageCodes = ( a, b ) => compareLanguageCodes( a.languageCodes, b.languageCodes );

export default class ChildrenBuilder extends PureComponent {

  static propTypes = {
    ...ChildrenContainer,
    sortBy: PropTypes.arrayOf( PropTypes.string ),
  };

  sort = defaultMemoize( ( cache, fields, sortBy ) => {
    const result = fields.map( field => ( {
      ...field,
      ...cache[ field.property ],
    } ) );
    for ( let sortByIndex = sortBy.length; sortByIndex >= 0; sortByIndex-- ) {
      switch ( sortBy[ sortByIndex ] ) {
      case 'language': result.sort( compareByLanguageCodes ); break;
      case 'label': result.sort( compareByLabel ); break;
      default: mw.log( 'Unknown sort method: ' + sortBy[ sortByIndex ] ); break;
      }
    }
    return result.map( item => ( { property: item.property } ) );
  } );

  render() {
    return <React.Fragment>
      {this.renderSpecials()}
      {this.renderFields()}
      {this.renderFieldsets()}
    </React.Fragment>;
  }

  renderField( field, propertyDescription ) {
    expect ( field ).toBeAn( 'object' );
    const propertyId = field.property;
    expect ( propertyId ).toBeAn( 'string',
      'Property attribute is not specified in field description: ' + JSON.stringify( field ) );

    if ( !propertyDescription || !propertyDescription.label ) {
      return <tbody><tr><td colSpan={ClaimEditors.TABLE_COLUMNS}>
        <span>Loading property description of {propertyId}...</span>
      </td></tr></tbody>;
    }
    expect ( propertyDescription ).toBeA( PropertyDescription );

    const actualLabel = field.label
      ? field.label
      : <span title={propertyDescription.description}>{propertyDescription.label}</span>;

    return <ClaimEditors label={actualLabel} propertyDescription={propertyDescription} />;
  }

  renderFields() {
    const { fields, sortBy } = this.props;
    if ( !fields || fields.length == 0 )
      return null;

    return <PropertyDescriptionsProvider propertyIds={fields.map( field => field.property )}>
      {cache => {
        const sorted = !!sortBy && sortBy.length > 0 ? this.sort( cache, fields, sortBy ) : fields;

        return <table className={styles.wef_table}>{
          sorted.map( field =>
            <ErrorBoundary description={'field: ' + JSON.stringify( field )} key={field.property}>
              {this.renderField( field, cache[ field.property ] )}
            </ErrorBoundary>
          )
        } </table>;
      } }
    </PropertyDescriptionsProvider>;
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

    return specials.map( special => {
      const { key, type } = special;
      if ( type === 'LabelsAndDescriptionArea' ) {
        return <LanguageSelectContainer key={key || type} />;
      }
      if ( type === 'SparqlPropertyGroup' ) {
        return <SparqlPropertyGroup {...special} key={key || type} />;
      }
      return <span key={key || type}>unsupported special type: {type}</span>;
    } );
  }

}
