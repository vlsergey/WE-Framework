// @flow

import { entries, values } from 'utils/ObjectUtils';
import deepEqual from 'utils/deepEqual';
import { getWikidataApi } from './ApiUtils';
import i18n from './i18n';
import preSaveTransformations from './preSaveTransformations';

const EMPTY_OBJECT : any = Object.freeze( {} );
const SUMMARY_PREFIX : string = 'via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ';
const TAG : string = 'WE-Framework gadget';

const notifyOptions = {
  autoHide: true,
  tag: 'WE-F Save',
};

function notify( text : string ) {
  mw.notify( '[WE-F] ' + text, notifyOptions );
}

type LAType = any;
export function collectlLabelalikeUpdates(
    originalEntity : EntityType,
    entity : EntityType,
    labelalikeType : ( 'labels' | 'descriptions' | 'aliases' | 'sitelinks' ),
    removedPlaceholderF : string => ?LAType ) : ?{ [string] : ?LAType } {

  const oldData : { [string] : LAType } = originalEntity[ labelalikeType ] || EMPTY_OBJECT;
  const newData : { [string] : LAType } = entity[ labelalikeType ] || EMPTY_OBJECT;

  const allKeys : Set< string > = new Set();
  Object.keys( oldData ).forEach( key => allKeys.add( key ) );
  Object.keys( newData ).forEach( key => allKeys.add( key ) );

  const allKeysSorted : string[] = [ ...allKeys ];
  allKeysSorted.sort();

  const changes : { key : string, value : ?LAType}[] = [];
  allKeysSorted.forEach( key => {
    const oldValue : ?LAType = oldData[ key ] || null;
    const newValue : ?LAType = newData[ key ] || null;

    if ( oldValue === null && newValue === null ) {
      console.warn( 'Something strage goes here with ' + labelalikeType + '...' );
    } else if ( oldValue === null && newValue !== null ) {
      console.log( 'Found change new entry of ' + labelalikeType + ' with key ' + key );
      changes.push( { key, value: newValue } );
    } else if ( oldValue !== null && newValue === null ) {
      console.log( 'Found removing of entry of ' + labelalikeType + ' with key ' + key );
      changes.push( { key, value: removedPlaceholderF( key ) } );
    } else if ( oldValue !== null && newValue !== null ) {
      if ( !deepEqual( oldValue, newValue ) ) {
        console.log( 'Found change in existing entry of ' + labelalikeType + ' for key ' + key );
        changes.push( { key, value: newValue } );
      }
    }

  } );

  if ( changes.length > 0 ) {
    const result : { [string] : ?LAType } = {};
    changes.forEach( value => result[ value.key ] = value.value );
    return result;
  }
}

export function collectClaimUpdates( originalEntity : EntityType, entity : EntityType ) : EditClaimType[] {
  const toUpdate : EditClaimType[] = [];
  const checked : Set< string > = new Set();

  // calculate changed and removed claims
  for ( const [ propertyId, newClaims ] of entries( entity.claims || EMPTY_OBJECT ) ) {
    const oldClaims : ?ClaimType[] = ( originalEntity.claims || EMPTY_OBJECT )[ propertyId ];

    if ( !oldClaims ) {
      newClaims.forEach( newClaim => {
        const { id, ...claimWithoutId } = newClaim;
        console.log( 'collectClaimUpdates: Saving claim with temporary id ' + id + ' as new claim without ID' );
        toUpdate.push( claimWithoutId );
      } );
      continue;
    }

    if ( oldClaims === newClaims ) {
      newClaims.forEach( newClaim => checked.add( newClaim.id ) );
      continue;
    }

    newClaims.forEach( ( newClaim : ClaimType ) => {
      checked.add( newClaim.id );

      const oldClaim : ?ClaimType = oldClaims.find( ( { id } ) => id === newClaim.id );
      if ( oldClaim ) {
        if ( !deepEqual( oldClaim, newClaim ) ) {
          console.log( 'collectClaimUpdates: Saving claim with id ' + newClaim.id + ' as updated claim' );
          toUpdate.push( { ...newClaim } );
        }
      } else {
        // it's a new claim
        const { id, ...claimWithoutId } = newClaim;
        console.log( `collectClaimUpdates: Saving claim with temporary id ${String( id )} as new claim without ID` );
        toUpdate.push( claimWithoutId );
      }
    } );
  }

  values( originalEntity.claims || EMPTY_OBJECT ).forEach( originalClaims => {
    originalClaims
      .filter( oldClaim => !checked.has( oldClaim.id ) )
      .forEach( oldClaim => toUpdate.push( { id: oldClaim.id, remove: '' } ) );
  } );

  return toUpdate.map( ( claim : EditClaimType ) => {
    if ( typeof claim.id === 'string' || claim.remove !== '' )
      return claim;

    const dateValue : ?DataValueType = ( claim.mainsnak || EMPTY_OBJECT ).datavalue;
    if ( !dateValue ) {
      return { id: claim.id, remove: '' };
    }
    return claim;
  } );
}

