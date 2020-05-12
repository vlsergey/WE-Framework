// @flow

// Flow typecheck hacks

export function entries<T>( obj : { [string] : T } ) : [string, T][] {
  // $FlowFixMe
  return Object.entries( obj );
}

export function values<T>( obj : { [string] : T } ) : T[] {
  // $FlowFixMe
  return Object.values( obj );
}
