// @flow

export function getBody() : HTMLBodyElement {
  const body : ?HTMLBodyElement = document.body;
  if ( !body ) {
    throw new Error( 'Missing BODY in current DOM document' );
  }
  return body;
}
