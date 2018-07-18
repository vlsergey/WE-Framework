import React, { PureComponent } from 'react';
import { EditorShape } from 'components/formbuilders/FormShapes';
import { getEntityIdDeferred } from 'core/ApiUtils';
import i18n from './i18n';
import { onEditorLinkClick } from 'core/edit';
import PropTypes from 'prop-types';
import { start } from './index';

export default class EditorLinks extends PureComponent {

  static propTypes = {
    editorTemplates: PropTypes.arrayOf( PropTypes.shape( EditorShape ) ),
  }

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
      }
      );
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
        const columnName = result.head.vars[ 0 ];

        const classIds = result.results.bindings.map( binding => {
          const value = binding[ columnName ].value;
          return value.substr( 'http://www.wikidata.org/entity/'.length );
        } );
        return classIds;
      } ).then( classIds => {
        this.setState( { classIds } );
      } );
  }

  handleEditorLinkClick( editorTemplate ) {
    return () => onEditorLinkClick( editorTemplate, this.state.entityId );
  }

  render() {
    const { editorTemplates } = this.props;
    const { classIds, entityId } = this.state;
    const classIdsSet = new Set( classIds );
    const isEntityClass = classIdsSet.has.bind( classIdsSet );

    return <div aria-labelledby="p-wef-label" className="portal" id="p-wef" role="navigation">
      <h3 dir="ltr" id="p-wef-label" lang="ru">{i18n.portalLabel}</h3>
      <div className="body plainlinks">
        <ul>
          <li key="settings">
            <a onClick={start}>{i18n.linkText}</a>
          </li>
          { editorTemplates.map( editorTemplate => {
            const recommended = ( editorTemplate.recommendedClasses || [] ).some( isEntityClass );
            const style = recommended ? { fontWeight: 'bolder' } : {};

            return <li key={editorTemplate.id} style={style}>
              <a onClick={this.handleEditorLinkClick( editorTemplate )}>
                {editorTemplate.linkText}
              </a>
            </li>;
          }
          )}
        </ul>
      </div>
    </div>;
  }

}
