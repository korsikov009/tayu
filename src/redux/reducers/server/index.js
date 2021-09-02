import { CONNECTED, LOADING_FROM_SERVER } from "./actions";

export const serverReducer = (state = {}, action) => {
  switch(action.type) {
    case CONNECTED:
      return {
        ...state,
        ws: action.ws
      }
    case LOADING_FROM_SERVER:
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
};
