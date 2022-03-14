import React from 'react';

interface PropsType {
  className?: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
  onClick?: () => any;
  text?: boolean;
  title?: string;
}

export default function JQueryButton ({
  className,
  disabled,
  icon,
  label,
  onClick,
  text,
  title,
}: PropsType): JSX.Element {

  // opimize JQuery alike behavious by direct rendering into HTML

  const cn = ['ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all'];
  if (disabled) { cn.push('ui-button-disabled'); cn.push('ui-state-disabled'); }
  if (!text) cn.push('ui-button-icon-only');
  if (!icon) cn.push('ui-button-text-only');
  if (className) cn.push(className);

  return <button
    aria-disabled="false"
    className={cn.join(' ')}
    onClick={onClick}
    role="button"
    title={title || label || ''}>
    { icon && <span className={'ui-button-icon-primary ui-icon ' + (icon || '')} />}
    { text && <span className="ui-button-text">{label}</span>}
  </button>;
}
