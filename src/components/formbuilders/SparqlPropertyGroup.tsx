import React from 'react';
import { usePropertiesBySparql } from '../../caches/propertiesBySparqlCache';
import Spinner from '../../components/Spinner';
import ChildrenBuilder from './ChildrenBuilder';
import styles from './SparqlPropertyGroup.css';

interface PropsType {
  sortBy?: string;
  sparql: string;
}

const SparqlPropertyGroup = ({
  sortBy = 'language, label',
  sparql,
} :PropsType) => {
  const propertyIds = usePropertiesBySparql(sparql);

  if (!propertyIds) {
    return <Spinner />;
  }

  return <div className={styles.sparql_property_group}>
    <ChildrenBuilder
      fields={propertyIds.map(propertyId => ({property: propertyId}))}
      quickSearch
      sortBy={sortBy.split(/[ ;,\t]/)} />
  </div>;
}

export default React.memo(SparqlPropertyGroup);
