module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['airbnb-typescript', 'eslint:recommended', 'next', 'prettier'],
  rules: {
    'no-console': [2, { allow: ['debug', 'error', 'info', 'warn'] }],
    complexity: [2, { max: 18 }], // prevent from writing too complex functions
    'sort-imports': 0, // turned of as we're using trivago for sorting
    'spaced-comment': [2, 'always', { markers: ['/'] }], // modified to allow TS references with triple brackets
    'no-param-reassign': [2, { props: true, ignorePropertyModificationsForRegex: ['Ref$'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }], // reduce allowed extensions to typescript ones,
    'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }],
    'import/no-extraneous-dependencies': 0,
    'prefer-const': 2,
    '@typescript-eslint/no-implicit-any-catch': 1,
    '@typescript-eslint/no-unsafe-call': 2,
    '@typescript-eslint/no-unsafe-return': 2,
    '@typescript-eslint/no-unnecessary-type-assertion': 1,
  },
};
