import { createSlice, current } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const RED = 'red'
export const YELLOW = 'yellow'
export const GREEN = 'green'
export const BLUE = 'blue'

export const MAYO = 'Mayo';
export const KETCHUP = 'Ketchup';

function rowScore (nbX) {
  return (nbX+1)*nbX/2;
}

function totalScore (s) {
  // given a full state computes the Score
  let score0 = rowScore(s.playState[0].reduce((total, cs) => {return total+(cs.played ? 1:0)}, 0));
  let score1 = rowScore(s.playState[1].reduce((total, cs) => {return total+(cs.played ? 1:0)}, 0));
  let score2 = rowScore(s.playState[2].reduce((total, cs) => {return total+(cs.played ? 1:0)}, 0));
  let score3 = rowScore(s.playState[3].reduce((total, cs) => {return total+(cs.played ? 1:0)}, 0));
  return score0 + score1 + score2 + score3 - s.playerMisses*5;
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    id: nanoid(),
    team: MAYO,
    playerMisses: 0,
    playerName: "choose a name",
    playerScore: 0,
    playerStatus: 'passive',
    lockedRows: [false, false, false, false],
    gameStatus: 'inProgress', // will be 'over' at the end
    playState: [
      [
        {position:1, value:2, color: RED, available: true, played:false},
        {position:2, value:3, color: RED, available: true, played:false},
        {position:3, value:4, color: RED, available: true, played:false},
        {position:4, value:5, color: RED, available: true, played:false},
        {position:5, value:6, color: RED, available: true, played:false},
        {position:6, value:7, color: RED, available: true, played:false},
        {position:7, value:8, color: RED, available: true, played:false},
        {position:8, value:9, color: RED, available: true, played:false},
        {position:9, value:10, color: RED, available: true, played:false},
        {position:10, value:11, color: RED, available: true, played:false},
        {position:11, value:12, color: RED, available: true, played:false},
        {position:12, value:'--|', color: RED, available: true, played:false},
      ],
    [
        {position:1, value:2, color: YELLOW, available: true, played:false},
        {position:2, value:3, color: YELLOW, available: true, played:false},
        {position:3, value:4, color: YELLOW, available: true, played:false},
        {position:4, value:5, color: YELLOW, available: true, played:false},
        {position:5, value:6, color: YELLOW, available: true, played:false},
        {position:6, value:7, color: YELLOW, available: true, played:false},
        {position:7, value:8, color: YELLOW, available: true, played:false},
        {position:8, value:9, color: YELLOW, available: true, played:false},
        {position:9, value:10, color: YELLOW, available: true, played:false},
        {position:10, value:11, color: YELLOW, available: true, played:false},
        {position:11, value:12, color: YELLOW, available: true, played:false},
        {position:12, value:'--|', color: YELLOW, available: true, played:false},
    ],
     [
        {position:1, value:12, color: GREEN, available: true, played:false},
        {position:2, value:11, color: GREEN, available: true, played:false},
        {position:3, value:10, color: GREEN, available: true, played:false},
        {position:4, value:9, color: GREEN, available: true, played:false},
        {position:5, value:8, color: GREEN, available: true, played:false},
        {position:6, value:7, color: GREEN, available: true, played:false},
        {position:7, value:6, color: GREEN, available: true, played:false},
        {position:8, value:5, color: GREEN, available: true, played:false},
        {position:9, value:4, color: GREEN, available: true, played:false},
        {position:10, value:3, color: GREEN, available: true, played:false},
        {position:11, value:2, color: GREEN, available: true, played:false},
        {position:12, value:'--|', color: GREEN, available: true, played:false},
      ],
    [
        {position:1, value:12, color: BLUE, available: true, played:false},
        {position:2, value:11, color: BLUE, available: true, played:false},
        {position:3, value:10, color: BLUE, available: true, played:false},
        {position:4, value:9, color: BLUE, available: true, played:false},
        {position:5, value:8, color: BLUE, available: true, played:false},
        {position:6, value:7, color: BLUE, available: true, played:false},
        {position:7, value:6, color: BLUE, available: true, played:false},
        {position:8, value:5, color: BLUE, available: true, played:false},
        {position:9, value:4, color: BLUE, available: true, played:false},
        {position:10, value:3, color: BLUE, available: true, played:false},
        {position:11, value:2, color: BLUE, available: true, played:false},
        {position:12, value:'--|', color: BLUE, available: true, played:false},
    ],
    ]

  },
  reducers: {
    addMiss: (state) => {
      if (current(state).gameStatus === 'inProgress') {
        state.playerMisses += 1;
        // now update Score
        state.playerScore = totalScore(current(state))
      }
      if (current(state).playerMisses >= 4) {
        state.gameStatus = 'GameOver';
      }
    },
    lockRow: (state, action) => {
      state.lockedRows[action.payload] = true;

    },
    setName: (state, action) => {
      state.playerName = action.payload;
    },
    toggleTeam: (state) => {
      if (current(state).team === MAYO) {
        state.team = KETCHUP;
      } else {
        state.team = MAYO;
      }
    },
    setAvailable: (state, action) => {
      state.playState[action.payload.row][action.payload.position - 1].available = action.payload.available;
    },
    setPlayed: (state, action) => {
      const row = action.payload.row;
      const playedPosition = action.payload.position;
      const currentRow = current(state).playState[row];
      const index = currentRow.findIndex(cellState => (cellState.position === playedPosition));
      const playedAvailable = currentRow[index].available;
      const highPlay = currentRow.map(cellState => (cellState.played === true)).lastIndexOf(true);

      console.log("in setPlayed row", row, " currentRow", currentRow,
      " index ", index, "highPlay ", highPlay, "playedPosition ", playedPosition);
      if (!playedAvailable) {
        // ignore when cell is not available
        return;
      }
      if (playedPosition === 12 && !currentRow[index].played) {
        // click on lock cell means lock row (other team player locked the row)
        console.log("before lock ", current(state).lockedRows[row])
        state.lockedRows[row] = !current(state).lockedRows[row];
        console.log("after lock ", current(state));
        return;
      }
      if ((playedPosition === 11) && action.payload.played) {
        // last position can be played iff at least 5 cells played before
        if (currentRow.reduce((total, cs) => {return total+(cs.played ? 1:0)}, 0) < 5) {
          return;
        }
      }

      state.playState[row][index].played = true;
      if (index===10) {
        // last position was played so lock the row
        state.playState[row][11].played = true;
      };
      console.log("before for with index", index);
      for (let i=index-1;i>=0;i--) {
        // make unavailable all previous unplayed cells
        console.log("i ",i);
        state.playState[row][i].available = currentRow[i].played;
      };
      // now update Score
      state.playerScore = totalScore(current(state));
    },
  },
});

export const { setName, setAvailable, setPlayed, toggleTeam, addMiss } = playerSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.[sliceName].value)`
// Note: when using redux-undo, you reference state.[sliceName].present.[targetKey]
export const selectName = state => state.player.present.playerName;
export const selectId = state => state.player.present.id;
export const selectPlayState = state => state.player.present.playState;
export const selectScore = state => state.player.present.playerScore;
export const selectMisses = state => state.player.present.playerMisses;
export const selectTeam = state => state.player.present.team;
export const selectLockedRows = state => state.player.present.lockedRows;

export default playerSlice.reducer;
