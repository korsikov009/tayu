import { store } from './store';
import { newGame } from './actions';

it('number of initial pieces is 84', () => {
  expect(store.getState().pieces.next.length).toEqual(84);
});
