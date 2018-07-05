import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class JQueryButton extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string,
    text: PropTypes.bool,
  };

  render() {
    // opimize JQuery alike behavious by direct rendering into HTML
    const { disabled, className, icon, label, onClick, text } = this.props;

    const cn = [ 'ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all' ];
    if ( disabled ) { cn.push( 'ui-button-disabled' ); cn.push( 'ui-state-disabled' ); }
    if ( !text ) cn.push( 'ui-button-icon-only' );
    if ( className ) cn.push( className );

    return <div
      aria-disabled="false"
      className={cn.join( ' ' )}
      onClick={onClick}
      role="button"
      title={label}>
      <span className={'ui-button-icon-primary ui-icon ' + ( icon || '' )} />
      <span className="ui-button-text">{label}</span>
    </div>;
  }

}
