import {FC} from 'react';
import Footer from '@/components/footer';

const PageContainer: FC = ({children}) => {
    return (
        <div className="h-full flex flex-col">
            <div className="bg-white flex-1 m-6 mb-0">{children}</div>
            <Footer />
        </div>
    );
};

export default PageContainer;
