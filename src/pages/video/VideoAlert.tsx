import videoJs, {VideoJsPlayer} from 'video.js';
import {render, unmountComponentAtNode} from 'react-dom';
import {FC, useState} from 'react';
import {Alert, Button} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import style from './index.module.less';

export interface VideoAlertProps {
    msg: string;
    handleClick: () => void;
    vjs?: VideoJsPlayer;
}

const VideoAlert: FC<VideoAlertProps> = (props) => {
    const {msg, handleClick} = props;
    const [show, setShow] = useState(true);
    return show ? (
        <>
            <Alert message={msg} type={'success'} />
            <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size={'large'}
                onClick={() => {
                    handleClick();
                    setShow(false);
                }}
            >
                hidden
            </Button>
        </>
    ) : (
        <div />
    );
};

const Component = videoJs.getComponent('Component');

class vjsAlert extends Component {
    constructor(player: VideoJsPlayer, options: any) {
        super(player, options);
        this.mount = this.mount.bind(this);

        player.ready(() => {
            this.mount(options);
        });

        this.on('dispose', () => {
            unmountComponentAtNode(this.el());
        });
    }

    createEl() {
        return super.createEl('div', {
            className: style.alert,
        });
    }

    mount(props) {
        render(<VideoAlert {...props} vjs={this} />, this.el());
    }
}

export default vjsAlert;