export function collectEntityUpdates(
    originalEntity : EntityType,
    dirtyEntity : EntityType ) {
  const entity : EntityType = preSaveTransformations( dirtyEntity );
  let data = {};

  const updatedLabels = collectlLabelalikeUpdates( originalEntity, entity, 'labels',
    key => ( { language: key, remove: '' } ) );
  if ( updatedLabels )
    data = { ...data, labels: updatedLabels };

  const updatedDescriptions = collectlLabelalikeUpdates( originalEntity, entity, 'descriptions',
    key => ( { language: key, remove: '' } ) );
  if ( updatedDescriptions )
    data = { ...data, descriptions: updatedDescriptions };

  const updatedAliases = collectlLabelalikeUpdates( originalEntity, entity, 'aliases', ( ) => [] );
  if ( updatedAliases )
    data = { ...data, aliases: updatedAliases };

  const updatedClaims = collectClaimUpdates( originalEntity, entity );
  if ( updatedClaims.length > 0 )
    data = { ...data, claims: updatedClaims };

  const updatedSitelinks = collectlLabelalikeUpdates( originalEntity, entity, 'sitelinks',
    key => ( { site: key, remove: '' } ) );
  if ( updatedSitelinks )
    data = { ...data, sitelinks: updatedSitelinks };

  return data;
}

export function closeWithoutSave( reject : ( string => any ) ) {
  return ( dispatch : DispatchType, getState : GetStateType ) => {
    notify( 'Analyzing changes...' );
    const state = getState();
    const data = collectEntityUpdates( state.originalEntity, state.entity );
    const hasChanges = Object.keys( data ).length !== 0;

    if ( !hasChanges ) {
      reject( 'User closed dialog window while no changes were made' );
    } else if ( confirm( i18n.confirmCloseWithoutSave ) ) {
      reject( 'User closed dialog window and confirmed discardind changes' );
    }
  };
}

export function saveAndClose(
    resolve : ( string => any ),
    reject : ( string => any )
) {
  return ( dispatch : DispatchType, getState : GetStateType ) => {
    notify( 'Analyzing changes...' );
    const state = getState();
    const dirtyEntity : ItemType = state.entity;
    const data = collectEntityUpdates( state.originalEntity, dirtyEntity );

    if ( Object.keys( data ).length === 0 ) {
      notify( 'No changes' );
      reject( 'No changes' );
      return;
    }

    notify( 'Saving changes...' );

    const params : any = {
      action: 'wbeditentity',
      data: JSON.stringify( data ),
      summary: 'via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get( 'wgDBname' ),
      tags: TAG,
    };

    if ( !dirtyEntity.id ) {
      params.new = 'item';
    } else {
      params.id = dirtyEntity.id;
    }

    getWikidataApi()
      .postWithEditToken( params )
      .catch( ( code, { error } ) => {
        mw.log.error( i18n.errorUpdateEntity );
        mw.log.error( error );
        notify( i18n.actionUpdateEntityFail );
        alert( i18n.errorUpdateEntity + ': ' + error.info );
      } )
      .then( result => {
        notify( i18n.actionUpdateEntityDone );
        const entityId = result.entity.id;

        return tagRevisions( entityId, true )
          .then( () => resolve( entityId ) );
      } )
      .catch( error => {
        mw.log.error( i18n.errorUpdateEntity );
        mw.log.error( error );
        notify( i18n.actionUpdateEntityFail );
        alert( i18n.errorUpdateEntity + ': ' + JSON.stringify( error ) );
      } );
  };

  function tagRevisions( entityId : string, displayNotifications : ?boolean ) {
    const notifyOptions = {
      autoHide: true,
      tag: 'WE-F Revisions Tags',
    };

    function notify( text ) {
      if ( displayNotifications )
        mw.notify( '[WE-F] ' + text, notifyOptions );
      else
        console.log( '[WEF_Utils.tagRevisions] ' + text );
    }

    if ( displayNotifications )
      notify( 'Query last 50 Wikidata entity revisions of ' + entityId );

    return getWikidataApi().getPromise( {
      action: 'query',
      prop: 'revisions',
      titles: entityId,
      rvprop: 'comment|ids|tags',
      rvlimit: 50,
    } )

      .then( result => {

        notify( 'Received last Wikidata entity revisions of ' + entityId );
        if ( result.query && result.query.pages ) {
          const page = result.query.pages[ Object.keys( result.query.pages )[ 0 ] ];
          if ( page && page.revisions ) {
            notify( 'Received last ' + page.revisions.length + ' Wikidata entity revisions of ' + entityId );

            return page.revisions
              .filter( revision => !!revision.comment )
              .filter( revision => revision.comment.indexOf( SUMMARY_PREFIX ) !== -1 )
              .filter( revision => revision.tags.indexOf( TAG ) === -1 )
              .map( revision => revision.revid );
          }
        }

        return [];
      } )

      .then( revisions => {

        if ( revisions.length === 0 ) {
          notify( 'Nothing to update in revisions history of ' + entityId );
          return;
        }

        return getWikidataApi().postWithEditTokenPromise( {
          action: 'tag',
          revid: revisions.join( '|' ),
          add: TAG,
        } );

      } )

      .then( () => {
        notify( 'Sucessfully update tags to revisions history' );
      } );
  }

}
