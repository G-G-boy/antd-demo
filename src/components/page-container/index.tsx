import {FC} from 'react';
import Footer from '@/components/footer';
import classNames from 'classnames';

interface PageContainerProps {
    hasBg?: boolean;
}

const PageContainer: FC<PageContainerProps> = ({children, hasBg}) => {
    const bgClass = classNames({
        'bg-white': hasBg,
        'bg-transparent': !hasBg,
    });
    return (
        <div className="h-full flex flex-col">
            <div className={`flex-1 m-6 mb-0 ${bgClass}`}>{children}</div>
            <Footer />
        </div>
    );
};

PageContainer.defaultProps = {
    hasBg: true,
};

export default PageContainer;
