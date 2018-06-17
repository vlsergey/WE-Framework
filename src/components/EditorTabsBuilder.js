import React, { PureComponent } from 'react';
import EditorPage from './EditorPage';
import EntityLabel from './EntityLabel';
import PropTypes from 'prop-types';
import TabsWrapper from '../wrappers/TabsWrapper';

export default class EditorTabsBuilder extends PureComponent {

  render() {
    const { tabs } = this.props;

    return <TabsWrapper tabs={ tabs.map( ( tabDescription ) => ( {
      key: tabDescription.key,
      label: tabDescription.labelEntityId
        ? <EntityLabel entityId={tabDescription.labelEntityId} />
        : tabDescription.label,
      content: <EditorPage fields={tabDescription.fields} />,
    } ) ) } />;
  }

}

EditorTabsBuilder.propTypes = {
  tabs: PropTypes.arrayOf( PropTypes.shape( {
    label: PropTypes.string,
    labelEntityId: PropTypes.string,
    key: PropTypes.string.isRequired,
    fields: PropTypes.array,
  } ) ),
};
