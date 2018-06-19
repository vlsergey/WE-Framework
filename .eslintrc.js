'use strict';

module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 999,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "impliedStrict": true,
      "modules": true,
    },
  },
  "env": {
    "browser": true,
    "es6": true,
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
  ],
  "globals": {
    "$": true,
    "jQuery": true,
    "mw": true,
    
    // for test:
    "describe": true,
    "it": true,
  },
  "plugins": [ "promise" ],

  "rules": {
    // TODO: temporary!
    "no-useless-escape": 0,

    "array-bracket-spacing": [1, "always"],
    "arrow-spacing": 1,

    "comma-dangle": [1, "always-multiline"],
    "comma-spacing": 1,
    "computed-property-spacing": [1, "always"],

    "indent": [1, 2, { "ignoreComments": false }],

    "keyword-spacing": 1,
    "key-spacing": 1,

    "newline-per-chained-call": 0,
    "no-console": 0,
    "no-extra-parens": 1,
    "no-invalid-this": 2,
    "no-multi-spaces": 1,
    "no-multiple-empty-lines": 1,
    "no-trailing-spaces": 1,
    "no-var": 1,

    "object-curly-spacing": [1, "always"],
    "object-shorthand": 1,

    "prefer-const": 1,

    /* require quotes around object literal property names */
    "quote-props": [1, "consistent-as-needed"],
    "quotes": [1, "single"],

    /* Validate closing bracket location in JSX */
    /* Better to place after props due to Atom/react plugin problem */
    "react/jsx-closing-bracket-location": [1, 'after-props'],
    /* Enforce all defaultProps have a corresponding non-required PropType */
    "react/default-props-match-prop-types": 1,
    /* Enforce boolean attributes notation in JSX */
    "react/jsx-boolean-value": 1,
    /* Enforce or disallow spaces around equal signs in JSX attributes */
    "react/jsx-equals-spacing": [1, "newer"],
    "react/jsx-no-bind": 1,
    "react/jsx-props-no-multi-spaces": 1,
    "react/jsx-sort-props": 1,
    "react/jsx-tag-spacing": 1,

    "semi": [1, "always"],
    "sort-imports": [1, {"ignoreCase" : true}],
    "space-before-function-paren": [1, "never"],
    "space-in-parens": [1, "always"],
    "space-infix-ops": [1, {"int32Hint": false} ],
    "strict": [1, "never"],
  }
}
