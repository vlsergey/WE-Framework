const path = require('path');

module.exports = {
  mode: "none", // no defaults

  entry: './src/app.js',

  module: {
    rules: [
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
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },

};
