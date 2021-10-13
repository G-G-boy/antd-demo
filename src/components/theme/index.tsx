import {FC, useState} from 'react';
import {Dropdown, message, ConfigProvider} from 'antd';
import {SketchPicker} from 'react-color';
import svars from '@/theme/variables.module.less';
import defaultSettings from '../../../defaultSettings';

const primaryColor = svars.primaryColor || defaultSettings.primaryColor;

const ThemeSelect: FC = () => {
    const [color, setColor] = useState(primaryColor);

    const changeTheme = (hex: string) => {
        document.body.style.setProperty('--color-primary', hex);
        ConfigProvider.config({
            theme: {
                primaryColor: hex,
            },
        });
        setColor(hex);

        /*try {
            window.less
                .modifyVars({
                    '@primary-color': hex,
                })
                .then(() => {
                    setColor(hex);
                    message.success(`成功修改主题色为${hex}`);
                })
                .catch((error) => {
                    console.log(error);
                    message.error(`修改主题色失败`);
                });
        } catch (e) {
            console.log(e);
            message.error(`修改主题色失败`);
        }*/
    };

    const overlay = (
        <SketchPicker
            className="shadow-md"
            color={color}
            onChangeComplete={({hex}) => {
                changeTheme(hex);
            }}
        />
    );

    return (
        <Dropdown overlay={overlay} trigger={['click']} placement="bottomRight" arrow>
            <div className="h-full w-8 cursor-pointer flex items-center justify-center">
                <div className="w-4 h-4 rounded" style={{background: color}} />
            </div>
        </Dropdown>
    );
};

export default ThemeSelect;
