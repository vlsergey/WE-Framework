import React, { PureComponent } from 'react';
import ChildrenBuilder from './ChildrenBuilder';
import PropertiesBySparqlProvider from 'caches/PropertiesBySparqlProvider';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';
import styles from './SparqlPropertyGroup.css';

export default class SparqlPropertyGroup extends PureComponent {

  static propTypes = {
    sparql: PropTypes.string.isRequired,
    sortBy: PropTypes.string,
  }

  static defaultProps = {
    sortBy: 'language, label',
  }

  render() {
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
