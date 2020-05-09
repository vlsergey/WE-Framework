// @flow

import expect from 'expect';

export default function trimStringValues( entity ) {
  const result = { ...entity };
  let hasChanges = false;

  [ 'labels', 'descriptions', 'aliases', 'claims' ].forEach( key => {
    const oldValue = entity[ key ];

    if ( oldValue === undefined || oldValue === null ) {
      return;
    }

    const newValue = trimValuesImpl( oldValue );
    if ( newValue !== oldValue ) {
      hasChanges = true;
      result[ key ] = newValue;
    } else {
      result[ key ] = oldValue;
    }
  } );

  return hasChanges ? result : entity;
}

function trimValuesImpl( obj ) {
  expect( obj ).toExist();

  const result = Array.isArray( obj ) ? [ ...obj ] : { ...obj };
  let hasChanges = false;
  Object.keys( obj ).forEach( key => {
    const oldValue = obj[ key ];
    let newValue = oldValue;

    if ( oldValue === null ) {
      result[ key ] = null;
      return;
    }

    if ( typeof oldValue === 'object' ) {
      newValue = trimValuesImpl( oldValue );
    }
    if ( typeof oldValue === 'string' ) {
      newValue = oldValue.trim();
    }

    if ( newValue !== oldValue ) {
      hasChanges = true;
      result[ key ] = newValue;
    } else {
      result[ key ] = oldValue;
    }
  } );
  return !hasChanges ? obj : result;
}
