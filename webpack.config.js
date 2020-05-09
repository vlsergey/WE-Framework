/* eslint-env node */
const path = require( 'path' );
const StringReplacePlugin = require( 'string-replace-webpack-plugin' );

module.exports = {
  mode: 'none', // no defaults

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
        options: {
          cacheDirectory: true,
        },
      },
      {
        // enforce: "pre",
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
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

  resolve: {
    modules: [
      path.resolve( __dirname, 'src' ),
      'node_modules',
    ],
  },

  performance: {
    hints: false,
  },

  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'app.bundle.js',
  },

  plugins: [
    // an instance of the plugin must be present
    new StringReplacePlugin(),
  ],

};
