import { createRoot } from 'react-dom/client';

import utils from '../utils';
import assets from '../assets';

import '../styles/index.less';

function App() {
    return (
        <div className="container">
            <div className="luffy" />
            <img src={utils.base.transformAssets(assets.images.luffy)} alt="luffy" />
            1234567890
            <img src={utils.base.transformAssets(assets.images.zero)} alt="zero" />
            <div className="zero" />
        </div>
    );
}

const root = createRoot(document.getElementById('root'));

root.render(<App />);
