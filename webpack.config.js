const path = require('path');
var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  mode: "none", // no defaults

  entry: './src/app.js',

  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        include: /src/,
      },
      {
        test: /\.css$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // enforce: "pre",
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        }
      },
      // configure replacements for file patterns
      {
        test : /js$/,
        loader : StringReplacePlugin.replace({
          replacements : [ {
            pattern : /\/\/fb\.me\//ig,
            replacement : function(match, p1, offset, string) {
              return "//fb-removeme.me/";
            }
          } ]
        })
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },

  plugins: [
      // an instance of the plugin must be present
      new StringReplacePlugin()
   ]

};
