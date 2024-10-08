import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: [
      '**/build',
      '**/dist',
      '**/public',
      '**/.next',
      '**/.cache',
      '**/package-lock.json',
      '**/public',
      '**/node_modules',
      '**/next-env.d.ts',
      '**/next.config.ts',
      '**/yarn.lock',
      '**/postcss.config.mjs',
      '**/eslint.config.mjs',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'next/core-web-vitals',
    'eslint:recommended',
    'next',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      prettier,
      import: _import,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        parser: tsParser,
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'import/no-cycle': 'off',
      'global-require': 'off',
      'no-console': 'off',
      'no-plusplus': 'off',
      'no-param-reassign': 'off',
      'class-methods-use-this': 'off',
      'import/prefer-default-export': 'off',
      'react/no-array-index-key': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/function-component-definition': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-require-imports': 'warn',
      'jsx-a11y/control-has-associated-label': 'off',
      'react/no-unstable-nested-components': 'off',
      '@next/next/no-duplicate-head': 'off',
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: false,
          argsIgnorePattern: '^_',
        },
      ],
      'no-else-return': 'off',
      'new-cap': 'off',
      'spaced-comment': 'off',
      'no-self-assign': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
          js: 'never',
          jsx: 'never',
        },
      ],
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
];

export default config;
