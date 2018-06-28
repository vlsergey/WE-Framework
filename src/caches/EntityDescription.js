import { Component } from 'react';
import { connect } from 'react-redux';
import { labelDescriptionQueue } from './actions';
import PropTypes from 'prop-types';

class EntityDescription extends Component {

  static propTypes ={
    entityId: PropTypes.string.isRequired,
    cache: PropTypes.object.isRequired,
    queue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { cache, entityId, queue } = this.props;
    if ( typeof cache[ entityId ] === 'undefined' ) {
      queue( entityId );
    }
  }

  render() {
    const { entityId, cache } = this.props;
    if ( !entityId )
      return null;

    const cachedValue = cache[ entityId ];
    return ( typeof cachedValue === 'undefined' ? entityId : cachedValue.description ) || null;
  }

  componentDidUpdate( prevProps ) {
    const { cache, entityId, queue } = this.props;

    if ( prevProps.entityId !== this.props.entityId
        && typeof cache[ entityId ] === 'undefined' ) {
      queue( entityId );
    }
  }
}

const mapStateToProps = state => ( {
  cache: state.LABELDESCRIPTIONS.cache,
} );

const mapDispatchToProps = dispatch => ( {
  queue: key => dispatch( labelDescriptionQueue( key ) ),
} );

const EntityDescriptionConnected = connect( mapStateToProps, mapDispatchToProps )( EntityDescription );
export default EntityDescriptionConnected;
