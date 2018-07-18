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
      entityId: null,
    };
  }

  componentDidMount() {
    if ( mw.config.get( 'wgArticleId' ) ) {
      getEntityIdDeferred().then( entityId => this.setState( { entityId } ) );
    }
  }

  handleEditorLinkClick( editorTemplate ) {
    return () => onEditorLinkClick( editorTemplate, this.state.entityId );
  }

  render() {
    const { editorTemplates } = this.props;
    const { entityId } = this.state;

    return <div aria-labelledby="p-wef-label" className="portal" id="p-wef" role="navigation">
      <h3 dir="ltr" id="p-wef-label" lang="ru">{i18n.portalLabel}</h3>
      <div className="body plainlinks">
        <ul>
          <li key="settings">
            <a onClick={start}>{i18n.linkText}</a>
          </li>
          { entityId && editorTemplates.map( editorTemplate =>
            <li key={editorTemplate.id}>
              <a onClick={this.handleEditorLinkClick( editorTemplate )}>
                {editorTemplate.linkText}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>;
  }

}
