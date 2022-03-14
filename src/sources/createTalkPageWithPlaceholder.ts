import {getWikidataApi} from '../core/ApiUtils';

export default function createTalkPageWithPlaceholder (entityId: string) {
  const notifyOptions = {
    autoHide: true,
    tag: 'WEF-Sources Talkpage',
  };

  mw.notify('Отправка запроса на обновление страницы обсуждения...', notifyOptions);
  getWikidataApi().postWithEditToken({
    action: 'edit',
    title: 'Talk:' + entityId,
    createonly: true,
    minor: true,
    tags: 'WE-Framework gadget',
    text: '{' + '{source talkpage placeholder}}',
    summary: 'Add source talkpage placehoder {' + '{source talkpage placeholder}} via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get('wgDBname'),
  }).then(() => {
    mw.notify('Запрос на создание страницы обсуждения отправлен', notifyOptions);
  });
}
