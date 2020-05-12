// @flow

import AbstractQueuedCache from './AbstractQueuedCache';
import { getServerApi } from 'core/ApiUtils';
import md5 from 'md5';

const TYPE = 'FLAGIMAGEHTMLS';

const openTagF : ( string => string ) = fileName => '<div data-filename=\"' + md5( fileName ) + '\">';
const closeTagF : ( string => string ) = () => '</div>';

class FlagImageHtmlCache extends AbstractQueuedCache {

  constructor() {
    super( TYPE, false, 50 );
  }

  notifyMessage( fileNames : string[] ) {
    return 'Rendering ' + fileNames.length + ' flag images on server';
  }

  buildRequestPromice( fileNames : string[] ) {
    return getServerApi().postPromise( {
      action: 'parse',
      contentmodel: 'wikitext',
      disablelimitreport: true,
      disableeditsection: true,
      format: 'json',
      prop: 'text',
      text: fileNames
        .map( fileName => openTagF( fileName )
            + '[[File:' + fileName + '|22x16px|frameless|link=]]'
          + closeTagF( fileName ) )
        .join( '\r\n' ),
    } );
  }

  convertResultToEntities( result : any, fileNames : string[] ) {
    const cacheUpdate = {};
    const html = result.parse.text[ '*' ];
    fileNames.forEach( fileName => {
      const openTag = openTagF( fileName );
      const closeTag = closeTagF( fileName );
      const start = html.indexOf( openTag );
      if ( start === -1 ) {
        mw.log( 'Not found HTML for fileName "' + fileName + '"' );
        return;
      }
      const end = html.indexOf( closeTag, start );
      if ( end === -1 ) {
        mw.log( 'Incorrect HTML for fileName "' + fileName + '"' );
        return;
      }
      const imageHtml = html.substring( start + openTag.length, end );
      cacheUpdate[ fileName ] = imageHtml;
    } );

    return cacheUpdate;
  }

}

const instance = new FlagImageHtmlCache();
export default instance;
