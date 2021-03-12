import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Mock from '@/mock';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import history from '@/router/history';
import '@/theme/global.less';
import '@/theme/tailwind.css';
console.log('mockjs version:', Mock.version);

Sentry.init({
    dsn: 'http://91fb3bd101fa41cbbfa390ef28f12a0e@localhost:9000/3',
    release: `sentryTest3`,
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
        }),
    ],
    tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.querySelector('#root'));
