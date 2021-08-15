import {FC, useRef, useEffect} from 'react';
import videoJs, {VideoJsPlayerOptions} from 'video.js';
import PageContainer from '@/components/page-container';
import vjsAlert, {VideoAlertProps} from './VideoAlert';
import TitleBar from './TitleBar';
import {VideoForm} from './VideoForm';
import {render, unmountComponentAtNode} from 'react-dom';

videoJs.registerComponent('TitleBar', TitleBar);
videoJs.registerComponent('vjsAlert', vjsAlert);

export const defaultVideoPlayerOptions: VideoJsPlayerOptions = {
    autoplay: true,
    controls: true,
    muted: false,
    preload: 'auto',
    fluid: true,
    aspectRatio: '16:9',
    language: 'zh-CN',
    controlBar: {
        pictureInPictureToggle: false,
        // children: [
        //     {name: 'playToggle'}, // 播放按钮
        //     {name: 'currentTimeDisplay'}, // 当前已播放时间
        //     {name: 'progressControl'}, // 播放进度条
        //     {name: 'durationDisplay'}, // 总时间
        //     {
        //         name: 'volumePanel', // 音量控制
        //         // @ts-ignore
        //         inline: false, // 不使用水平方式
        //     },
        //     {
        //         name: 'pictureInPictureToggle',
        //     },
        //     {
        //         name: 'fullscreenToggle',
        //     },
        // ],
    },
    sources: [
        {
            src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
            type: 'video/mp4',
        },
    ],
};

const ModalDialog = videoJs.getComponent('ModalDialog');

videoJs.use('video/mp4', (player) => {
    return {
        setSource(srcObj, next) {
            next(null, srcObj);
        },
        currentTime: function (ct) {
            return ct;
        },
    };
});

const VideoPlayer: FC = () => {
    const videoNode = useRef<any>();

    useEffect(() => {
        const videoTitle = '1111';
        const videoAlertProps: VideoAlertProps = {
            msg: '000000000',
            handleClick: () => {
                console.log('------------');
            },
        };

        const player = videoJs(videoNode.current, defaultVideoPlayerOptions, () => {
            player?.addChild('TitleBar', {text: videoTitle});
            player?.addChild('vjsAlert', videoAlertProps);

            const modal = new ModalDialog(player, {
                content: '',
                fillAlways: true,
                // We don't want this modal to go away when it closes.
                temporary: false,
                uncloseable: true,
            });

            player.addChild(modal);

            player.on('pause', () => {
                modal.open();
                render(<VideoForm player={player} />, modal.contentEl());
            });

            player.on('play', () => {
                unmountComponentAtNode(modal.contentEl());
                modal.close();
            });

            player?.currentTime(10);
        });
        return () => {
            player?.dispose();
        };
    }, []);
    return (
        <PageContainer hasBg={false}>
            <div data-vjs-player className="w-full">
                <video
                    ref={videoNode}
                    className="video-js vjs-big-play-centered"
                    webkit-playsinline=""
                    playsInline
                    x5-video-player-type="h5-page"
                />
            </div>
        </PageContainer>
    );
};

export default VideoPlayer;
