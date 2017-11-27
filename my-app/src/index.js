// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

let persistedState = loadState();
let store = createStore(
      todoApp,
      persistedState
    );

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  });
}, 1000));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
