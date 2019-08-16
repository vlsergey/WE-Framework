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
    const url = 'https://query.wikidata.org/sparql?query='
      + encodeURIComponent( 'SELECT DISTINCT ?type WHERE { wd:' + entityId + ' wdt:P31 ?childClass . ?childClass wdt:P279* ?type }' );
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
          return value.substr( 'http://www.wikidata.org/entity/'.length );
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
