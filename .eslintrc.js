/* eslint-disable-next-line */
module.exports = {
  parserOptions: {
    project: [
      './tsconfig.json',
      './src/tsconfig.json',
      './test/tsconfig.json',
    ],
  },
  ignorePatterns: ['**/*.css.d.ts'],
  extends: ['./node_modules/@vlsergey/js-config/src/eslint'],
  rules: {
    // Allow to use ! assertion, because TypeScript strict mode is enabled
    // and we need it for short array accessors syntax like
    // if (arr.length > 1) return arr[0];
    '@typescript-eslint/no-non-null-assertion': 0,

    // Temporary disable strict checks for this project and uncomment them slowly

    'no-unused-vars': 0,

    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/restrict-template-expressions': 0,

    'react/no-unused-prop-types': 0,

  },
};
