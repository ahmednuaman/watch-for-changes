const WebpackProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  entry: {
    load: ['babel-polyfill', './load.js'],
    parse: ['babel-polyfill', './parse.js']
  },
  output: {
    libraryTarget: 'commonjs2',
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  externals: [{
    'canvas': true,
    'aws-sdk': true,
    'jsdom': true
  }],
  target: 'node',
  plugins: [
    new WebpackProgressBarPlugin()
  ]
}
