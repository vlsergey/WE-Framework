/* eslint-env node */

// eslint-disable-next-line
const path = require('path');

module.exports = function (config) {
  // eslint-disable-next-line
  config.set({
    browsers: ['jsdom'],
    browserNoActivityTimeout: 60000,
    frameworks: ['mocha'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jsdom-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    files: [
      'test/globals.js',
      'test/**/*Test.js',
    ],

    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap'],
    },

    reporters: [
      'mocha',
    ],

    mochaReporter: {
      output: 'autowatch',
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
          },
          {
            test: /\.css$/,
            include: /semantic-ui-css/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'style-loader',
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'postcss-loader',
          },
          {
            test: /\.js$/,
            include: /(src|test)/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
        ],
      },
      resolve: {
        modules: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test'),
          'node_modules',
        ],
      },
    },
  });
};
