import React, { Component } from 'react';
import labelDescriptionCacheContext from 'core/labelDescriptionCacheContext';
import PropTypes from 'prop-types';

export default class EntityDescription extends Component {

  static propTypes = {
    entityId: PropTypes.string.isRequired,
  }

  render() {
    const { entityId } = this.props;
    return <labelDescriptionCacheContext.Consumer>
      { context => {
        const labelDescription = context.getOrQueue( entityId );
        if ( labelDescription && labelDescription.description ) {
          return labelDescription.description;
        } else {
          return entityId;
        }
      } }
    </labelDescriptionCacheContext.Consumer>;
  }

}
