import React, {PureComponent} from 'react';

interface PropsType {
  buttons?: any[];
  children?: any;
  className?: string;
  height? : (number | string);
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
  onBeforeClose?: () => any;
  onClose?: () => any;
  title?: string;
  width?: number | string;
}

interface StateType {
  manuallyResized: boolean;
}

export default class DialogWrapper extends PureComponent<PropsType, StateType> {

  ref = React.createRef<HTMLDivElement>();

  override state = {
    manuallyResized: false
  };

  override componentDidMount () {
    const {buttons, className, height, maxHeight, maxWidth, minHeight, minWidth, onBeforeClose, onClose, width} = this.props;

    if (this.ref.current) {
      jQuery(this.ref.current).dialog({
        autoOpen: true,
        autoResize: true,
        beforeClose: onBeforeClose,
        buttons,
        close: onClose,
        dialogClass: className,
        height,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        width,
        open: this.resizeToFit,
        resizeStart: this.handleResize,
        // workaround for content shrinking bug in jQuery
        // inspired by https://stackoverflow.com/a/49965986/1885756
        resize () {
          jQuery(this).closest('.ui-dialog-content').css('width', 'unset');
        },
      });
    }
  }

  override componentWillUnmount () {
    if (this.ref.current)
      jQuery(this.ref.current).dialog('destroy');
  }

  close () {
    if (this.ref.current)
      jQuery(this.ref.current).dialog('close');
  }

  open () {
    if (this.ref.current)
      jQuery(this.ref.current).dialog('open');
  }

  handleResize = () => { this.setState({manuallyResized: true}); };

  override render () {
    const {children, title} = this.props;

    return <div ref={this.ref} title={title}>
      {children}
    </div>;
  }

  resizeToFit = () => {
    if (!this.state.manuallyResized) {
      const wrapped = jQuery(this.ref.current);
      if (wrapped.parent().height() > jQuery(window).height()) {
        wrapped.height(jQuery(window).height() * 0.7);
      }
    }
  };

}
