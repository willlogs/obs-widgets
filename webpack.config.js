const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const { title } = require('process');
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/*.gltf", to: "./[name][ext]", globOptions: { ignore: ['dist/**/*'] } },
      ],
    }),
  ],
  devServer: {
    static: "./dist",
    open: true, // Open the browser after server had been started
    hot: true, // Enable hot module replacement
    liveReload: true,
    watchFiles: ["src/**/*.html"],
  },
  mode: "development",
};