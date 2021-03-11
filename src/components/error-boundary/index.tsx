import {FC} from 'react';
import * as Sentry from '@sentry/react';

const ErrorBoundary: FC = ({children}) => {
    return (
        <Sentry.ErrorBoundary fallback={'An error has occurred'}>{children}</Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
