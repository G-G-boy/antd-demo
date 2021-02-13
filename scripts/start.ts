import chalk from 'chalk';
import logSymbols from 'log-symbols';
import express from 'express';
import webpack from 'webpack';
import WebpackOpenBrowser from 'webpack-open-browser';

import devConfig from '../config/webpack.dev';
import setupMiddlewares from './middlewares';

const HOST = '127.0.0.1';
const DEFAULT_PORT = 5000;

function start() {
    let address = `http://${HOST}:${DEFAULT_PORT}`;
    let publicPath = devConfig.output?.publicPath;
    // 未设置和空串都视为根路径
    publicPath = publicPath == null || publicPath === '' ? '/' : (publicPath as string);
    if (publicPath !== '/') {
        // 要注意处理没有带 '/' 前缀和后缀的情况
        address = `${address}${publicPath.startsWith('/') ? '' : '/'}${publicPath}${
            publicPath.endsWith('/') ? '' : '/'
        }index.html`;
    }
    devConfig.plugins!.push(new WebpackOpenBrowser({url: address}));

    const devServer = express();
    const compiler = webpack(devConfig);
    setupMiddlewares(devServer, compiler);

    const httpServer = devServer.listen(DEFAULT_PORT, HOST, () => {
        console.log(
            `DevServer is running at ${chalk.magenta.underline(address)} ${logSymbols.success}`,
        );
    });

    ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
        process.on(signal, () => {
            httpServer.close();
            console.log(chalk.greenBright.bold(`\n进程结束!`));
            process.exit();
        });
    });
}

if (require.main === module) {
    start();
}
