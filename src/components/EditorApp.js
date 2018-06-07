import React, { Component } from 'react';
import DialogWrapper from '../wrappers/DialogWrapper';
import EditorTabsBuilder from './EditorTabsBuilder';
import PropertiesCacheContainer from '../core/PropertiesCacheContainer';
import PropTypes from 'prop-types';

export default class EditorApp extends Component {

  render() {
    const { description } = this.props;

    return <DialogWrapper minWidth={800} onClose={ () => console.log( 'Dialog was closed' ) } title={description.title}>
      <PropertiesCacheContainer>
        <EditorTabsBuilder tabs={description.tabs} />
      </PropertiesCacheContainer>
    </DialogWrapper>;
  }

}

EditorApp.propTypes = {
  description: PropTypes.object.isRequired,
};
