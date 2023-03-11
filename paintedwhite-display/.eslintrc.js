module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-case-declarations': 'off',
    'no-useless-escape': 'off',
    'no-unused-vars': 'off',
    'no-redeclare': 'off',
    'no-prototype-builtins': 'off',
    'no-cond-assign': 'off'
  }
}
