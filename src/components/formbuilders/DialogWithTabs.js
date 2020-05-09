// @flow

import React, { PureComponent } from 'react';
import DialogWrapper from 'wrappers/DialogWrapper';
import EditorTabsBuilder from './EditorTabsBuilder';

type PropsType = {
  tabs : TabDefType[],
};

export default class DialogWithTabs extends PureComponent<PropsType> {

  constructor() {
    super( ...arguments );

    this.dialogRef = React.createRef();
    this.handleTabChange = this.handleTabChange.bind( this );

    this.close = () => this.dialogRef.current.close();
    this.open = () => this.dialogRef.current.open();
  }

  handleTabChange() {
    const dialogComponent = this.dialogRef.current;
    if ( dialogComponent )
      dialogComponent.resizeToFit();
  }

  render() {
    const { tabs, ...etc } = this.props;

    return <DialogWrapper {...etc} ref={this.dialogRef}>
      <EditorTabsBuilder onActivate={this.handleTabChange} tabs={tabs} />
    </DialogWrapper>;
  }

}
