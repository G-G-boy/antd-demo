import {FC} from 'react';
import {Layout, Grid} from 'antd';
import SelectLang from '@/components/select-lang';
import Account from '@/components/account';
import Trigger from '@/components/trigger';
import Setting from '@/components/setting';

const {Header} = Layout;
const {useBreakpoint} = Grid;

const LayoutHeader: FC = () => {
    const {xs} = useBreakpoint();

    return (
        <Header className="bg-white px-4">
            {xs && (
                <div className="float-left h-full flex items-center">
                    <Trigger />
                </div>
            )}

            <div className="float-right h-full flex items-center">
                <Setting />
                <Account />
                <SelectLang />
            </div>
        </Header>
    );
};

export default LayoutHeader;
