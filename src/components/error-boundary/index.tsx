import {Component} from 'react';

class ErrorBoundary extends Component<any, {hasError: boolean}> {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>error</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
