import React, { Component } from 'react';
import DialogWrapper from '../wrappers/DialogWrapper';
import EditorTabsBuilder from './EditorTabsBuilder';
import PropTypes from 'prop-types';
import TypesCacheContainer from '../core/TypesCacheContainer';

export default class EditorApp extends Component {

  render() {
    const { description } = this.props;

    return <DialogWrapper title={description.title} onClose={ () => console.log( 'Dialog was closed' ) }>
      <PropertiesCacheContainer>
        <EditorTabsBuilder tabs={description.tabs} />
      </PropertiesCacheContainer>
    </DialogWrapper>;
  }

}

EditorApp.propTypes = {
  description: PropTypes.object.isRequired,
};
