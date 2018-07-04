import * as ApiUtils from './ApiUtils';
import deepEqual from 'deep-equal';
import expect from 'expect';
import filterEmptyEntityStructures from './filterEmptyEntityStructures';
import i18n from 'components/core.i18n.js';

//const TAG = 'WE-Framework gadget';

const notifyOptions = {
  autoHide: true,
  tag: 'WE-F Save',
};

function notify( text ) {
  mw.notify( '[WE-F] ' + text, notifyOptions );
}

export function collectlLabelalikeUpdates( originalEntity, entity, labelalikeType, removedPlaceholderF ) {

  const changes = [];

  const oldData = originalEntity[ labelalikeType ] || {};
  const newData = entity[ labelalikeType ] || {};

  const allKeys = new Set();
  Object.keys( oldData ).forEach( key => allKeys.add( key ) );
  Object.keys( newData ).forEach( key => allKeys.add( key ) );

  const allKeysSorted = [ ...allKeys ];
  allKeysSorted.sort();

  allKeysSorted.forEach( key => {
    const oldValue = oldData[ key ] || null;
    const newValue = newData[ key ] || null;

    if ( oldValue === null && newValue === null ) {
      console.warn( 'Something strage goes here with ' + labelalikeType + '...' );
      return;
    }

    if ( oldValue === null && newValue !== null ) {
      console.log( 'Found change new entry of ' + labelalikeType + ' with key ' + key );
      changes.push( { key, value: newValue } );
      return;
    }

    if ( oldValue !== null && newValue === null ) {
      console.log( 'Found removing of entry of ' + labelalikeType + ' with key ' + key );
      changes.push( { key, value: removedPlaceholderF( key ) } );
      return;
    }

    if ( oldValue !== null && newValue !== null ) {
      if ( !deepEqual( oldValue, newValue ) ) {
        console.log( 'Found change in existing entry of ' + labelalikeType + ' for key ' + key );
        changes.push( { key, value: newValue } );
      }
      return;
    }

  } );

  if ( changes.length > 0 ) {
    const result = {};
    changes.forEach( value => result[ value.key ] = value.value );
    return result;
  }
}

export function collectClaimUpdates( originalEntity, entity ) {
  const toUpdate = [];
  const checked = new Set();

  //calculate changed and removed claims
  Object.keys( entity.claims ).forEach( propertyId => {

    const newClaims = entity.claims[ propertyId ];
    expect( newClaims ).toBeAn( 'array' );

    const oldClaims = originalEntity.claims[ propertyId ];

    if ( typeof oldClaims !== 'object' ) {
      newClaims.forEach( newClaim => {
        const { id, ...claimWithoutId } = newClaim;
        console.log( 'collectClaimUpdates: Saving claim with temporary id ' + id + ' as new claim without ID' );
        toUpdate.push( claimWithoutId );
      } );
      return;
    }
    expect( newClaims ).toBeAn( 'array' );

    if ( oldClaims === newClaims ) {
      newClaims.forEach( newClaim => checked.add( newClaim.id ) );
      return;
    }

    newClaims.forEach( newClaim => {
      expect( newClaim ).toBeAn( 'object' );
      expect( newClaim.id ).toBeA( 'string' );
      expect( newClaim.mainsnak ).toBeAn( 'object' );
      checked.add( newClaim.id );

      const oldClaim = oldClaims.find( oldClaim => oldClaim.id === newClaim.id );
      if ( typeof oldClaim === 'object' ) {
        if ( !deepEqual( oldClaim, newClaim ) ) {
          console.log( 'collectClaimUpdates: Saving claim with id ' + newClaim.id + ' as updated claim' );
          toUpdate.push( newClaim );
        }
      } else {
        // it's a new claim
        const { id, ...claimWithoutId } = newClaim;
        console.log( 'collectClaimUpdates: Saving claim with temporary id ' + id + ' as new claim without ID' );
        toUpdate.push( claimWithoutId );
      }

    } );
  } );

  Object.values( originalEntity.claims ).forEach( originalClaims => {
    originalClaims
      .filter( oldClaim => !checked.has( oldClaim.id ) )
      .forEach( oldClaim => toUpdate.push( { id: oldClaim.id, remove: '' } ) );
  } );

  return toUpdate
    .map( claim => {
      if ( typeof claim.id === 'string' || claim.remove !== '' )
        return claim;

      expect( claim ).toBeAn( 'object' );
      expect( claim.mainsnak ).toBeAn( 'object', 'Strange claim in toUpdate array: ' + JSON.stringify( claim ) );

      if ( typeof claim.mainsnak.datavalue !== 'object' ) {
        return { id: claim.id, remove: '' };
      }
      return claim;
    } );
}

export function collectEntityUpdates( originalEntity, entityWithEmptyClaims ) {
  const entity = filterEmptyEntityStructures( entityWithEmptyClaims );
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

function save() {
  return ( dispatch, getState ) => {
    notify( 'Analyzing changes...' );
    const state = getState();
    const data = collectEntityUpdates( state.originalEntity, state.entity );

    if ( Object.keys( data ).length === 0 ) {
      notify( 'No changes' );
      return;
    }

    notify( 'Saving changes...' );

    const params = {
      action: 'wbeditentity',
      summary: 'via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get( 'wgDBname' ),
      data: JSON.stringify( data ),
    };

    if ( typeof state.entity.id !== 'string' ) {
      params[ 'new' ] = 'item';
    } else {
      params.id = state.entity.id;
    }

    ApiUtils.getWikidataApi()
      .postWithEditToken( params )
      .then( result => {
        if ( result.error ) {
          mw.log.error( i18n.errorUpdateEntity );
          mw.log.error( result.error );
          notify( i18n.actionUpdateEntityFail );
          alert( i18n.errorUpdateEntity + ': ' + result.error.info );
          return;
        }

        notify( i18n.actionUpdateEntityDone );
      } ).fail( ( jqXHR, textStatus ) => {
        mw.log.error( i18n.errorUpdateEntity );
        mw.log.error( arguments );
        notify( i18n.actionUpdateEntityFail );
        alert( i18n.errorUpdateEntity + ': ' + textStatus );
      } );
  };
}

export default save;
