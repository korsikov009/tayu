export const CONNECTED = 'CONNECTED';
export const LOADING_FROM_SERVER = 'LOADING_FROM_SERVER';

export const loadingFromServer = loading => ({
  type: LOADING_FROM_SERVER,
  loading
})

export const connected = ws => ({
  type: CONNECTED,
  ws
});
