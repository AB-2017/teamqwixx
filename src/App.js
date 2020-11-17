import React from 'react';
import logo from './logo.svg';
import { Counter  } from './features/counter/Counter';
import { Player } from './features/player/Player';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h2> Team Qwixx Player Sheet </h2>
      <Player key="player1"/>
      </header>
    </div>
  );
}

export default App;
