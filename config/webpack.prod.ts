import {merge} from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import {webpackConfig} from './webpack.dev';
// import SentryWebpackPlugin from '@sentry/webpack-plugin';
// import pkg from '../package.json';

const prodConfig = merge(webpackConfig, {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css',
            ignoreOrder: false,
        }),
        new CompressionPlugin(),
        /*new SentryWebpackPlugin({
            // sentry-cli configuration
            authToken: 'd2c2f1f5994a401185de8abcfb0288979bd44eb7e6134f149c3bc2d27324ee6d',
            org: 'sentry',
            project: 'react',
            release: `antd-demo-${pkg.version}`,

            // webpack specific configuration
            include: `${webpackConfig.output!.path}/js`,
            ignore: ['node_modules'],
        }),*/
    ],
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserPlugin({extractComments: false}), new CssMinimizerPlugin()],
    },
});

export default prodConfig;
