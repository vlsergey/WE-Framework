/* eslint-env node */

// eslint-disable-next-line
const path = require('path');

const imported = require('./node_modules/@vlsergey/js-config/src/karma');

module.exports = function (config) {
  imported(config);

  // eslint-disable-next-line
  config.set({

    files: [
      'test/globals.ts',
      'test/**/*Test.ts*',
    ],

    webpack: {
      ...config.webpack,

      module: {
        rules: [
          {
            test: /\.(eot|gif|jpg|png|svg|ttf|woff|woff2)$/,
            type: 'asset/inline',
          },
          {
            test: /\.css$/,
            exclude: /(src|test)/,
            include: /node_modules/,
            use: ['css-loader'],
          },
          {
            test: /\.css$/,
            exclude: /(src|test)/,
            exclude: /node_modules/,
            use: [
              'style-loader',
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
            include: /(src|test)/,
            loader: 'ts-loader',
          },
        ],
      },

      output: {
        path: path.resolve(__dirname, './dist'),
      },
    },
  });
};
