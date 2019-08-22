import React, { PureComponent } from 'react';
import ChildrenBuilder from './ChildrenBuilder';
import EntityLabel from 'caches/EntityLabel';
import styles from './EditorTabsBuilder.css';
import TabsWrapper from 'wrappers/TabsWrapper';

type PropsType = {
  onActivate? : ?( any => any ),
  tabs : TabDefType[],
};

export default class EditorTabsBuilder extends PureComponent<PropsType> {

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
