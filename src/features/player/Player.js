import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  RED, YELLOW, GREEN, BLUE, KETCHUP, MAYO,
  addMiss,
  lockRow,
  setName,
  setAvailable,
  setPlayed,
  toggleTeam,
  selectId,
  selectLockedRows,
  selectMisses,
  selectName,
  selectPlayState,
  selectScore,
  selectTeam,
} from './playerSlice';
import styles from './Player.module.css';
import { ActionCreators } from "redux-undo";




// const PlayNumber = props => (
//   <>
//     <td  className={COLORS[props.color]} onMouseUp={props.onMouseUp}>{props.number}</td>
//   </>
// );

export function Player() {

  const playerName = useSelector(selectName);
  const team = useSelector(selectTeam);
  const playerId = useSelector(selectId);
  const playerScore = useSelector(selectScore);
  const playState = useSelector(selectPlayState);
  const playerMisses = useSelector(selectMisses);
  const lockedRows = useSelector(selectLockedRows);

  const dispatch = useDispatch();


  function styleFromColor(color) {
    let result;
    switch (color) {
      case RED:
        result = styles.red;
        break;
      case YELLOW:
        result = styles.yellow;
        break;
      case GREEN:
        result = styles.green;
        break;
      case BLUE:
          result = styles.blue;
          break;
      default:
        result = styles.default;

    }
    return result;
  }

  function cellState(row, index) {return playState[row][index];};

  // Math science
  const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
}

console.log("locked rows ", lockedRows);
// console.log(COLORS);
// Object.keys(COLORS).map(c =>{
// utils.range(2,12).map(number =>{
//   console.log("key:" , playerId+':'+c+':'+number)})});
  // Object.keys(COLORS).map(c => {
  //   <tr key={playerId+':'+c} className={COLORS[c].sty}> {
  //     utils.range(2,12).map(number =>
  //       <td key={playerId+':'+c+':'+number} className={styles.Box}>{number}</td>)
  //     }
  //     <td className={styles.Box}>$</td>
  //     </tr>
return (
  <div>
  <div className={styles.Grid}>
  <div className={styles.GridItem}
       onMouseUp={() => dispatch(toggleTeam())}>Team: <span>{team}</span></div>
  <div className={styles.GridItem}>Player: <input type="text" id="pname"
              className={styles.Name} value={playerName}
              onChange={(e)=>dispatch(setName(e.target.value))}/>
  </div>
  <div className={styles.GridItemRight}><span>{playerScore}</span> pt</div>
  </div>
  <table className={styles.Table}>
    <tbody>
      <tr key={playerId+':'+0} className={styles.Row}>
      {
             playState[0].map(cellState =>
              <td key={playerId+':'+cellState.row+':'+cellState.position}
                  className={styles.Box + " "+ (cellState.available ?
                    ((cellState.played || !lockedRows[0]) ?
                     styleFromColor(cellState.color)
                     : styles.locked )
                    : styles.unavailable) }
                  onMouseUp={()=>!lockedRows[0] && cellState.available && dispatch(setPlayed({row:0, value:cellState.value, position:cellState.position, played:true}))}>
                  {cellState.played ? 'X' : cellState.value}
              </td>)
          }
      </tr>
      <tr key={playerId+':'+1} className={styles.Row}>
      {
             playState[1].map(cellState =>
              <td key={playerId+':'+cellState.row+':'+cellState.position}
              className={styles.Box + " "+ (cellState.available ?
                ((cellState.played || !lockedRows[1]) ?
                 styleFromColor(cellState.color)
                 : styles.locked )
                : styles.unavailable) }                  onMouseUp={()=>!lockedRows[1] && cellState.available && dispatch(setPlayed({row:1, value:cellState.value, position:cellState.position, played:true}))}>
                  {cellState.played ? 'X' : cellState.value}
              </td>)
          }
      </tr>
      <tr key={playerId+':'+2} className={styles.Row}>
      {
             playState[2].map(cellState =>
              <td key={playerId+':'+cellState.row+':'+cellState.position}
              className={styles.Box + " "+ (cellState.available ?
                ((cellState.played || !lockedRows[2]) ?
                 styleFromColor(cellState.color)
                 : styles.locked )
                : styles.unavailable) }                  onMouseUp={()=>!lockedRows[2] && cellState.available && dispatch(setPlayed({row:2, value:cellState.value, position:cellState.position, played:true}))}>
                  {cellState.played ? 'X' : cellState.value}
              </td>)
          }
      </tr>
      <tr key={playerId+':'+3} className={styles.Row}>
      {
             playState[3].map(cellState =>
              <td key={playerId+':'+cellState.row+':'+cellState.position}
              className={styles.Box + " "+ (cellState.available ?
                ((cellState.played || !lockedRows[3]) ?
                 styleFromColor(cellState.color)
                 : styles.locked )
                : styles.unavailable) }                  onMouseUp={()=>!lockedRows[3] && cellState.available && dispatch(setPlayed({row:3, value:cellState.value, position:cellState.position, played:true}))}>
                  {cellState.played ? 'X' : cellState.value}
              </td>)
          }
      </tr>
      <tr className={styles.Row}>
      <td className={styles.Box + " " + styles.col2 + " "+ styles.misses }>
      Miss
      </td>
      {utils.range(1,4).map(nbMiss =>
        <td key={playerId+':'+cellState.row+':M'+nbMiss}
            className={styles.Box + " " + styles.misses}
            onMouseUp={() => dispatch(addMiss())}>
        {(playerMisses>=nbMiss) ? 'X' : ''}
        </td>
      )}
      <td/>
      <td/>
      <td/>
      <td/>
      <td/>
      <td>
      <button
        aria-label="undo last change"
        onClick={() => dispatch(ActionCreators.undo())}>undo</button>
      </td>
      <td>
      <button aria-label="redo last change"
      onClick={() => dispatch(ActionCreators.redo())}>redo</button>
      </td>
      </tr>
      </tbody>
      </table>
    </div>
  );
}
// <div className={styles.Grid}>
// <div className={styles.GridItem}> <button id="pmiss"
//             className={styles.Button}
//             onClick={() => dispatch(addMiss())}> Miss </button>
// </div>
// <div className={styles.GridItem}>Missed: <span>{playerMisses}</span></div>
//     </div>
