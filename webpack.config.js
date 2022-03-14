/* eslint-env node */

const mode = process.env.NODE_ENV || 'development';
const packageJson = require( './package.json' );
const path = require( 'path' );
const webpack = require( 'webpack' );

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserJSPlugin = require( 'terser-webpack-plugin' );

module.exports = {
  mode: mode,

  entry: './src/index.tsx',

  module: {
    rules: [
      {
        test: /\.(eot|gif|jpg|png|svg|ttf|woff|woff2)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        exclude: /src/,
        include: /node_modules/,
        use: ['css-loader'],
      },
      {
        test: /\.css$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
        ],
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            "declaration": mode == 'development',
            "declarationMap": mode == 'development',
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
    }),
    new ESLintPlugin({
      fix: true,
      emitWarning: mode == 'development',
    }),
    // do not reload on autogeneratd css type def files change
    new webpack.WatchIgnorePlugin({
      paths: [/css\.d\.ts$/]
    }),
  ],

  optimization: {
    minimizer: [
      new TerserJSPlugin( {
        extractComments: true,
        parallel: true,
      } ),
      new CssMinimizerPlugin(),
    ],
  },

  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'app.bundle.js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

};
