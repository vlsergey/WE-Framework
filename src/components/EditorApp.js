import React, { Component } from 'react';
import DialogWrapper from '../wrappers/DialogWrapper';
import EditorTabsBuilder from './EditorTabsBuilder';
import { Entity } from '../model/Shapes';
import LabelDescriptionCacheContainer from '../core/LabelDescriptionCacheContainer';
import PropertiesCacheContainer from '../core/PropertiesCacheContainer';
import PropTypes from 'prop-types';

export default class EditorApp extends Component {

  render() {
    const { description, entity } = this.props;

    return <DialogWrapper minWidth={800} onClose={ () => console.log( 'Dialog was closed' ) } title={description.title}>
      <LabelDescriptionCacheContainer>
        <PropertiesCacheContainer>
          <EditorTabsBuilder entity={entity} tabs={description.tabs} />
        </PropertiesCacheContainer>
      </LabelDescriptionCacheContainer>
    </DialogWrapper>;
  }

}

EditorApp.propTypes = {
  description: PropTypes.object.isRequired,
  entity: PropTypes.shape( Entity ).isRequired,
};
