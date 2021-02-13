import webpack from 'webpack';
import prodConfig from '../config/webpack.prod';

const compiler = webpack(prodConfig);

compiler.run((error, stats) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(stats?.toString('minimal'));
});
