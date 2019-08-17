import React, { PureComponent } from 'react';
import compare from 'utils/compare';
import { EditorShape } from 'components/formbuilders/FormShapes';
import { getEntityIdDeferred } from 'core/ApiUtils';
import i18n from './i18n';
import { onEditorLinkClick } from 'core/edit';
import PropTypes from 'prop-types';
import { start } from './index';

export default class EditorLinks extends PureComponent {

  static propTypes = {
    editorTemplates: PropTypes.arrayOf( PropTypes.shape( EditorShape ) ),
  };

  SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';
  ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';
  ENTITY_PREFIX = 'wd:';
  INSTANCEOF_PROP = 'wdt:P31';
  SUBCLASS_PROP = 'wdt:P279';

  constructor() {
    super( ...arguments );
    this.state = {
      classIds: [],
      entityId: null,
    };
  }

  componentDidMount() {
    if ( mw.config.get( 'wgArticleId' ) ) {
      getEntityIdDeferred().then( entityId => {
        this.setState( { entityId } );
        if ( entityId ) {
          this.queryClassHierarchy( entityId );
        }
      } );
    }
  }

  queryClassHierarchy( entityId ) {
    const url = this.SPARQL_ENDPOINT + '?query='
      + encodeURIComponent( `SELECT DISTINCT ?type WHERE { ${this.ENTITY_PREFIX}${entityId} ${this.INSTANCEOF_PROP} ?childClass . ?childClass ${this.SUBCLASS_PROP}* ?type }` );
    return fetch( url, {
      headers: {
        Accept: 'application/sparql-results+json',
      },
    } )
      .then( body => body.json() )
      .then( result => {
        const [ columnName ] = result.head.vars;

        return result.results.bindings.map( binding => {
          const { value } = binding[ columnName ];
          return value.substr( this.ENTITY_URL_PREFIX.length );
        } );
      } ).then( classIds => {
        this.setState( { classIds } );
      } );
  }

  handleEditorLinkClick( editorTemplate ) {
    return () => onEditorLinkClick( editorTemplate, this.state.entityId );
  }

  render() {
    const { editorTemplates } = this.props;
    const { classIds } = this.state;
    const classIdsSet = new Set( classIds );
    const isEntityClass = classIdsSet.has.bind( classIdsSet );
    const sorted = [ ...editorTemplates ].sort( ( a, b ) => compare( a.linkText, b.linkText ) );

    return <React.Fragment>
      <li key="settings">
        <a onClick={start}>{i18n.linkText}</a>
      </li>
      { sorted.map( editorTemplate => {
        const recommended = ( editorTemplate.recommendedClasses || [] ).some( isEntityClass );
        const style = recommended ? { fontWeight: 'bolder' } : {};

        return <li key={editorTemplate.id} style={style}>
          <a onClick={this.handleEditorLinkClick( editorTemplate )} title={editorTemplate.description}>
            {'WEF: ' + editorTemplate.linkText}
          </a>
        </li>;
      } )}
    </React.Fragment>;
  }

}
