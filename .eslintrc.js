module.exports = {
    // Umi 项目
    extends: require.resolve('umi/eslint'),
    rules: {
        eqeqeq: 'off',
        'no-param-reassign': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'react/no-unknown-property': 'off',
    }
}