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
    "require": true,

    // for test:
    "describe": true,
    "it": true,
  },
  "plugins": [ "promise" ],

  "rules": {
    // TODO: temporary!
    "no-useless-escape": 0,

    /* Require braces in arrow function body */
    "arrow-body-style": [1, "as-needed"],
    "array-bracket-spacing": [1, "always"],
    /* Require parens in arrow function arguments */
    "arrow-parens": [1, "as-needed" ],
    /* Require space before/after arrow function’s arrow */
    "arrow-spacing": 1,

    "comma-dangle": [1, "always-multiline"],
    "comma-spacing": 1,
    "computed-property-spacing": [1, "always"],

    "indent": [1, 2, { "ignoreComments": false }],

    "keyword-spacing": 1,
    "key-spacing": 1,

    "newline-per-chained-call": 0,
    "no-console": 0,
    /* Disallow duplicate imports */
    "no-duplicate-imports": 1,
    /* disallow unnecessary parentheses */
    "no-extra-parens": 1,
    "no-invalid-this": 2,
    "no-multi-spaces": 1,
    "no-multiple-empty-lines": 1,
    "no-trailing-spaces": 1,
    /* Disallow unnecessary catch clauses */
    "no-useless-catch": 1,
    /* Disallow unnecessary computed property keys on objects */
    "no-useless-computed-key": 1,
    /* Disallow renaming import, export, and destructured assignments to the same name */
    "no-useless-rename": 1,
    /* require let or const instead of var */
    "no-var": 1,
    /* disallow whitespace before properties */
    "no-whitespace-before-property": 1,

    "object-curly-spacing": [1, "always"],
    /* require or disallow method and property shorthand syntax for object literals */
    "object-shorthand": 1,

    /* Require using arrow functions for callbacks */
    "prefer-arrow-callback": 1,
    "prefer-const": 1,
    /* Prefer destructuring from arrays and objects */
    "prefer-destructuring": 1,
    /* Suggest using the spread operator instead of .apply() */
    "prefer-spread": 1,

    /* require quotes around object literal property names */
    "quote-props": [1, "consistent-as-needed"],
    "quotes": [1, "single"],

    /* Enforce all defaultProps have a corresponding non-required PropType */
    "react/default-props-match-prop-types": 1,
    /* Validate closing bracket location in JSX */
    /* Better to place after props due to Atom/react plugin problem */
    "react/jsx-closing-bracket-location": [1, 'after-props'],
    /* <...> disallow spaces inside of curly braces in JSX attributes and expressions.*/
    "react/jsx-curly-spacing": [1, {"when": "never"}],
    /* Enforce boolean attributes notation in JSX */
    "react/jsx-boolean-value": 1,
    /* Enforce or disallow spaces inside of curly braces in JSX attributes and expressions. */
    "react/jsx-child-element-spacing": 1,
    /* Enforce or disallow spaces around equal signs in JSX attributes */
    "react/jsx-equals-spacing": [1, "newer"],
    "react/jsx-no-bind": 1,
    /* Prevent duplicate properties in JSX */
    "react/jsx-no-duplicate-props": 1,
    /* Disallow undeclared variables in JSX */
    "react/jsx-no-undef": 1,
    /* Disallow multiple spaces between inline JSX props */
    "react/jsx-props-no-multi-spaces": 1,
    "react/jsx-sort-props": 1,
    "react/jsx-tag-spacing": 1,
    /* Prevent using this.state within a this.setState */
    "react/no-access-state-in-setstate": 1,
    /* Prevent problem with children and props.dangerouslySetInnerHTML */
    "react/no-danger-with-children": 1,
    /* Prevent using string references */
    "react/no-string-refs": 1,
    /* Prevent this from being used in stateless functional components */
    "react/no-this-in-sfc": 2,
    /* Prevents common typos */
    "react/no-typos": 2,
    /* Prevent invalid characters from appearing in markup */
    "react/no-unescaped-entities": 2,
    /* Prevent usage of unknown DOM property */
    "react/no-unknown-property": 1,
    /* Prevent usage of UNSAFE_ methods */
    "react/no-unsafe": 1,
    /* Prevent definitions of unused prop types */
    "react/no-unused-prop-types": 1,
    /* Prevent definitions of unused state */
    "react/no-unused-state": 1,
    /* Prevent usage of setState in componentWillUpdate */
    "react/no-will-update-set-state": 2,
    /* Enforce React components to have a shouldComponentUpdate method */
    "react/require-optimization": 1,
    /* Enforce ES5 or ES6 class for returning value in render function */
    "react/require-render-return": 2,
    /* Prevent extra closing tags for components without children */
    "react/self-closing-comp": 1,
    /* Enforce style prop value being an object */
    "react/style-prop-object": 2,
    /* Prevent void DOM elements (e.g. <img />, <br />) from receiving children */
    "react/void-dom-elements-no-children": 2,

    /* Enforce spacing between rest and spread operators and their expressions */
    "rest-spread-spacing": 1,

    "semi": [1, "always"],
    "semi-spacing": 1,
    /* Import Sorting */
    "sort-imports": [1, {"ignoreCase" : true}],
    "space-before-function-paren": [1, "never"],
    "space-in-parens": [1, "always"],
    "space-infix-ops": [1, {"int32Hint": false} ],
    "strict": [1, "never"],
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src"],
      }
    }
  }
}
