import {FC, useRef, useEffect} from 'react';
import videoJs, {VideoJsPlayerOptions} from 'video.js';
import PageContainer from '@/components/page-container';
import VjsAlert, {VideoAlertProps} from './VideoAlert';
import TitleBar from './TitleBar';
import ModalPlugin from './plugin';
import './video.css';

videoJs.registerComponent('TitleBar', TitleBar);
videoJs.registerComponent('VjsAlert', VjsAlert);
videoJs.registerPlugin('modal', ModalPlugin);

export const VIDEO_ID = 'antd-video-demo';

export const defaultVideoPlayerOptions: VideoJsPlayerOptions = {
    autoplay: true,
    controls: true,
    muted: false,
    preload: 'auto',
    fluid: true,
    aspectRatio: '16:9',
    language: 'zh-CN',
    controlBar: {
        children: [
            {name: 'playToggle'}, // 播放按钮
            {name: 'progressControl'}, // 播放进度条
            {name: 'currentTimeDisplay'}, // 当前已播放时间
            {name: 'durationDisplay'}, // 总时间
            {name: 'volumePanel'}, // 音量控制
            {name: 'fullscreenToggle'},
        ],
    },
    sources: [
        {
            src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
            type: 'video/mp4',
        },
    ],
    plugins: {
        modal: {
            title: '+++++++',
        },
    },
};

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
            // player?.addChild('VjsAlert', videoAlertProps);

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
                    id={VIDEO_ID}
                    ref={videoNode}
                    className="video-js vjs-big-play-centered vjs-sublime-skin"
                    webkit-playsinline=""
                    playsInline
                    x5-video-player-type="h5-page"
                />
            </div>
        </PageContainer>
    );
};

export default VideoPlayer;
