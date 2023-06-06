module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [],
  extends: ['airbnb-typescript', 'eslint:recommended', 'next', 'prettier'],
  rules: {
    'no-console': [2, { allow: ['debug', 'error', 'info', 'warn'] }],
    complexity: [2, { max: 18 }], // prevent from writing too complex functions
    'sort-imports': 0, // turned of as we're using trivago for sorting
    'spaced-comment': [2, 'always', { markers: ['/'] }], // modified to allow TS references with triple brackets
    'no-param-reassign': [2, { props: true, ignorePropertyModificationsForRegex: ['Ref$'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }], // reduce allowed extensions to typescript ones
  },
};
