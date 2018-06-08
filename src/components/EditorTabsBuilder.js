import React, { PureComponent } from 'react';
import EditorPage from './EditorPage';
import { Entity } from '../model/Shapes';
import EntityLabel from './EntityLabel';
import PropTypes from 'prop-types';
import TabsWrapper from '../wrappers/TabsWrapper';

export default class EditorTabsBuilder extends PureComponent {

  render() {
    const { entity, tabs } = this.props;

    return <TabsWrapper tabs={ tabs.map( ( tabDescription ) => ( {
      key: tabDescription.key,
      label: tabDescription.labelEntityId 
        ? <EntityLabel entityId={tabDescription.labelEntityId} />
        : tabDescription.label,
      content: <EditorPage entity={entity} fields={tabDescription.fields} />,
    } ) ) } />;
  }

}

EditorTabsBuilder.propTypes = {
  entity: PropTypes.shape( Entity ).isRequired,
  tabs: PropTypes.arrayOf( PropTypes.shape( {
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    fields: PropTypes.array,
  } ) ),
};
