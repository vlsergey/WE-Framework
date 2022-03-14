import React, { PureComponent } from 'react';
import ChildrenBuilder from './ChildrenBuilder';
import PropertiesBySparqlProvider from '../../caches/PropertiesBySparqlProvider';
import Spinner from '../../components/Spinner';
import styles from './SparqlPropertyGroup.css';

type PropsType = {
  sortBy : string,
  sparql : string,
};

export default class SparqlPropertyGroup extends PureComponent<PropsType> {

  static defaultProps = {
    sortBy: 'language, label',
  };

  override render() {
    const { sortBy, sparql } = this.props;

    return <PropertiesBySparqlProvider sparql={sparql}>
      { propertyIds => {

        if ( !propertyIds ) {
          return <Spinner />;
        }

        return <div className={styles.sparql_property_group}>
          <ChildrenBuilder
            fields={propertyIds.map( propertyId => ( { property: propertyId } ) )}
            quickSearch
            sortBy={sortBy.split( /[ ;,\t]/ )} />
        </div>;
      } }
    </PropertiesBySparqlProvider>;
  }

}
