import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import Pagination, {StrictPaginationProps} from 'semantic-ui-react/dist/commonjs/addons/Pagination';

import PropertyDescriptionsProvider from '../../caches/PropertyDescriptionsProvider';
import usePropertyDescription from '../../caches/usePropertyDescription';
import {FieldDefType} from '../../editors/EditorDefModel';
import PropertyClaimContainer from '../claims/PropertyClaimContainer';
import ErrorBoundary from './ErrorBoundary';
import FieldsSortBy from './FieldsSortBy';
import styles from './form.css';
import i18n from './i18n';
import useFilterByClaimPresence from './useFilterByClaimPresence';
import useFilterPropertiesByTerm from './useFilterPropertiesByTerm';

const FIELDS_PER_PAGE = 20;

interface PropsType {
  fields?: readonly FieldDefType[];
  // can be used to hide claim property label
  parentLabelEntityId?: string;
  quickSearch?: boolean;
  sortBy?: string[];
}

const EMPTY_ARRAY = Object.freeze([]);

const FieldsBuilder = ({
  fields = EMPTY_ARRAY,
  parentLabelEntityId,
  quickSearch,
  sortBy
}: PropsType) => {

  const [activePage, setActivePage] = useState(1);
  const [displayEmpty, setDisplayEmpty] = useState(true);
  const [quickSearchTerm, setQuickSearchTerm] = useState('');

  const handleDisplayEmptyToggle = useCallback(() =>
  { setDisplayEmpty(value => !value); }
  , [setDisplayEmpty]);

  const handlePageChange = useCallback((_event: React.MouseEvent<HTMLAnchorElement>, data: StrictPaginationProps) =>
  { setActivePage(Number(data.activePage)); }
  , [setActivePage]);

  const handleQuickSearchTermChange = useCallback(({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    setQuickSearchTerm(value || '');
  }, [setQuickSearchTerm]);

  const propertyIds = useMemo(() => fields.map(field => field.property), [fields]);

  const filteredByTerm = useFilterPropertiesByTerm(propertyIds, quickSearchTerm);
  const filteredByClaimPresence = useFilterByClaimPresence(!displayEmpty, filteredByTerm);

  if (filteredByClaimPresence.length == 0)
    return null;

  return <PropertyDescriptionsProvider propertyIds={propertyIds}>{cache =>
    <FieldsSortBy propertyDescriptionCache={cache} propertyIds={filteredByClaimPresence} sortBy={sortBy || []}>{sorted => {
      const totalPages = Math.ceil(sorted.length * 1.0 / FIELDS_PER_PAGE);
      const actualPage = Math.min(activePage, totalPages);
      const paged = sorted.slice((actualPage - 1) * FIELDS_PER_PAGE, actualPage * FIELDS_PER_PAGE);

      return <table className={styles.wef_table}>
        { quickSearch && <thead key="quickSearch">
          <tr>
            <td colSpan={99}>
              <table className={styles.quickSearchTable}>
                <tbody>
                  <tr>
                    <td width="20%">
                      <label>&nbsp;&nbsp;{i18n.labelQuickSearchTerm}&nbsp;&nbsp;&nbsp;<input
                        onChange={handleQuickSearchTermChange}
                        type="text"
                        value={quickSearchTerm} />
                      </label>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td width="20%">
                      <label>&nbsp;&nbsp;{i18n.labelDisplayEmpty}&nbsp;&nbsp;&nbsp;<input
                        checked={displayEmpty}
                        onChange={handleDisplayEmptyToggle}
                        type="checkbox" />
                      </label>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td className="shortPaginationCell" width="50%">
                      <Pagination
                        activePage={actualPage}
                        boundaryRange={1}
                        ellipsisItem="…"
                        onPageChange={handlePageChange}
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
          {paged.map(propertyId =>
            <ErrorBoundary description={'field: ' + JSON.stringify(propertyId)} key={propertyId}>
              <RenderField
                displayLabel={fields.length !== 1 || parentLabelEntityId !== propertyId}
                propertyId={propertyId} />
            </ErrorBoundary>
          )}
        </tbody>
      </table>;
    } }</FieldsSortBy>
  }</PropertyDescriptionsProvider>;
};

export default React.memo(FieldsBuilder);

const RenderField = ({
  displayLabel,
  propertyId,
}: {
  displayLabel?: boolean;
  propertyId: string;
}) => {
  const propertyDescription = usePropertyDescription(propertyId);

  if (!propertyDescription || !propertyDescription.label) {
    return <tr><td colSpan={99}>
      <i>Loading property description of {propertyId}...</i>
    </td></tr>;
  }

  return <PropertyClaimContainer
    displayLabel={displayLabel}
    propertyDescription={propertyDescription} />;
};
