import * as ApiUtils from './ApiUtils';
import * as WEF_Utils from './utils';
import i18n from './core.i18n';
import WEF_Updates from './Updates';

export default function wef_analyze_and_save( currentPageItem, entityId, labelsEditor, claimEditorTables ) {
  return new Promise( ( resolve, reject ) => {
    mw.notify( i18n.actionAnalyzeChanges );
    const updates = new WEF_Updates( entityId );
    try {
      if ( currentPageItem && WEF_Utils.isEmpty( entityId ) && !ApiUtils.isWikidata() ) {
        // set label in current content language
        updates.setLabel( mw.config.get( 'wgContentLanguage' ), mw.config.get( 'wgPageName' ) );

        // TODO: check documentation about using wgDBname
        // attach current site
        updates.setSitelink( mw.config.get( 'wgDBname' ), mw.config.get( 'wgPageName' ) );
      }

      if ( labelsEditor != null ) {
        labelsEditor.collectUpdates( updates );
      }
      $.each( claimEditorTables, function( i, claimEditorTable ) {
        claimEditorTable.collectUpdates( updates );
      } );

      if ( $.isEmptyObject( updates.data ) && updates.removedClaims.length === 0 ) {
        mw.notify( i18n.actionNoChangesPurge );
        resolve( updates.entityId );
        return;
      }

    } catch ( error ) {
      mw.log.warn( i18n.errorAnalyzeChanges + ': ' + error );
      alert( i18n.errorAnalyzeChanges + ': ' + error );
      reject( error );
      return;
    }

    WEF_Utils
      .update( updates )
      .then( () => resolve( updates.entityId ) )
      .catch( reject );
  } );
}
