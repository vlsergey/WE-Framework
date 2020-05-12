/* eslint-env node */
module.exports = function( api ) {
  api.cache( true );

  const template = {
    plugins: [
      // can be disabled anytime  due to https://github.com/gajus/flow-runtime/issues/237
      // [ "flow-runtime", { "assert": true, "annotate": true } ],
      'flow-runtime',
      '@babel/plugin-syntax-dynamic-import',
      [ '@babel/plugin-proposal-decorators', { "legacy": true } ],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
    presets: [
      '@babel/preset-flow',
      '@babel/preset-env',
      '@babel/preset-react',
    ],
  };

  const config = {
    ...template,
    plugins: process.env.NODE_ENV === 'development'
      ? template.plugins
      : template.plugins.filter( p => p !== 'flow-runtime' ),
  };

  return config;
};
