import { createStore, applyMiddleware, compose } from 'redux';
import { GET_PIECE, LOADING_FROM_SERVER } from './actions';
import { rootReducer } from "./reducers";


const logger = store => next => (action) => {
  console.log(`---[${Math.floor(window.performance.now())}]-----------------`);
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const serverHook = store => next => (action) => {
  const ws = store.getState().server.ws;
  const result = next(action);

  if (ws && !action.fromWS && action.type !== LOADING_FROM_SERVER) {
    const sentAction = action.type === GET_PIECE ? { ...action, nextI: store.getState().pieces.nextI } : action;
    ws.send(JSON.stringify(sentAction));
  }
  return result;
};

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middlewares = applyMiddleware(logger, serverHook);
const enhancer = reduxDevTools ? compose(middlewares, reduxDevTools) : middlewares

export default (preloadedState = undefined) =>
  createStore(
    rootReducer,
    preloadedState,
    enhancer
  );
