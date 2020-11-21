import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import playerReducer from '../features/player/playerSlice';
import undoable from 'redux-undo';

export default configureStore({
  reducer: {
    counter: counterReducer,
    player: undoable(playerReducer),
  },
});
