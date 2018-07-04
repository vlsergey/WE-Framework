import React, { PureComponent } from 'react';
import ChildrenBuilder from './ChildrenBuilder';
import EntityLabel from 'caches/EntityLabel';
import PropTypes from 'prop-types';
import styles from './EditorTabsBuilder.css';
import { TabShape } from './FormShapes';
import TabsWrapper from 'wrappers/TabsWrapper';

export default class EditorTabsBuilder extends PureComponent {

  static propTypes = {
    onActivate: PropTypes.func,
    tabs: PropTypes.arrayOf( PropTypes.shape( TabShape ) ).isRequired,
  };

  render() {
    const { onActivate, tabs } = this.props;

    return <TabsWrapper onActivate={onActivate} tabs={tabs.map( tabDescription => ( {
      key: tabDescription.key,
      label: tabDescription.labelEntityId
        ? <EntityLabel entityId={tabDescription.labelEntityId} />
        : tabDescription.label,
      content: <div className={styles.tabContent}>
        <ChildrenBuilder {...tabDescription} />
      </div>,
    } ) )} />;
  }

}
