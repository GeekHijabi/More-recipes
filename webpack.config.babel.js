import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const debug = process.env.NODE_ENV !== 'production';
module.exports = {
  entry: ['whatwg-fetch', './client/src/js/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    loaders: [
      // > JS
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // > JSX
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      // > CSS / SCSS
      {
        test: /\.(css|scss)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // > FONT/IMAGES AND OTHER FILE TYPE LOADERS
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ] // loaders
  }, // modules
  // > Module Folders (packages and extensions)
  resolve: {
    modules: ['node_modules', 'client/src'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  }, // modules
  plugins: debug ?
    [
      HtmlWebpackPluginConfig,
      new webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin({
        filename: 'bundle.css',
        allChunks: true
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new Dotenv({
        path: './.env',
        safe: false,
        systemvars: true
      })
    ] :
    [new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SECRETKEY: JSON.stringify(process.env.SECRETKEY)
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
    ], // plugins
  devServer: {
    proxy: {
      '/api/v1': process.env.PORT || 'http://localhost:3000'
    },
    hot: true,
    historyApiFallback: true
  }, // devServer
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
