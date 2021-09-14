import {FC} from 'react';
import * as Sentry from '@sentry/react';

const ErrorBoundary: FC = ({children}) => {
    return (
        <Sentry.ErrorBoundary fallback={<div>An error has occurred</div>}>
            {children}
        </Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
