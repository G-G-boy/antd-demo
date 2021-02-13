import {Compiler} from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import devConfig from '../../config/webpack.dev';

export const HMR_PATH = '/__webpack_hmr';

export default function webpackMiddleware(compiler: Compiler) {
    const publicPath = devConfig.output!.publicPath! as string;

    const devMiddlewareOptions: webpackDevMiddleware.Options = {
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
