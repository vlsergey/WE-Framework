import React, { PureComponent } from 'react';
import { ChildrenContainer } from './FormShapes';
import compare from 'utils/compare';
import compareLanguageCodes from 'utils/compareLanguageCodes';
import { defaultMemoize } from 'reselect';
import ErrorBoundary from './ErrorBoundary';
import expect from 'expect';
import i18n from './i18n';
import PropertyClaimContainer from 'components/claims/PropertyClaimContainer';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import stableSort from 'utils/stableSort';
import styles from 'components/core.css';

const compareByLabel = ( a, b ) => compare( a.label, b.label );

const compareByLanguageCodes = ( a, b ) => compareLanguageCodes( a.languageCodes, b.languageCodes );

export default class FieldsBuilder extends PureComponent {

  static propTypes = {
    ...ChildrenContainer,
    quickSearch: PropTypes.bool,
    // can be used to hide claim property label
    parentLabelEntityId: PropTypes.string,
    sortBy: PropTypes.arrayOf( PropTypes.string ),
  };

  static defaultProps = {
    parentLabelEntityId: null,
    quickSearch: false,
  }


  constructor() {
    super( ...arguments );

    this.state = {
      displayEmpty: true,
      quickSearchTerm: '',
    };

    this.handleDisplayEmptyToggle = () => this.setState( state => ( { displayEmpty: !state.displayEmpty } ) );
    this.handleQuickSearchTermChange = event => this.setState( { quickSearchTerm: event.target.value || '' } );
  }

  filterByTerm = defaultMemoize( ( cache, sorted, originalTerm ) => {
    if ( !originalTerm || originalTerm.trim() === '' ) return sorted;
    const term = originalTerm.trim().toLowerCase();

    let toFilter = sorted.map( field => ( {
      ...field,
      ...cache[ field.property ],
    } ) );

    const result = [];

    const filterImpl = ( fieldF, checkF ) => {
      toFilter = toFilter.filter( item => {
        const fieldValue = fieldF( item );
        if ( typeof fieldValue === 'string' && checkF( fieldValue.toLowerCase() ) ) {
          result.push( item );
          return false;
        }
        return true;
      } );
    };

    // TODO: aliases? other languages?
    filterImpl( item => item.label, value => value.startsWith( term ) );
    filterImpl( item => item.description, value => value.startsWith( term ) );
    filterImpl( item => item.label, value => value.indexOf( term ) !== -1 );
    filterImpl( item => item.description, value => value.indexOf( term ) !== -1 );

    return result.map( item => ( { property: item.property } ) );
  } );

  sort = defaultMemoize( ( cache, fields, sortBy ) => {
    const result = fields.map( field => ( {
      ...field,
      ...cache[ field.property ],
    } ) );
    for ( let sortByIndex = sortBy.length - 1; sortByIndex >= 0; sortByIndex-- ) {
      const sortMethod = sortBy[ sortByIndex ];
      if ( !sortMethod ) continue;

      switch ( sortMethod ) {
      case 'language': stableSort( result, compareByLanguageCodes ); break;
      case 'label': stableSort( result, compareByLabel ); break;
      default: mw.log( 'Unknown sort method: ' + sortMethod ); break;
      }
    }
    return result.map( item => ( { property: item.property } ) );
  } );


  renderField( field, propertyDescription, props = {} ) {
    expect ( field ).toBeAn( 'object' );
    const propertyId = field.property;
    expect ( propertyId ).toBeAn( 'string',
      'Property attribute is not specified in field description: ' + JSON.stringify( field ) );

    if ( !propertyDescription || !propertyDescription.label ) {
      return <tr><td colSpan={99}>
        <i>Loading property description of {propertyId}...</i>
      </td></tr>;
    }
    expect ( propertyDescription ).toBeA( PropertyDescription );
    return <PropertyClaimContainer
      {...props}
      propertyDescription={propertyDescription} />;
  }

  render() {
    const { fields, parentLabelEntityId, quickSearch, sortBy } = this.props;
    const { displayEmpty, quickSearchTerm } = this.state;

    if ( !fields || fields.length == 0 )
      return null;

    return <PropertyDescriptionsProvider propertyIds={fields.map( field => field.property )}>
      {cache => {
        const sorted = !!sortBy && sortBy.length > 0 ? this.sort( cache, fields, sortBy ) : fields;
        const filtered = this.filterByTerm( cache, sorted, quickSearchTerm );

        return <table className={styles.wef_table}>
          { quickSearch && <thead className={styles.quickSearch} key="quickSearch">
            <tr>
              <td colSpan={99}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>&nbsp;&nbsp;{i18n.labelQuickSearchTerm}&nbsp;&nbsp;&nbsp;<input
                          onChange={this.handleQuickSearchTermChange}
                          type="text"
                          value={quickSearchTerm} />
                        </label>
                      </td>
                      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                      <td>
                        <label>&nbsp;&nbsp;{i18n.labelDisplayEmpty}&nbsp;&nbsp;&nbsp;<input
                          checked={displayEmpty}
                          onChange={this.handleDisplayEmptyToggle}
                          type="checkbox" />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </thead>
          }
          <tbody>{filtered.map( field =>
            <ErrorBoundary description={'field: ' + JSON.stringify( field )} key={field.property}>
              {this.renderField( field, cache[ field.property ], {
                displayEmpty,
                displayLabel: fields.length !== 1 || parentLabelEntityId !== field.property,
              } )}
            </ErrorBoundary>
          )}</tbody>
        </table>;
      } }
    </PropertyDescriptionsProvider>;

  }

}
