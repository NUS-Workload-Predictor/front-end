const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:9999/dist'
    },
    module: {
        loaders: [
          {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: [/node_modules/]
          },
          {
              test: /\.scss$/,
              loaders: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
    },
    devServer: {
      hot: true,
      inline: true,
      port: 9999,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    externals: {
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
    plugins: []
}
