
export function regexpGetHtmlPattern (regexp: RegExp): string {
  let source = regexpGetSource(regexp);
  if (source.substr(0, 1) !== '^') {
    source = '.*' + source;
  }
  if (source.substr(source.length - 1, 1) !== '$') {
    source += '.*';
  }
  return source;
}

export function regexpGetSource (regexp: RegExp): string {
  return regexp.toString().replace(/^\/(.*)\/[a-z]*$/, '$1');
}
