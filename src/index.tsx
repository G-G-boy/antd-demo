import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Mock from '@/mock';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import history from '@/router/history';
import '@/theme/global.less';
import '@/theme/tailwind.css';
import pkg from '../package.json';
console.log('mockjs version:', Mock.version);

Sentry.init({
    dsn: 'http://3d27e863542c47f48b62ccf27afee1aa@localhost:9000/2',
    release: `antd-demo-${pkg.version}`,
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
        }),
    ],
    tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.querySelector('#root'));
