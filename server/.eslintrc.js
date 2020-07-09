export default {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    strict: 0,
    'object-curly-spacing': [2, 'always'],
    'max-len': [
      2,
      {
        code: 120,
      },
    ],
  },
};
