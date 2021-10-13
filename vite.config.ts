import {defineConfig, UserConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';
import defaultSettings from './defaultSettings';
import path from 'path';

export default defineConfig(({command, mode}) => {
    const config: UserConfig = {
        base: '/',
        server: {
            host: true,
        },
        build: {
            outDir: 'dist',
            sourcemap: false,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '~video.js': 'video.js',
                '~braft-editor': 'braft-editor',
                '~antd': 'antd',
            },
        },
        esbuild: {
            jsxInject: `import React from 'react'`,
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    modifyVars: {
                        // '@primary-color': defaultSettings.primaryColor,
                        'root-entry-name': 'default',
                    },
                },
            },
        },
        optimizeDeps: {
            include: ['@ant-design/icons'],
        },
        plugins: [
            reactRefresh(),
            // vitePluginImp({
            //     libList: [
            //         {
            //             libName: 'antd',
            //             style: (name) => {
            //                 if (name === 'row' || name === 'col') {
            //                     return `antd/es/grid/style/index.less`;
            //                 }
            //                 return `antd/es/${name}/style/index.less`;
            //             },
            //         },
            //     ],
            // }),
        ],
    };
    return config;
});
