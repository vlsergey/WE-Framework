import React, { PureComponent } from 'react';
import ChildrenBuilder from './ChildrenBuilder';
import EntityLabel from 'caches/EntityLabel';
import PropTypes from 'prop-types';
import { TabShape } from './FormShapes';
import TabsWrapper from 'wrappers/TabsWrapper';

export default class EditorTabsBuilder extends PureComponent {

  static propTypes = {
    tabs: PropTypes.arrayOf( PropTypes.shape( TabShape ) ).isRequired,
  };

  render() {
    const { tabs } = this.props;

    return <TabsWrapper tabs={tabs.map( tabDescription => ( {
      key: tabDescription.key,
      label: tabDescription.labelEntityId
        ? <EntityLabel entityId={tabDescription.labelEntityId} />
        : tabDescription.label,
      content: <ChildrenBuilder {...tabDescription} />,
    } ) )} />;
  }

}
