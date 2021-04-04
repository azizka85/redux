import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { asyncIncrement, changeTheme, decrement, increment } from './redux/actions';
import { rootReducer } from './redux/rootReducer';
import './styles.css';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

const store = createStore(rootReducer, 
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

addBtn.addEventListener('click', () => {
  store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement());
});

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('dark')
    ? 'light'
    : 'dark';

  store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
  const state = store.getState();

  counter.textContent = state.counter;
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled;
  });
});

store.dispatch({type: 'INIT_APPLICATION'});
