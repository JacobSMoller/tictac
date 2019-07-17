import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./components/board";
import NewGameButton from "./components/newGameButton";
import ScoreBoard from "./components/scoreBoard";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function anyNull(squares) {
  for (let key in squares) {
    const value = squares[key];
    if (value === null) {
      return true;
    }
  }
  return false;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      player: "X",
      starter: "X",
      scores: { O: 0, X: 0 },
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner) {
      return;
    }
    let player = this.state.player;
    if (squares[i] === null) {
      squares[i] = player;
      player = player === "X" ? "O" : "X";
      this.setState({
        history: history.concat([{ squares: squares }]),
        player: player,
        winner: winner,
        stepNumber: history.length
      });
    }
  }

  resetBoard() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let starter = this.state.starter;
    starter = starter === "X" ? "O" : "X";
    const scores = { ...this.state.scores };
    const winner = calculateWinner(squares);
    if (winner) {
      scores[winner]++;
    }
    this.setState({
      history: [{ squares: Array(9).fill(null) }],
      starter: starter,
      player: starter,
      scores: scores,
      winner: null,
      stepNumber: 0
    });
  }

  jumpTo(step) {
    var player = this.state.starter;
    if (step % 2 === 0) {
      this.setState({
        stepNumber: step,
        player: player
      });
    } else {
      player = player === "X" ? "O" : "X";
      this.setState({
        stepNumber: step,
        player: player
      });
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    let disableNewGame = true;
    if (winner) {
      status = "Winner is " + winner;
      disableNewGame = false;
    } else {
      status = "Next player is " + this.state.player;
    }
    const boardFull = !anyNull(current.squares);
    if (boardFull) {
      status = "Draw";
      disableNewGame = false;
    }
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            setSquare={this.handleClick}
            player={this.state.player}
          />
          <div className="new-game">
            <NewGameButton
              onReset={this.resetBoard}
              disabled={disableNewGame}
            />
          </div>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ScoreBoard scores={this.state.scores} />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
