import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      playerXTurn: true,
    }

  }

  handleClick(i) {
    // Player Turn
    const squares = this.state.squares.slice();
    console.log(squares);

    if (calculateWinner(squares) || squares[i]) {
      console.log("winner: " + calculateWinner(squares));
      console.log(squares[i]);
      return;
    }

    squares[i] = 'X';



    // Computer Turn

    this.computerMove(squares);
  }

  computerMove(squares) {
    if (calculateWinner(squares)) {
      this.setState({
        squares: squares,
      })
      return;
    }
    var i = Math.floor(Math.random() * 9);

    while (squares[i]) {
      console.log("Computer tried to move to " + i + ", but it was taken.")
      i = Math.floor(Math.random() * 9);
    };

    squares[i] = 'O';

    this.setState({
      squares: squares,
      playerXTurn: !this.state.playerXTurn,
    });

  }


  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />
      );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.playerXTurn ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const victoryLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < victoryLines.length; i++) {
    const [a, b, c] = victoryLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
