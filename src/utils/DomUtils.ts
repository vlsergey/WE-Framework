export function getBody (): HTMLElement {
  const body = document.body;
  if (!body) {
    throw new Error('Missing BODY in current DOM document');
  }
  return body;
}
