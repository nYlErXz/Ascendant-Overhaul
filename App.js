import React, { useState } from 'react';
import './App.css';
import EtherealIlluvials from './EtherealIlluvials';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      <h1>Illuvium Ascendant</h1>
      {!gameStarted && (
        <button onClick={startGame}>Start Game</button>
      )}
      {gameStarted && <EtherealIlluvials />}
    </div>
  );
}

export default App;
