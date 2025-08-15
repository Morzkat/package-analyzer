import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json', // optional, only if using project-based rules
      },
      globals: {
        NodeJS: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      ...eslintPluginTs.configs.recommended.rules,
      // You can override rules here
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**'],
  },
];
