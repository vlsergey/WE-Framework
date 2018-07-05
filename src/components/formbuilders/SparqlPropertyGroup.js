import React, { Component } from 'react';
import ChildrenBuilder from './ChildrenBuilder';
import { FadeLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import styles from './SparqlPropertyGroup.css';

export default class SparqlPropertyGroup extends Component {

  static propTypes = {
    sparql: PropTypes.string.isRequired,
    sortBy: PropTypes.string,
  }

  static defaultProps = {
    sortBy: 'language, label',
  }

  constructor() {
    super( ...arguments );

    this.state = {
      properties: [],
      state: 'LOADING',
    };
  }

  componentDidMount() {
    const { sparql } = this.props;

    const url = 'https://query.wikidata.org/sparql?query=' + encodeURIComponent( sparql );
    fetch( url, {
      headers: {
        Accept: 'application/sparql-results+json',
      },
    } )
      .then( body => body.json() )
      .then( json => {
        const columnName = json.head.vars[ 0 ];
        const properties = json.results.bindings.map( binding => {
          const type = binding[ columnName ].type;
          if ( type != 'uri' ) {
            throw new Error( 'SPARQL result column type must be \'uri\'' );
          }
          const value = binding[ columnName ].value;
          if ( !value.startsWith( 'http://www.wikidata.org/entity/P' ) ) {
            throw new Error( 'SPARQL result column value must start \'http://www.wikidata.org/entity/P\'' );
          }
          return {
            property: value.substr( 'http://www.wikidata.org/entity/'.length ),
          };
        } );
        this.setState( {
          properties,
          state: 'LOADED',
        } );
      } ).catch( () => {
        mw.log.error( ...arguments );
        this.setState( {
          state: 'ERROR',
        } );
      } );
  }

  render() {
    const { sortBy, sparql } = this.props;
    const { properties, state } = this.state;

    if ( state === 'LOADING' ) {
      return <FadeLoader />;
    }

    if ( state === 'ERROR' ) {
      return 'Unable to load properties using SPARQL ' + sparql;
    }

    return <div className={styles.sparql_property_group}>
      <ChildrenBuilder
        fields={properties}
        quickSearch
        sortBy={sortBy.split( /[ ;,\t]/ )} />
    </div>;
  }

}
