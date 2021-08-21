import videoJs, {VideoJsPlayer} from 'video.js';
import VjsFormModal from './VideoForm';

const Plugin = videoJs.getPlugin('plugin');

class ModalPlugin extends Plugin {
    constructor(player: VideoJsPlayer, options: {title: string}) {
        super(player, options);
        console.log('pluginsoptions-------', options);
        const modal = new VjsFormModal({
            content: '',
            fillAlways: true,
            // We don't want this modal to go away when it closes.
            temporary: false,
            uncloseable: true,
        });

        player.addChild(modal);
    }
}

export default ModalPlugin;
