import 'whatwg-fetch'; // fetch polyfill
import 'react-select/dist/react-select.css';

import store from './store';


export const init = cb => cb && cb();

export {store};

export default {
  baseUrl: 'http://localhost:8000/',
};
