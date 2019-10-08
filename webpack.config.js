const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test:/\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/master.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html'
    // })
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /.css/, to: '/styles/master.css' },
        { from: /.js/, to: '/app.js' }
      ]
    }
  }
};
