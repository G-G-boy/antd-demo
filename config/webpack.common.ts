import {Configuration} from 'webpack';
import {resolve} from 'path';
import WebpackBarPlugin from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {Options as HtmlMinifierOptions} from 'html-minifier';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {loader as MiniCssExtractLoader} from 'mini-css-extract-plugin';
import {HMR_PATH} from '../scripts/middlewares/webpack-middleware';
import defaultSettings from '../defaultSettings';
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const resolveDirname = (path: string) => resolve(__dirname, path);

const distDir = resolveDirname('../dist');

const isDev = process.env.NODE_ENV !== 'production';

const styleLoderOrMiniCss = isDev ? 'style-loader' : MiniCssExtractLoader;
const postCssLoader = {
    loader: 'postcss-loader',
    options: {sourceMap: true},
};

const htmlMinifyOptions: HtmlMinifierOptions = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    useShortDoctype: true,
};

const commonConfig: Configuration = {
    cache: true,
    context: resolveDirname('../'),
    entry: [resolveDirname('../src/index.tsx')],
    output: {
        publicPath: '/',
        path: distDir,
        filename: 'js/[name]-[hash].bundle.js',
        hashSalt: defaultSettings.title,
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
        alias: {
            '@': resolveDirname('../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    styleLoderOrMiniCss,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    postCssLoader,
                ],
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/,
                use: [
                    styleLoderOrMiniCss,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    postCssLoader,
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                modifyVars: {
                                    '@primary-color': defaultSettings.primaryColor,
                                },
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.module\.less$/,
                use: [
                    styleLoderOrMiniCss,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                compileType: 'module',
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    postCssLoader,
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
            {
                test: /\.svg/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
        ],
    },
    plugins: [
        new WebpackBarPlugin({
            name: defaultSettings.title,
            color: defaultSettings.primaryColor,
        }),
        new AntDesignThemePlugin({
            antDir: resolveDirname('../node_modules/antd'),
            stylesDir: resolveDirname('../src'),
            varFile: resolveDirname('../src/theme/variables.module.less'),
            themeVariables: ['@primary-color'],
            indexFileName: 'index.html',
            generateOnce: false,
            lessUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js',
            publicPath: '',
            customColorRegexArray: [],
        }),
        new FriendlyErrorsPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            minify: isDev ? false : htmlMinifyOptions,
            template: resolveDirname('../public/index.html'),
            templateParameters: (...args: any[]) => {
                const [compilation, assets, assetTags, options] = args;
                const rawPublicPath = commonConfig.output!.publicPath! as string;
                return {
                    compilation,
                    webpackConfig: compilation.options,
                    htmlWebpackPlugin: {
                        tags: assetTags,
                        files: assets,
                        options,
                    },
                    PUBLIC_PATH: rawPublicPath.endsWith('/')
                        ? rawPublicPath.slice(0, -1)
                        : rawPublicPath,
                    title: defaultSettings.title,
                };
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: resolveDirname('../public'),
                    from: '*',
                    to: distDir,
                    toType: 'dir',
                    filter: (resourcePath) => {
                        return !resourcePath.includes('index.html');
                    },
                },
            ],
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                memoryLimit: isDev ? 1024 : 2048,
                configFile: resolveDirname('../tsconfig.json'),
            },
        }),
    ],
};

if (isDev) {
    (commonConfig.entry as string[]).unshift(
        `webpack-hot-middleware/client?path=${HMR_PATH}&reload=true&overlay=true`,
    );
}

export default commonConfig;
