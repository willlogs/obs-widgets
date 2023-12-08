const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { title } = require('process');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
    devServer: {
        static: './dist',
        open: true, // Open the browser after server had been started
        hot: true, // Enable hot module replacement
        liveReload: true,
        watchFiles: ['src/**/*.html'],
    },
    mode: 'development',
};