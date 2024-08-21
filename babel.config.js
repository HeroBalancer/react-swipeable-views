const defaultPresets = [
  [
    '@babel/preset-env',
    {
      targets: {
        ie: 10,
        edge: 14,
        firefox: 28,
        chrome: 29,
        safari: 9,
        node: '6.11',
      },
      modules: false,  // Always use ES modules
    },
  ],
];

export default {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        // Workaround for https://github.com/babel/babel/issues/8323
        loose: false,  // Always keep ES modules
      },
    ],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-runtime',
  ],
  env: {
    coverage: {
      plugins: [
        'babel-plugin-istanbul',
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: {
              pages: './pages',
              'react-swipeable-views': './packages/react-swipeable-views/src',
              'react-swipeable-views-utils': './packages/react-swipeable-views-utils/src',
              'react-swipeable-views-core': './packages/react-swipeable-views-core/src',
              docs: './docs',
            },
          },
        ],
      ],
    },
    development: {},
    'docs-development': {
      plugins: [
        'babel-plugin-preval',
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              'react-swipeable-views': './packages/react-swipeable-views/src',
              'react-swipeable-views-core': './packages/react-swipeable-views-core/src',
              'react-swipeable-views-utils': './packages/react-swipeable-views-utils/src',
              docs: './docs',
              pages: './pages',
            },
          },
        ],
      ],
    },
    'docs-production': {
      plugins: [
        'babel-plugin-preval',
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              'react-swipeable-views': './packages/react-swipeable-views/src',
              'react-swipeable-views-core': './packages/react-swipeable-views-core/src',
              'react-swipeable-views-utils': './packages/react-swipeable-views-utils/src',
              docs: './docs',
              pages: './pages',
            },
          },
        ],
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-mui-test'] }],
        ['transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
    es: {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-mui-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
      // It's most likely a babel bug.
      // We are using this ignore option in the CLI command but that has no effect.
      ignore: ['**/*.test.js'],
    },
    production: {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-mui-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
      // It's most likely a babel bug.
      // We are using this ignore option in the CLI command but that has no effect.
      ignore: ['**/*.test.js'],
    },
    'production-umd': {
      plugins: [
        'transform-react-constant-elements',
        'transform-dev-warning',
        ['react-remove-properties', { properties: ['data-mui-test'] }],
        [
          'transform-react-remove-prop-types',
          {
            mode: 'wrap',
          },
        ],
      ],
    },
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: {
              'react-swipeable-views': './packages/react-swipeable-views/src',
              'react-swipeable-views-core': './packages/react-swipeable-views-core/src',
              'react-swipeable-views-utils': './packages/react-swipeable-views-utils/src',
              docs: './docs',
              pages: './pages',
            },
          },
        ],
      ],
    },
  },
};
