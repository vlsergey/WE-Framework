const reportJson = require( './flow-report.json' );

const IGNORE_ERROR_PATTERNS = [
  /^an index signature declaring the expected key \/ value type is missing in `.*/,
  /^Cannot add .* and .* because .* (could either behave like a string or like a number|is incompatible with string).*$/,
  /^Cannot assign .* to .* because (an index signature declaring the expected key \/ value type|property .*) is (missing in |not writable).*$/,
  /^Cannot (call|get) .* because (an index signature declaring the expected key \/ value type|property .*) is missing in .*$/,
  /^Cannot call .* with .* bound to .* because property .* of unknown type .* is incompatible with .*$/,
  /^Cannot extend .* with `.*` because property `.*` is read-only in .* but writable in .*$/,
  /^Cannot resolve module `(bootstrap|font-awesome|memoize-one|react|semantic-ui-css).*$/,
  /^Missing type annotation for .*/,

  // generics of React classes
  /^Cannot assign object literal to `this.state` because object literal .* is incompatible with undefined .*\.$/,
  /^Cannot use `(Component|PureComponent)` .* with fewer than 1 type argument\.$/,
  /^Cannot use `(React.Component)` .* without .* type arguments\.$/,
];

console.log( 'Errors before filtering: ' + reportJson.errors.length );

const filteredErrors = reportJson.errors
  .filter( error => !error.message.some( message => message.path.endsWith( 'flow-report.json' ) ) )
  .filter( error => !error.message.some( message =>
    IGNORE_ERROR_PATTERNS.some( regexp => regexp.test( message.descr ) )
  ) );

filteredErrors.forEach( error => {
  console.log( );
  error.message.forEach( message => {
    console.log( message.descr );
    console.log( '@' + message.path + ':' + message.line );
  } );
} );

console.log( );
console.log( 'Errors after filtering: ' + filteredErrors.length );

if ( filteredErrors.length !== 0 ) {
  throw new Error( 'There are flow errors after filtering' );
}
