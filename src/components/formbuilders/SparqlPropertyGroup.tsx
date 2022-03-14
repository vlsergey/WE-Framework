import React, {PureComponent} from 'react';

import PropertiesBySparqlProvider from '../../caches/PropertiesBySparqlProvider';
import Spinner from '../../components/Spinner';
import ChildrenBuilder from './ChildrenBuilder';
import styles from './SparqlPropertyGroup.css';

interface PropsType {
  sortBy: string;
  sparql: string;
}

export default class SparqlPropertyGroup extends PureComponent<PropsType> {

  static defaultProps = {
    sortBy: 'language, label',
  };

  override render () {
    const {sortBy, sparql} = this.props;

    return <PropertiesBySparqlProvider sparql={sparql}>
      { propertyIds => {

        if (!propertyIds) {
          return <Spinner />;
        }

        return <div className={styles.sparql_property_group}>
          <ChildrenBuilder
            fields={propertyIds.map(propertyId => ({property: propertyId}))}
            quickSearch
            sortBy={sortBy.split(/[ ;,\t]/)} />
        </div>;
      } }
    </PropertiesBySparqlProvider>;
  }

}
