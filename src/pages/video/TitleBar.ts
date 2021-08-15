import videoJs from 'video.js';

const Component = videoJs.getComponent('Component');

class TitleBar extends Component {
    constructor(player: any, options: any) {
        super(player, options);

        if (options.text) {
            this.updateTextContent(options.text);
        }
    }

    createEl() {
        return super.createEl('div', {
            className: 'vjs-title-bar',
        });
    }

    updateTextContent(text: string) {
        videoJs.dom.emptyEl(this.el());
        videoJs.dom.appendContent(this.el(), text);
    }
}

export default TitleBar;
