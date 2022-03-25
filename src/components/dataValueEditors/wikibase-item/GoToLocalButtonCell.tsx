import React, {PureComponent} from 'react';

import LocalTitleProvider from '../../../caches/LocalTitleProvider';
import ButtonCell from '../../ButtonCell';
import i18n from './i18n';

const wgArticlePath = mw.config.get('wgArticlePath');

interface PropsType {
  entityId?: string;
}

export default class GoToLocalButtonCell extends PureComponent<PropsType> {

  override render () {
    return <LocalTitleProvider entityId={this.props.entityId}>
      { title => title
        ? <ButtonCell
          icon="ui-icon-extlink"
          key="button"
          label={i18n.buttonLabelGoToLocal}>
          { (children: any) => <a href={wgArticlePath.replace('$1', title)}
            rel="noopener noreferrer"
            target="_blank">{children}</a> }
        </ButtonCell>
        : <ButtonCell
          disabled
          icon="ui-icon-extlink"
          key="button"
          label={i18n.buttonLabelGoToLocal}>
          { (children: any) => <a href={'#'}>{children}</a> }
        </ButtonCell>
      }
    </LocalTitleProvider>;
  }

}
