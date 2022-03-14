import React, {ComponentProps, PureComponent} from 'react';

import {TabDefType} from '../../editors/EditorDefModel';
import DialogWrapper from '../../wrappers/DialogWrapper';
import EditorTabsBuilder from './EditorTabsBuilder';

type PropsType = ComponentProps<typeof DialogWrapper> & {
  tabs: TabDefType[];
};

export default class DialogWithTabs extends PureComponent<PropsType> {

  dialogRef = React.createRef<DialogWrapper>();

  close = () => {
    if (this.dialogRef.current)
      this.dialogRef.current.close();
  };

  handleTabChange = () => {
    if (this.dialogRef.current)
      this.dialogRef.current.resizeToFit();
  };

  open = () => {
    if (this.dialogRef.current)
      this.dialogRef.current.open();
  };

  override render () {
    const {tabs, ...etc} = this.props;

    return <DialogWrapper {...etc} ref={this.dialogRef}>
      <EditorTabsBuilder onActivate={this.handleTabChange} tabs={tabs} />
    </DialogWrapper>;
  }

}
