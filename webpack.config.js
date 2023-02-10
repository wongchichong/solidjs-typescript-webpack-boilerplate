const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const dist = path.resolve(__dirname, 'dist')

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'
    process.env.NODE_ENV = argv.mode

    const plugins = [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: 'public',
        //         to: '',
        //         cache: true,
        //     },
        // ]),
    ]

    if (isProduction) {
        plugins.push(
            new CleanWebpackPlugin()
        )
    } else {
        plugins.push(
            new ForkTsCheckerWebpackPlugin({
                async: true,
                reportFiles: ['src/**/*.{ts,tsx}']
            }),
            new ErrorOverlayPlugin()
        )
    }

    const config = {
        // webpack will take the files from ./src/index
        entry: './src/index',

        // and output it into /dist as bundle.js
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.js'
        },

        // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },

        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 12000, // if less than 12000 bytes, add base64 encoded
                                // image to css
                                name: (file) => `/[path][name].[ext]`,
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/',
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ]
        },
        plugins
    }

    if (isProduction) {
        Object.assign(config, {
            optimization: {
                minimize: true,
                minimizer: [
                    new TerserJSPlugin({
                        terserOptions: { output: { comments: false } },
                        extractComments: false,
                    }),
                ],
            },
        })
    } else {
        Object.assign(config, {
            stats: 'minimal',
            devtool: 'cheap-module-source-map',
            devServer: {
                contentBase: dist,
                compress: true,
                port: 8888,
                overlay: {
                    warnings: true,
                    errors: true
                },
                historyApiFallback: true,
            },
        })
    }

    return config
}
