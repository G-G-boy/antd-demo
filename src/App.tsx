import {FC} from 'react';
import './App.scss';
import img from './assets/imgs/timg.jpg';

const App: FC = () => {
    return (
        <div>
            <img src={img} />
        </div>
    );
};

export default App;
