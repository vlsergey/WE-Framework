/* eslint-disable-next-line */
module.exports = {
  parserOptions: {
    project: [
      './tsconfig.json',
      './src/tsconfig.json',
      './test/tsconfig.json',
    ],
  },
  extends: ['./node_modules/@vlsergey/js-config/src/eslint'],
  rules: {
    // Allow to use ! assertion, because TypeScript strict mode is enabled
    // and we need it for short array accessors syntax like
    // if (arr.length > 1) return arr[0];
    '@typescript-eslint/no-non-null-assertion': 0,
  },
};
