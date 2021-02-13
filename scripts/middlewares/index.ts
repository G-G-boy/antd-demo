import {Compiler} from 'webpack';
import {Express} from 'express';
import historyFallback from 'connect-history-api-fallback';
import cors from 'cors';
import webpackMiddleware from './webpack-middleware';

export default function setupMiddlewares(server: Express, compiler: Compiler): void {
    server.use(historyFallback());

    server.use(cors());

    // webpack 相关中间件
    server.use(webpackMiddleware(compiler));
}
