import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { getPiece, loadGame, newGame } from "../../redux/actions";

// components
import Scores from "../scores/scores";

const Controls = () => {
  const state =  useSelector(state => state);
  const score =  state.pieces.score;
  const dispatch = useDispatch();
  const scoreV = score.top * score.bottom;
  const scoreH = score.left * score.right;

  return (
    <div className="panel">
      <button
        className="control"
        onClick={() => {
          dispatch(newGame());
          dispatch(getPiece());
        }}
      >
        New game
      </button>
      <button
        className="control"
        onClick={() => {
          const b = new Blob([JSON.stringify(state)], {
            type: 'application/json',
          });
          const url = window.URL.createObjectURL(b);
          const a = document.createElement('A');

          a.href = url;
          a.download = 'tayu-state.json';
          document.body.append(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }}
      >
        Export state
      </button>
      <input
        className="control"
        type="file"
        id="importState"
        onChange={(evt) => {
          const dump = evt.target.files[0];

          if (dump.type !== 'application/json') {
            alert('JSON format only.');
          } else {
            const b = dump.slice();
            const fr = new FileReader();

            fr.addEventListener('loadend', (evt) => {
              try {
                dispatch(loadGame(JSON.parse(evt.target.result)));
              } catch (e) {
                alert('Error during JSON parsing.');
              }
            });
            fr.readAsText(b);
          }
        }}
      />
      <label className="control" htmlFor="importState">Import state</label>
      <Scores scoreV={scoreV} scoreH={scoreH}/>
    </div>
  );
};

export default Controls;
