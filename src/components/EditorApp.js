import React, { Component } from 'react';
import DialogWrapper from '../wrappers/DialogWrapper';
import EditorTabsBuilder from './EditorTabsBuilder';
import LabelDescriptionCacheContainer from '../core/LabelDescriptionCacheContainer';
import PropertiesCacheContainer from '../core/PropertiesCacheContainer';
import PropTypes from 'prop-types';

export default class EditorApp extends Component {

  render() {
    const { description, onClose } = this.props;

    return <DialogWrapper minWidth={800} onClose={ onClose } title={description.title}>
      <LabelDescriptionCacheContainer>
        <PropertiesCacheContainer>
          <EditorTabsBuilder tabs={description.tabs} />
        </PropertiesCacheContainer>
      </LabelDescriptionCacheContainer>
    </DialogWrapper>;
  }

}

EditorApp.propTypes = {
  description: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
