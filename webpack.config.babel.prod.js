var path =  require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VisualizerPlugin = require('webpack-visualizer-plugin');

var statsPath = '../stats/stats.html';

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'app/js/index.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router'
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            'react',
            'stage-2',
            ['es2015', {
              "modules": false
            }],
          ],
        },
        include: /app\/js/,
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
          {loader: 'sasslint-loader'}
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|woff|woff2|data:application).*$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg).*$/,
        use: 'url-loader?limit=10000',
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[hash].js',
        minChunks: Infinity,
      }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        },
      }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CopyWebpackPlugin([
      { from: 'app/assets/locale/', to: 'locale' },
      { from: 'app/assets/favicon/', to: 'favicon' },
      { from: 'app/assets/font/', to: 'font' },
      { from: 'app/assets/icons/font-awesome/css/', to: 'icons/font-awesome/css'},
      { from: 'app/assets/icons/font-awesome/fonts/', to: 'icons/font-awesome/fonts'},
      { from: 'app/assets/img/', to: 'img' }
    ]),
    new HtmlWebpackPlugin({template: 'app/index.html'}),
    new VisualizerPlugin({filename: statsPath})
  ],
  devtool: "source-map"
};
