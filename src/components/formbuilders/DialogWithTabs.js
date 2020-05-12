// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import DialogWrapper from 'wrappers/DialogWrapper';
import EditorTabsBuilder from './EditorTabsBuilder';
import type { TabDefType } from 'editors/EditorDefModel';

type PropsType = {
  tabs : TabDefType[],
};

export default class DialogWithTabs extends PureComponent<PropsType> {

  dialogRef = React.createRef();

  @boundMethod
  close() {
    if ( this.dialogRef.current )
      this.dialogRef.current.close();
  }

  @boundMethod
  handleTabChange() {
    if ( this.dialogRef.current )
      this.dialogRef.current.resizeToFit();
  }

  @boundMethod
  open() {
    if ( this.dialogRef.current )
      this.dialogRef.current.open();
  }

  render() {
    const { tabs, ...etc } = this.props;

    return <DialogWrapper {...etc} ref={this.dialogRef}>
      <EditorTabsBuilder onActivate={this.handleTabChange} tabs={tabs} />
    </DialogWrapper>;
  }

}
