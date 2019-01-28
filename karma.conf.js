const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = function( config ) {
  config.set( {
    browsers: [ 'jsdom' ],
    browserNoActivityTimeout: 60000,
    frameworks: [ 'mocha' ],

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
      'src/**/*.js': [ 'webpack', 'sourcemap' ],
      'test/**/*.js': [ 'webpack', 'sourcemap' ],
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
            include: /semantic\-ui\-css/,
            // exclude: /node_modules/,
            use: [ 'style-loader', 'css-loader', 'postcss-loader' ],
          },
          {
            test: /\.css$/,
            // include: /src/,
            exclude: /node_modules/,
            loader: 'style-loader',
          },
          {
            test: /\.css$/,
            // include: /src/,
            exclude: /node_modules/,
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            test: /\.css$/,
            // include: /src/,
            exclude: /node_modules/,
            loader: 'postcss-loader',
          },
          {
            test: /\.js$/,
            include: /src/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            // enforce: "pre",
            test: /\.js$/,
            include: /src/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      resolve: {
        modules: [
          path.resolve( __dirname, 'src' ),
          'node_modules',
        ],
      },
    },
  } );
};
