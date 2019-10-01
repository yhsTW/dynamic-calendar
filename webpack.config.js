const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 3000;

const config = {
    mode : 'development',
    entry : path.join(__dirname, '/src/index.js'),
    output : {
        filename : 'bundle.[hash].js',
        path : path.join(__dirname, '/dist')
    },
    resolve : {
        extensions : ['.js', '.json']
    },
    devtool : 'cheap-module-source-map',
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : ['babel-loader']
            },
            {
                test : /\.(css)$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader : 'css-loader',
                        options : {
                            modules : {
                                localIdentName : '[local]__[hash:base64:5]'
                            },
                            localsConvention: 'camelCase',
                            sourceMap : true,
                        }
                    }
                ]
            },
            {
                test : /\.(jpg|png|svg|ico|icns)$/,
                loader : 'file-loader',
                options : {
                    name : '[path][name].[ext]'
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname, './public/index.html')
        })
    ],
    devServer : {
        host : 'localhost',
        port : PORT,
        historyApiFallback : true,
        open : true
    }
};

module.exports = config;