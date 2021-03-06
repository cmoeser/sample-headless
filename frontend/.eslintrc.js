module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: ['eslint:recommended', '@nuxtjs', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  // required to lint *.vue files
  plugins: ['vue', 'prettier', '@typescript-eslint', 'html'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'max-len': 0,
    'newline-after-import': 0,
    'no-unused-vars': 0,
    'import/no-dynamic-require': 0,
    'no-console': 0,
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { semi: false }],
    '@typescript-eslint/adjacent-overload-signatures': 'warn',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/class-name-casing': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-angle-bracket-type-assertion': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-new': 'warn',
    '@typescript-eslint/no-namespace': 'warn',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-triple-slash-reference': 'warn',
    '@typescript-eslint/no-use-before-declare': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/prefer-function-type': 'warn',
    '@typescript-eslint/prefer-interface': 'warn',
    '@typescript-eslint/prefer-namespace-keyword': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/unified-signatures': 'warn',
    'arrow-body-style': 'warn',
    'arrow-parens': ['warn', 'as-needed'],
    complexity: 'off',
    'constructor-super': 'warn',
    curly: ['warn', 'multi-line'],
    'dot-notation': 'warn',
    'eol-last': 'warn',
    'guard-for-in': 'warn',
    'max-classes-per-file': ['warn', 1],
    'new-parens': 'warn',
    'no-bitwise': 'off',
    'no-caller': 'warn',
    'no-cond-assign': 'warn',
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-empty': 'warn',
    'no-eval': 'warn',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': 'warn',
    'no-new-wrappers': 'warn',
    'no-throw-literal': 'warn',
    'no-undef-init': 'warn',
    'no-unsafe-finally': 'warn',
    'no-unused-labels': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'one-var': 'warn',
    'prefer-const': 'warn',
    'quote-props': ['warn', 'consistent-as-needed'],
    radix: 'warn',
    'use-isnan': 'warn',
    'valid-typeof': 'off'
  }
}
