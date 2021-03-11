import {withSentryRouting} from '@sentry/react';
import {Route} from 'react-router-dom';

const SentryRoute = withSentryRouting(Route);

export default SentryRoute;
