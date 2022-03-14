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

  async _batchFunction (pageIds: number[]): Promise< (null | number)[] > {
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

    const resultArray: (null | number)[] = pageIds.map(pageId => resultMap.get(pageId) || null);
    return resultArray;
  }

  queue (pageId: number): Promise< null | number > {
    const previous = this._cache.get(pageId);
    if (previous != undefined && previous != null) {
      return Promise.resolve(previous);
    }

    return this._batcher.queue(pageId)
      .then((revisionId: null | number) => {
        if (revisionId != undefined && revisionId != null) {
          this._cache.set(pageId, revisionId);
        }
        return revisionId;
      });
  }

  queueAll (pageIds: number[]): Promise< (null | number)[] > {
    return Promise.all(pageIds.map(this.queue, this));
  }

}

const instance: LastRevisionCache = new LastRevisionCache();
export default instance;
