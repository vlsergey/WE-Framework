import React, {useMemo} from 'react';
import {connect} from 'react-redux';

import {FieldDefType} from '../../editors/EditorDefModel';

interface FieldsFilterByClaimExistencePropsType {
  children: (filtered?: FieldDefType[]) => any;
  claims?: ClaimsType;
  fields: FieldDefType[];
}

const FieldsFilterByClaimExistence = ({children, claims, fields}: FieldsFilterByClaimExistencePropsType) => {

  const propertyIdsWithClaims = useMemo(() => !claims ? new Set<string>() :
    new Set(Object.entries(claims).filter(([, propClaims]) => propClaims?.length !== 0).map(([propertyId]) => propertyId))
  , [claims]);

  const filtered = useMemo(() =>
    fields.filter(field => propertyIdsWithClaims.has(field.property))
  , [fields, propertyIdsWithClaims]);

  return children(filtered);
};

const mapStateToProps = ({entity: {claims}}: ReduxState) => ({
  claims,
});

const FilterConnected = connect(mapStateToProps)(FieldsFilterByClaimExistence);

interface FilterPropsType {
  children: (fields?: FieldDefType[]) => any;
  enabled: boolean;
  fields: FieldDefType[];
}

const Filter = ({children, enabled, fields}: FilterPropsType) => enabled
  ? <FilterConnected fields={fields} key="FieldsFilterByClaimExistence">{children}</FilterConnected>
  : <div key="FieldsFilterByClaimExistence">{children(fields)}</div>;
export default React.memo(Filter);
