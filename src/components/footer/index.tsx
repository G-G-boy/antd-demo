import {FC} from 'react';
import {Layout} from 'antd';
import {GithubOutlined} from '@ant-design/icons';

const {Footer} = Layout;

const LayoutFooter: FC = () => {
    return (
        <Footer className="text-center text-gray-400 font-light">
            antd demo <GithubOutlined /> ggboy
        </Footer>
    );
};

export default LayoutFooter;
