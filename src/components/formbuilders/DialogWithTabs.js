import React, { PureComponent } from 'react';
import DialogWrapper from 'wrappers/DialogWrapper';
import EditorTabsBuilder from './EditorTabsBuilder';
import PropTypes from 'prop-types';
import { TabShape } from './FormShapes';

export default class DialogWithTabs extends PureComponent{

  static propTypes = {
    tabs: PropTypes.arrayOf( PropTypes.shape( TabShape ) ).isRequired,
  };

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

    return <DialogWrapper ref={this.dialogRef} {...etc}>
      <EditorTabsBuilder onActivate={this.handleTabChange} tabs={tabs} />
    </DialogWrapper>;
  }

}
