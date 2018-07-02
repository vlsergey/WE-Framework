import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from './i18n';
import JQueryButton from 'wrappers/JQueryButton';
import PropTypes from 'prop-types';

export default class QualifierRemoveButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,

    claimPropertyId: PropTypes.string.isRequired,
    claimPropertyLabel: PropTypes.string,
    qualifierPropertyId: PropTypes.string.isRequired,
    qualifierPropertyLabel: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
  };

  constructor() {
    super( ...arguments );

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    const { claimPropertyId, claimPropertyLabel,
      onClick,
      qualifierPropertyId, qualifierPropertyLabel } = this.props;

    const question = i18n.confirmRemoveQualifier
      .replace( '{claimPropertyId}', claimPropertyId )
      .replace( '{claimPropertyLabel}', claimPropertyLabel )
      .replace( '{qualifierPropertyId}', qualifierPropertyId )
      .replace( '{qualifierPropertyLabel}', qualifierPropertyLabel );

    if ( confirm( question ) ) {
      onClick();
    }
  }

  render() {
    const { disabled } = this.props;

    return <ButtonCell>
      <JQueryButton
        disabled={disabled}
        icon="ui-icon-trash"
        label={i18n.buttonRemoveQualifier}
        onClick={this.handleClick}
        text={false} />
    </ButtonCell>;
  }

}
