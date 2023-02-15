import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

import Container from './containers';

import './styles/index.less';

const root = createRoot(document.getElementById('root'));
const { App } = Container;
root.render(<Provider store={store}><App /></Provider>);
