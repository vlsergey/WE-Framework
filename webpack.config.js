const path = require( 'path' );
const StringReplacePlugin = require( 'string-replace-webpack-plugin' );

module.exports = {
  mode: 'none', // no defaults

  entry: './src/app.js',

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
      // configure replacements for file patterns
      {
        test: /\.js$/,
        loader: StringReplacePlugin.replace( {
          replacements: [ {
            pattern: /\/\/fb\.me\//ig,
            replacement( match, p1, offset, string ) {
              return '//fb-removeme.me/';
            },
          },
          ],
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
