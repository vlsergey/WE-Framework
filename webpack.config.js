/* eslint-env node */
const env = process.env.NODE_ENV;
const path = require( 'path' );

const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const StringReplacePlugin = require( 'string-replace-webpack-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );

module.exports = {
  mode: env || 'development',

  entry: './src/index.js',

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
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
          importLoaders: 1,
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
      // configure replacements for file patterns
      {
        test: /\.js$/,
        loader: StringReplacePlugin.replace( {
          replacements: [ {
            pattern: /\/\/fb\.me\//ig,
            replacement() {
              return '//fb-removeme.me/';
            },
          } ],
        } ),
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserJSPlugin( {
        extractComments: true,
        parallel: true,
      } ),
      new OptimizeCSSAssetsPlugin( {} ),
    ],
  },

  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'app.bundle.js',
  },

  plugins: [
    // an instance of the plugin must be present
    new StringReplacePlugin(),
  ],

  resolve: {
    alias: {
      'flow-runtime': path.resolve( __dirname, 'node_modules/@vlsergey/flow-runtime' ),
    },
    modules: [
      path.resolve( __dirname, 'src' ),
      'node_modules',
    ],
  },

};
