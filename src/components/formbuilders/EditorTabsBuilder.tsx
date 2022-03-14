import React, {PureComponent} from 'react';

import EntityLabel from '../../caches/EntityLabel';
import {TabDefType} from '../../editors/EditorDefModel';
import TabsWrapper from '../../wrappers/TabsWrapper';
import ChildrenBuilder from './ChildrenBuilder';
import styles from './EditorTabsBuilder.css';

interface PropsType {
  onActivate?: () => any;
  tabs: TabDefType[];
}

export default class EditorTabsBuilder extends PureComponent<PropsType> {

  override render () {
    const {onActivate, tabs} = this.props;

    return <TabsWrapper onActivate={onActivate} tabs={tabs.map(tabDescription => ({
      key: tabDescription.key,
      label: tabDescription.labelEntityId
        ? <EntityLabel entityId={tabDescription.labelEntityId} />
        : tabDescription.label,
      content: <div className={styles.tabContent}>
        <ChildrenBuilder {...tabDescription} />
      </div>,
    }))} />;
  }

}
