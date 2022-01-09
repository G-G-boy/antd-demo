import {Compiler} from 'webpack';
import webpackDevMiddleware, {Options} from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import devConfig from '../../config/webpack.dev';

export const HMR_PATH = '/__webpack_hmr';

//TODO:
export default function webpackMiddleware(compiler: Compiler): any {
    const publicPath = devConfig.output!.publicPath! as string;

    // @ts-ignore
    const devMiddlewareOptions: Options = {
        publicPath,
        stats: 'minimal',
    };

    const hotMiddlewareOptions: webpackHotMiddleware.MiddlewareOptions = {
        path: HMR_PATH,
    };

    return [
        webpackDevMiddleware(compiler, devMiddlewareOptions),
        webpackHotMiddleware(compiler, hotMiddlewareOptions),
    ];
}
