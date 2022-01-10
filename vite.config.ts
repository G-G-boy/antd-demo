import {defineConfig, UserConfig, Plugin} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';
import defaultSettings from './defaultSettings';
import path from 'path';
import analyze from 'rollup-plugin-analyzer';
import {visualizer} from 'rollup-plugin-visualizer';
import externalGlobals from 'rollup-plugin-external-globals';

const viteCDN = (cdns: string[]): Plugin => {
    return {
        name: 'vite-plugin-cdn',
        transformIndexHtml(html, ctx) {
            return {
                html,
                tags: cdns.map((cdn) => ({
                    tag: 'script',
                    attrs: {
                        src: cdn,
                    },
                    injectTo: 'head',
                })),
            };
        },
    };
};

export default defineConfig(({command, mode}) => {
    const config: UserConfig = {
        base: '/',
        server: {
            host: true,
        },
        build: {
            outDir: 'dist',
            sourcemap: false,
            rollupOptions: {
                external: ['video.js'],
                output: {
                    manualChunks: {
                        react: ['react', 'react-dom'],
                        faker: ['faker'],
                        echarts: ['echarts'],
                        vendor: [
                            'lodash-es',
                            'antd',
                            'react-redux',
                            'mockjs',
                            'moment',
                            '@ant-design/pro-table',
                            'ahooks',
                            'axios',
                            'react-intl',
                            'redux',
                            'redux-saga',
                            'rxjs',
                            'swr',
                            'react-helmet',
                        ],
                    },
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '~video.js': 'video.js',
                '~braft-editor': 'braft-editor',
                '~antd': 'antd',
                lodash: 'lodash-es',
            },
        },
        esbuild: {
            jsxInject: `import React from 'react'`,
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    // modifyVars: {
                    //     // '@primary-color': defaultSettings.primaryColor,
                    //     'root-entry-name': 'default',
                    // },
                },
            },
        },
        optimizeDeps: {
            include: ['@ant-design/icons'],
        },
        plugins: [
            reactRefresh(),
            command === 'build' &&
                externalGlobals({
                    'video.js': 'videojs',
                }),
            command === 'build' &&
                viteCDN(['https://unpkg.com/video.js@7.18.0/dist/alt/video.core.novtt.min.js']),
            command === 'build' &&
                analyze({
                    summaryOnly: true,
                    hideDeps: true,
                    filter: ({percent}) => {
                        return percent >= 1;
                    },
                }),
            command === 'build' &&
                visualizer({
                    open: true,
                    gzipSize: true,
                    brotliSize: true,
                }),
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
        ].filter(Boolean),
    };
    return config;
});
