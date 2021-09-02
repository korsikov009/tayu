import { combineReducers } from 'redux';

import { piecesReducer } from './pieces';
import { serverReducer } from './server';

export const rootReducer = combineReducers({
  pieces: piecesReducer,
  server: serverReducer,
});
