const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    cache: false,
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: 'css-inliner.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        libraryTarget: 'window'
    },
    target: ['web', 'es5'],
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/example.html'),
        filename: 'example.html',
        inject: false
    }),
    new CopyPlugin({
        patterns: [{
            from: "./src",
            filter: async (resourcePath) => {
                return /\.(css)$/i.exec(resourcePath);
            }
        }],
    })],
    devServer: {
        hot: true,
        port: 9999,
        static: {
            directory: path.join(__dirname, 'dist')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "ie 11" }]
                        ]
                    }
                }
            }
        ]
    }
};