import {FC} from 'react';
import PageContainer from '@/components/page-container';

const Animation: FC = () => {
    return (
        <PageContainer>
            <div>font-size</div>
            <p className="text-xs ...">The quick brown fox ...</p>
            <p className="text-sm ...">The quick brown fox ...</p>
            <p className="text-base ...">The quick brown fox ...</p>
            <p className="text-lg ...">The quick brown fox ...</p>
            <p className="text-xl ...">The quick brown fox ...</p>
            <p className="text-2xl ...">The quick brown fox ...</p>
            <div>border radius</div>
            <div className="flex">
                <div className="rounded-sm w-20 h-20 bg-primary"></div>
                <div className="rounded w-20 h-20 bg-primary"></div>
                <div className="rounded-md w-20 h-20 bg-primary"></div>
                <div className="rounded-lg w-20 h-20 bg-primary"></div>
                <div className="rounded-xl w-20 h-20 bg-primary"></div>
                <div className="rounded-2xl w-20 h-20 bg-primary"></div>
            </div>
            <div>
                <h1 className="text-3xl">Color</h1>
            </div>
            <div className="flex">
                <div className="w-32 h-32 bg-primary" />
            </div>
            <div>
                <h1 className="text-3xl">阴影</h1>
            </div>
            <div className="flex">
                <div className="w-32 h-32 bg-white mx-4 shadow-base hover:shadow-focus transition-all duration-200" />
                <div className="w-32 h-32  bg-white mx-4 shadow-focus" />
                <div className="w-32 h-32  bg-white mx-4 shadow-focus-more" />
                <div className="w-32 h-32  bg-white mx-4 shadow-sm" />
                <div className="w-32 h-32  bg-white mx-4 shadow" />
                <div className="w-32 h-32  bg-white mx-4 shadow-md" />
                <div className="w-32 h-32  bg-white mx-4 shadow-lg" />
                <div className="w-32 h-32  bg-white mx-4 shadow-xl" />
                <div className="w-32 h-32  bg-white mx-4 shadow-2xl" />
            </div>
        </PageContainer>
    );
};

export default Animation;
