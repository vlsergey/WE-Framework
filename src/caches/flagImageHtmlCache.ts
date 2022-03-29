import Batcher from '@vlsergey/batcher';
import {cacheValueHookFactory, cacheValueProviderFactory, cacheValuesHookFactory, cacheValuesProviderFactory,
  MemoryOnlyCache} from '@vlsergey/react-indexdb-cache';
import md5 from 'md5';

import {getServerApi} from '../core/ApiUtils';

const openTagF : ((fileName: string) => string) = fileName => `<div data-filename="${md5(fileName)}">`;
const closeTagF : ((fileName: string) => string) = () => '</div>';

const batchLoader = async (fileNames: string[]): Promise<(string | undefined)[]> => {
  console.debug('Construct', fileNames.length, ' flag image HTMLs', fileNames);

  const apiResult = await getServerApi().postPromise<ParseActionResult>({
    action: 'parse',
    contentmodel: 'wikitext',
    disablelimitreport: true,
    disableeditsection: true,
    format: 'json',
    prop: 'text',
    text: fileNames
      .map(fileName => openTagF(fileName)
          + '[[File:' + fileName + '|22x16px|frameless|link=]]'
        + closeTagF(fileName))
      .join('\r\n'),
  });

  const html = apiResult.parse.text!['*'];
  return fileNames.map<string | undefined>(fileName => {
    const openTag = openTagF(fileName);
    const closeTag = closeTagF(fileName);
    const start = html.indexOf(openTag);
    if (start === -1) {
      mw.log('Not found HTML for fileName "' + fileName + '"');
      return;
    }
    const end = html.indexOf(closeTag, start);
    if (end === -1) {
      mw.log('Incorrect HTML for fileName "' + fileName + '"');
      return;
    }
    const imageHtml = html.substring(start + openTag.length, end);
    return imageHtml;
  });
};

const batcher = new Batcher<string, string | undefined>(batchLoader, {
  maxBatchSize: 50
});

export const flagImageHtmlCache = new MemoryOnlyCache({
  loader: (fileName: string) => batcher.queue(fileName),
  onError: (fileName: string, err: unknown) =>
  { console.warn('Unable to load LabelDescription for', fileName, 'due to', err); },
});

export const FlagImageHtmlProvider = cacheValueProviderFactory(flagImageHtmlCache);
export const FlagImageHtmlsProvider = cacheValuesProviderFactory(flagImageHtmlCache);
export const useFlagImageHtml = cacheValueHookFactory(flagImageHtmlCache);
export const useFlagImageHtmls = cacheValuesHookFactory(flagImageHtmlCache);
