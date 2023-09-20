const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, argv) => {
    const isDevelopment = process.env.NODE_ENV === 'development';
  
    return {
      entry: './src/main.js',
      output: {
        filename: isDevelopment ? '[name].[contenthash].js' : '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
      },
      devServer: {
          static: {
            directory: path.resolve(__dirname, 'dist'), 
          },
          open: true, 
          hot: isDevelopment, 
          historyApiFallback: true,
        }, 
      devtool: isDevelopment ? 'source-map' : false,
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.s(a|c)ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
              ],
          },
          {
            test: /\.(png|svg)$/i,
           use: [
             {
               loader: 'file-loader',
               options: {
                 name: '[name].[ext]',
                 outputPath: 'assets',
               },
             },
           ],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html', 
        }),
        new CompressionWebpackPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 5120,
          minRatio: 0.8,
        }),
      ],
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {},
              output: {
                comments: false,
              },
            },
          }),
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.sharpMinify,
              options: {
                encodeOptions: {
                  png: {
                    quality: 50,
                  },
                },
              },
            },
          }),
        ],
        splitChunks: {
          chunks: 'all',
        },
      },
      stats: {
        loggingDebug: ['sass-loader'],
      },
    };
  };
  