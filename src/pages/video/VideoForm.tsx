import videoJs, {VideoJsPlayer} from 'video.js';
import {FC, useEffect} from 'react';

const VideoForm: FC<{player: VideoJsPlayer}> = ({player}) => {
    useEffect(() => {
        console.log('++++++++++++');
        return () => {
            console.log('--------------');
        };
    }, []);
    return (
        <div
            style={{
                zIndex: 999,
                width: 200,
                height: 200,
                background: 'red',
            }}
            onClick={() => {
                player?.play();
            }}
        >
            1111
        </div>
    );
};

const ModalDialog = videoJs.getComponent('ModalDialog');

// class vjsForm extends ModalDialog {
//     constructor(player: VideoJsPlayer, options) {
//         super(player, options);
//         console.log('options=======', options);
//         this.mount = this.mount.bind(this);
//
//         player.ready(() => {
//             this.mount(options);
//         });
//
//         this.on('dispose', () => {
//             unmountComponentAtNode(this.el());
//         });
//     }
//
//     mount(props) {
//         render(<VideoForm />, this.el());
//     }
// }
//
// export default vjsForm;
export {VideoForm};
