// node_modules
import React from "react";

// components
import Footer from "./components/Footer.js";
import GameBoard from "./components/GameBoard.js";
import Header from "./components/Header.js";
import MoveController from "./components/MoveController.js";

// styles
import "./bootstrap.min.css";

// constants
const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStateIndex: Number("0"),
      gameStates: [new GameState()],
      gameWinner: "X",
    };
  }

  render() {
    const { state } = this;
    const { gameStateIndex, gameWinner } = state;

    return (
      <div className="container-sm">
        <div className="row">
          
          {/* Title Header */}
          <Header>
            <h1 className="text-light">{"React-Tac-Toe"}</h1>
            {gameWinner && (
              <div className="bg-light d-flex p-2 rounded">
                <h2 className="m-0">{`⭐ ${gameWinner} wins! ⭐`}</h2>
              </div>
            )}
          </Header>

          {/* Game Board */}
          <GameBoard
            gameState={this.getCurrentGameState()}
            onGameMove={(index) => this.handleUpdateGame(index)}
          />

          {/* Move Count & Time-Travel Footer */}
          <Footer>
            <MoveController
              moveNumber={gameStateIndex + Number("1")}
              onRedo={() => this.handleRedo()}
              onReset={() => this.handleReset()}
              onUndo={() => this.handleUndo()}
            />
          </Footer>

        </div>
      </div>
    );
  }

  getCurrentGameState() {
    const { state } = this;
    const { gameStateIndex, gameStates } = state;
    return gameStates[gameStateIndex];
  }

  handleCheckForWinner(gameState) {
    const tiles = gameState.getTiles();
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (
        tiles[a] && 
        tiles[a] === tiles[b] && 
        tiles[a] === tiles[c]
      ) {
        return true;
      }
    }
    return false;
  }

  handleRedo() {
    const { state } = this;
    const { gameStateIndex, gameStates } = state;
    const newGameStateIndex = Math.min(
      gameStates.length - Number("1"),
      gameStateIndex + Number("1")
    );
    this.setState({ gameStateIndex: newGameStateIndex });
  }

  handleReset() {
    this.setState({
      gameStateIndex: Number("0"),
      gameStates: [new GameState()],
      gameWinner: null,
    });
  }

  handleUndo() {
    const { state } = this;
    const { gameStateIndex } = state;
    const newGameStateIndex = Math.max(
      Number("0"),
      gameStateIndex - Number("1")
    );
    this.setState({ gameStateIndex: newGameStateIndex });
  }

  handleUpdateGame(moveIndex) {
    const { state } = this;
    const { gameStateIndex, gameStates, gameWinner } = state;

    // current game state
    const currentGameState = this.getCurrentGameState();
    const move = currentGameState.getMove();
    const tiles = currentGameState.getTiles();

    // ignore if game already won
    // or tile already occupied
    if(
      gameWinner !== null ||
      tiles[moveIndex] === String("X") ||
      tiles[moveIndex] === String("O")
    ) {
      return;
    }
    else {
      tiles[moveIndex] = move;
    }

    // handle next game state
    const nextMove = move === String("X") ? String("O") : String("X");
    const newGameState = new GameState({ move: nextMove, tiles });
    const newGameStates = [...gameStates].slice(Number("0"), gameStateIndex + Number("1"));
    newGameStates.push(newGameState);

    // check for winner
    const isWinner = this.handleCheckForWinner(newGameState);

    // update state
    this.setState({
      gameStateIndex: gameStateIndex + Number("1"),
      gameStates: newGameStates,
      gameWinner: isWinner ? move : null,
    });
  }
}
export default App;

class GameState {
  constructor({
    move = String("X"),
    tiles = Array(Number("9")),
  } = {}) {
    this.state = {
      move,
      tiles,
    };
  }

  getMove() {
    return String(this.state.move);
  }

  getTiles() {
    return [...this.state.tiles];
  }
}
