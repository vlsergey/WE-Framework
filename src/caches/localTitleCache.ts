import {getWikidataApi} from '../core/ApiUtils';
import AbstractQueuedCache from './AbstractQueuedCache';

const EMPTY_OBJECT: any = Object.freeze({});
const TYPE = 'LOCALTITLES';
const wgDBname = mw.config.get('wgDBname');

class LocalTitleCache extends AbstractQueuedCache<null | string, any, null | string> {

  constructor () {
    super(TYPE, false, 50);
  }

  override isKeyValid (cacheKey: string): boolean {
    return typeof cacheKey === 'string' && !!/^Q(\d+)$/i.exec(cacheKey);
  }

  override notifyMessage (cacheKeys: string[]) {
    return 'Fetching ' + cacheKeys.length + ' item(s) local titles from Wikidata';
  }

  override buildRequestPromice (cacheKeys: string[]) {
    return getWikidataApi()
      .getPromise({
        action: 'wbgetentities',
        props: 'sitelinks',
        sitefilter: wgDBname,
        ids: cacheKeys.join('|'),
      });
  }

  override convertResultToEntities (result: any): Record<string, null | string> {
    const cacheUpdate: Record<string, null | string> = {};
    for (const [entityId, entity] of Object.entries(result.entities)) {
      const sitelinks: SiteLinksType = (entity || EMPTY_OBJECT).sitelinks || EMPTY_OBJECT;
      const sitelink: SiteLinkType = sitelinks[wgDBname] || EMPTY_OBJECT;
      cacheUpdate[entityId] = sitelink.title || null;
    }
    return cacheUpdate;
  }

}

export default new LocalTitleCache();
