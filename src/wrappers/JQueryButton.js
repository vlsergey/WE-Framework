// @flow

import React, { PureComponent } from 'react';

type PropsType = {
  className? : ?string,
  disabled? : ?boolean,
  icon? : ?string,
  label? : ?string,
  onClick? : ?( any => any ),
  text? : ?boolean,
  title? : ?string,
};

export default class JQueryButton extends PureComponent<PropsType> {

  render() {
    // opimize JQuery alike behavious by direct rendering into HTML
    const { disabled, className, icon, label, onClick, text, title } = this.props;

    const cn = [ 'ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all' ];
    if ( disabled ) { cn.push( 'ui-button-disabled' ); cn.push( 'ui-state-disabled' ); }
    if ( !text ) cn.push( 'ui-button-icon-only' );
    if ( !icon ) cn.push( 'ui-button-text-only' );
    if ( className ) cn.push( className );

    return <button
      aria-disabled="false"
      className={cn.join( ' ' )}
      onClick={onClick}
      role="button"
      title={title || label}>
      { icon && <span className={'ui-button-icon-primary ui-icon ' + ( icon || '' )} />}
      { text && <span className="ui-button-text">{label}</span>}
    </button>;
  }

}
