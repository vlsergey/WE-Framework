// @flow

export default function trimStringValues( entity : EntityType ) {
  const result = { ...entity };
  let hasChanges = false;

  [ 'labels', 'descriptions', 'aliases', 'claims' ].forEach( key => {
    const oldValue = entity[ key ];
    if ( !oldValue ) {
      return;
    }

    const newValue = trimStringValuesImpl( oldValue );
    if ( newValue !== oldValue ) {
      hasChanges = true;
      result[ key ] = newValue;
    }
  } );

  return hasChanges ? result : entity;
}

function trimStringValuesImpl( obj : any ) : any {
  const result : any = Array.isArray( obj ) ? [ ...obj ] : { ...obj };
  let hasChanges = false;

  Object.entries( obj ).forEach( ( [ key, oldValue ] ) => {
    let newValue = oldValue;

    if ( oldValue === null || oldValue === undefined ) {
      // $FlowFixMe
      result[ key ] = null;
      return;
    }

    if ( typeof oldValue === 'object' ) {
      newValue = trimStringValuesImpl( oldValue );
    }
    if ( typeof oldValue === 'string' ) {
      newValue = oldValue.trim();
    }

    if ( newValue !== oldValue ) {
      hasChanges = true;
      // $FlowFixMe
      result[ key ] = newValue;
    } else {
      // $FlowFixMe
      result[ key ] = oldValue;
    }
  } );
  return !hasChanges ? obj : result;
}
