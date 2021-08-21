import videoJs, {VideoJsPlayer} from 'video.js';
import {FC} from 'react';
import {Button, Form, Input, Card} from 'antd';
import {render, unmountComponentAtNode} from 'react-dom';
import {VIDEO_ID} from './index';

const VideoForm: FC<{player?: VideoJsPlayer}> = ({player}) => {
    const onFinish = (value: any) => {
        console.log(value);
        player?.play();
    };

    return (
        <Card>
            <Form onFinish={onFinish}>
                <Form.Item label={'video'} name={'video'}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

const ModalDialog = videoJs.getComponent('ModalDialog');

class VjsFormModal extends ModalDialog {
    private readonly _player: VideoJsPlayer;
    constructor(options) {
        const player = videoJs.getPlayer(VIDEO_ID);
        super(player, options);
        this._player = player;
        this.mount = this.mount.bind(this);

        player.on('pause', () => {
            this.open();
        });
        player.on('play', () => {
            this.close();
        });
    }

    open() {
        super.open();
        this.mount();
    }

    close() {
        unmountComponentAtNode(this.contentEl());
        super.close();
    }

    mount() {
        render(<VideoForm player={this._player} />, this.contentEl());
    }
}

export default VjsFormModal;
export {VideoForm};
