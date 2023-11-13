module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    eqeqeq: 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/no-unknown-property': 'off',
  },
};
