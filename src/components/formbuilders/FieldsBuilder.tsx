import React, { ChangeEvent, PureComponent } from 'react';
import ErrorBoundary from './ErrorBoundary';
import type { FieldDefType } from '../../editors/EditorDefModel';
import FieldsFilterByClaimExistence from './FieldsFilterByClaimExistence';
import FieldsFilterByTerm from './FieldsFilterByTerm';
import FieldsSortBy from './FieldsSortBy';
import i18n from './i18n';
import Pagination, {StrictPaginationProps} from 'semantic-ui-react/dist/commonjs/addons/Pagination';
import PropertyClaimContainer from '../claims/PropertyClaimContainer';
import PropertyDescription from '../../core/PropertyDescription';
import PropertyDescriptionsProvider from '../../caches/PropertyDescriptionsProvider';
import styles from './form.css';

const FIELDS_PER_PAGE = 20;

type PropsType = {
  fields? : FieldDefType[],
  // can be used to hide claim property label
  parentLabelEntityId? : string,
  quickSearch? : boolean,
  sortBy? : string[],
};

type StateType = {
  activePage : number,
  displayEmpty : boolean,
  quickSearchTerm : string,
};

export default class FieldsBuilder extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    parentLabelEntityId: null,
    quickSearch: false,
  }

  override state = {
    activePage: 1,
    displayEmpty: true,
    quickSearchTerm: '',
  };

  handleDisplayEmptyToggle = () =>
    this.setState( ( { displayEmpty } ) => ( { displayEmpty: !displayEmpty } ) );

  handlePageChange = ( _event: React.MouseEvent<HTMLAnchorElement>, data: StrictPaginationProps ) =>
    this.setState( { activePage: Number(data.activePage) } );

  handleQuickSearchTermChange = ( { currentTarget: { value } } : ChangeEvent< HTMLInputElement > ) => {
    this.setState( { quickSearchTerm: value || '' } );
  }

  renderField(
    field : FieldDefType,
    propertyDescription? : PropertyDescription,
    etc : any = {}
  ) {
    const propertyId = field.property;

    if ( !propertyDescription || !propertyDescription.label ) {
      return <tr><td colSpan={99}>
        <i>Loading property description of {propertyId}...</i>
      </td></tr>;
    }

    return <PropertyClaimContainer
      {...etc}
      propertyDescription={propertyDescription} />;
  }

  override render() {
    const { fields, parentLabelEntityId, quickSearch, sortBy } = this.props;
    const { activePage, displayEmpty, quickSearchTerm } = this.state;

    if ( !fields || fields.length == 0 )
      return null;

    return <PropertyDescriptionsProvider propertyIds={fields.map( field => field.property )}>{cache =>
      <FieldsFilterByTerm fields={fields} propertyDescriptionCache={cache} term={quickSearchTerm}>{filteredByTerm =>
        <FieldsFilterByClaimExistence enabled={!displayEmpty} fields={filteredByTerm}>{filtered =>
          <FieldsSortBy fields={filtered || []} propertyDescriptionCache={cache} sortBy={sortBy || []}>{sorted => {
            const totalPages = Math.ceil( sorted.length * 1.0 / FIELDS_PER_PAGE );
            const actualPage = Math.min( activePage, totalPages );
            const paged = sorted.slice( ( actualPage - 1 ) * FIELDS_PER_PAGE, actualPage * FIELDS_PER_PAGE );

            return <table className={styles.wef_table}>
              { quickSearch && <thead key="quickSearch">
                <tr>
                  <td colSpan={99}>
                    <table className={styles.quickSearchTable}>
                      <tbody>
                        <tr>
                          <td width="20%">
                            <label>&nbsp;&nbsp;{i18n.labelQuickSearchTerm}&nbsp;&nbsp;&nbsp;<input
                              onChange={this.handleQuickSearchTermChange}
                              type="text"
                              value={quickSearchTerm} />
                            </label>
                          </td>
                          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                          <td width="20%">
                            <label>&nbsp;&nbsp;{i18n.labelDisplayEmpty}&nbsp;&nbsp;&nbsp;<input
                              checked={displayEmpty}
                              onChange={this.handleDisplayEmptyToggle}
                              type="checkbox" />
                            </label>
                          </td>
                          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                          <td className="shortPaginationCell" width="50%">
                            <Pagination
                              activePage={actualPage}
                              boundaryRange={1}
                              ellipsisItem="…"
                              onPageChange={this.handlePageChange}
                              siblingRange={1}
                              totalPages={totalPages} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </thead> }
              <tbody>
                {paged.map( field =>
                  <ErrorBoundary description={'field: ' + JSON.stringify( field )} key={field.property}>
                    {this.renderField( field, cache[ field.property ], {
                      displayLabel: fields.length !== 1 || parentLabelEntityId !== field.property,
                    } )}
                  </ErrorBoundary>
                )}
              </tbody>
            </table>;
          } }</FieldsSortBy>
        }</FieldsFilterByClaimExistence>
      }</FieldsFilterByTerm>
    }</PropertyDescriptionsProvider>;
  }
}
