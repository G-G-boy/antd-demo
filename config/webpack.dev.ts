import {merge} from 'webpack-merge';
import Webpack, {HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} from 'webpack';
import commonConfig from './webpack.common';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const devConfig = merge<Webpack.Configuration>(commonConfig, {
    target: 'web',
    mode: 'development',
    plugins: [
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new NoEmitOnErrorsPlugin(),
    ],
    devtool: 'eval-cheap-module-source-map',
});

export default devConfig;
