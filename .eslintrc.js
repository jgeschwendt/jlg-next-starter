'use strict';

const ecmaVersion = 2020;

const AllowedOneCharacterVariables = [
  'a', 'b', 'i', 'j', 'k', 'm', 'p', 't', 'x', 'y', 'z',
];

const MagicNumbers = [
  // eslint-disable-next-line no-magic-numbers -- animation timings,
  ...[100, 200, 250, 300, 350, 400, 450, 500],
  // eslint-disable-next-line no-magic-numbers -- multipliers,
  ...[-1, 0, 1, 2, 1000],
];

const MaxDepthJSX = 5;

// https://webpack.js.org/api/module-methods/#magic-comments
const WebpackMagicComments = [
  'webpackChunkName',
  'webpackExclude',
  'webpackInclude',
  'webpackMode',
  'webpackPrefetch',
  'webpackPreload',
];

module.exports = {
  extends: [
    '@eslint-calibrate',
    'plugin:@eslint-calibrate/calibrate',
    'next',
    'next/core-web-vitals',
  ],
  ignorePatterns: ['next-env.d.ts'],
  overrides: [
    // Language — TypeScript
    {
      extends: [
        '@eslint-calibrate/typescript',
        'plugin:@eslint-calibrate/typescript',
      ],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      },
    },

    // Environment — Node/Next/React
    {
      extends: [
        '@eslint-calibrate/react',
        '@eslint-calibrate/node',
        '@eslint-calibrate/node/typescript',
        'plugin:@eslint-calibrate/react',
      ],
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-magic-numbers': ['error', {
          ignore: MagicNumbers,
        }],
        '@typescript-eslint/space-before-function-paren': ['error', {
          anonymous: 'never',
          asyncArrow: 'always',
          named: 'never',
        }],
        'capitalized-comments': ['error', 'always', {
          ignoreInlineComments: false,
          ignorePattern: WebpackMagicComments.join('|'),
        }],
        'import/no-internal-modules': ['error', {
          allow: [
            '**/src/**',
            'next/app',
            'next/document',
            'next/dynamic',
            'next/head',
            'next/image',
            'next/link',
            'next/router',
          ],
        }],
        'import/no-named-export': 'off',
        'import/no-nodejs-modules': ['error', {
          allow: ['util', 'zlib'],
        }],
        'import/no-unassigned-import': ['error', {
          allow: ['**/*.scss'],
        }],
        'import/prefer-default-export': 'off',
        'lines-around-comment': ['error', {
          ignorePattern: WebpackMagicComments.join('|'),
        }],
        'node/file-extension-in-import': ['error', 'always', {
          '.ts': 'never',
          '.tsx': 'never',
          'tryExtensions': [
            '.ts',
            '.tsx',
          ],
        }],
        // Redundant in TS applications
        'react/default-props-match-prop-types': 'off',
        'react/jsx-max-depth': ['error', {
          max: MaxDepthJSX,
        }],
        // Redundant in TS applications
        'react/prop-types': 'off',
        // Handled by babel jsx-transform
        'react/react-in-jsx-scope': 'off',
      },
      settings: {
        'import/extensions': ['.ts', '.tsx'],
        'react': {
          version: 'detect',
        },
      },
    },
    // Environment — Next Page exports
    {
      files: [
        'src/pages/api/**/*.ts',
        'src/pages/**/*.tsx',
      ],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },

    // Environment — Node / CommonJS
    {
      extends: [
        '@eslint-calibrate/node',
        '@eslint-calibrate/node/script',
      ],
      files: [
        '.eslintrc.js',
        'babel.config.js',
        'next.config.js',
      ],
      rules: {
        'node/no-process-env': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
    },
    ecmaVersion,
    sourceType: 'module',
  },
  root: true,
  rules: {
    'id-length': ['error', {
      exceptions: AllowedOneCharacterVariables,
    }],
    'import/no-relative-parent-imports': 'off',
    'no-warning-comments': 'warn',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};
