import React, { Component } from 'react';
import labelDescriptionCacheContext from '../core/labelDescriptionCacheContext';
import PropTypes from 'prop-types';

export default class EntityLabel extends Component {

  render() {
    const { entityId } = this.props;
    return <labelDescriptionCacheContext.Consumer>
      { context => {
        const labelDescription = context.getOrQueue( entityId );
        if ( labelDescription && labelDescription.label ) {
          return labelDescription.label;
        } else {
          return entityId;
        }
      } }
    </labelDescriptionCacheContext.Consumer>;
  }

}

EntityLabel.propTypes = {
  entityId: PropTypes.string.isRequired,
};