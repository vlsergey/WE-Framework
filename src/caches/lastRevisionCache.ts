import Batcher from '@vlsergey/batcher';

import {getWikidataApi} from '../core/ApiUtils';

interface ResultType {
  query: {
    pages: Record<string, PageType>;
  };
}

interface PageType {
  missing?: '';
  pageid: number;
  revisions: {
    revid: number;
  }[];
}

class LastRevisionCache {

  _batcher: Batcher<number, null | number>;
  _cache: Map< number, null | number > = new Map();

  constructor () {
    this._batcher = new Batcher(this._batchFunction);
  }

  _batchFunction = async (pageIds: number[]): Promise< (null | number)[] > => {
    const json: ResultType = await getWikidataApi()
      .getPromise({
        action: 'query',
        prop: 'revisions',
        rvprop: 'ids',
        pageids: pageIds.join('|'),
      });

    const resultMap: Map< number, null | number > = new Map();
    const pages: PageType[] = Object.values(json.query.pages);
    pages.forEach(page => {
      if (page.missing !== undefined) {
        resultMap.set(page.pageid, -1);
      } else {
        resultMap.set(page.pageid, page?.revisions?.[0]?.revid || null);
      }
    });

    return pageIds.map(pageId => resultMap.get(pageId) || null);
  };

  queue = async (pageId: number): Promise< null | number > => {
    const previous = this._cache.get(pageId);
    if (previous != undefined && previous != null) {
      return Promise.resolve(previous);
    }

    const revisionId = await this._batcher.queue(pageId);
    if (revisionId != undefined && revisionId != null) {
      this._cache.set(pageId, revisionId);
    }
    return revisionId;
  };

  queueAll (pageIds: number[]): Promise< (null | number)[] > {
    return Promise.all(pageIds.map(this.queue, this));
  }

}

export default new LastRevisionCache();
