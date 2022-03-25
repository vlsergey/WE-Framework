import {getWikidataApi} from '../core/ApiUtils';

export default async function createTalkPageWithPlaceholder (entityId: string): Promise<void> {
  const notifyOptions = {
    autoHide: true,
    tag: 'WEF-Sources Talkpage',
  };

  mw.notify('Отправка запроса на обновление страницы обсуждения...', notifyOptions);
  await getWikidataApi().postWithEditTokenPromise({
    action: 'edit',
    title: 'Talk:' + entityId,
    createonly: true,
    minor: true,
    tags: 'WE-Framework gadget',
    text: '{' + '{source talkpage placeholder}}',
    summary: 'Add source talkpage placehoder {' + '{source talkpage placeholder}} via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get('wgDBname'),
  });
  mw.notify('Запрос на создание страницы обсуждения отправлен', notifyOptions);
}
