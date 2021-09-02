import React from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { connected, loadingFromServer } from "../../redux/reducers/server/actions";

import { https, serverAddr, serverPort } from "../../config";

const Server = ({ children }) => {
  const { ws, loading } = useSelector(state => state.server);
  const dispatch = useDispatch();
  const loadingOutput = (
    <div style={{
      color: '#B2497D',
      fontFamily: 'sans-serif',
      fontSize: '50px',
      marginTop: '50px',
      textAlign: 'center',
      textShadow: '0px 0px 20px #B2497D, 0px 0px 40px #B2497D, 0px 0px 80px #B2497D',
    }}>
      Loading...
    </div>
  );

  if (!ws) {
    const newWS = new WebSocket(`${https ? 'wss' : 'ws'}://${serverAddr}:${serverPort}/tayu-api`);
    dispatch(loadingFromServer(true));

    newWS.onmessage = message => {
      try {
        const actionList = JSON.parse(message.data);
        actionList.forEach(action => dispatch({ ...action, fromWS: true }));
        dispatch(loadingFromServer(false));
      } catch (e) {}
    };

    dispatch(connected(newWS));
    return loadingOutput;
  } else if (loading) {
    return loadingOutput;
  } else {
    return (
      <div>
        {children}
      </div>
    );
  }
};

export default Server;
