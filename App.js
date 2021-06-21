import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const Board = (props) => {
  return (
    <div>
      
      <div className="board-row">
        <Square value= {props.squares[0]} onClick={() => props.onClick(0)} />
        <Square value= {props.squares[1]} onClick={() => props.onClick(1)} />
        <Square value= {props.squares[2]} onClick={() => props.onClick(2)} />
      </div>
      <div className="board-row">
        <Square value= {props.squares[3]} onClick={() => props.onClick(3)} />
        <Square value= {props.squares[4]} onClick={() => props.onClick(4)}/>
        <Square value= {props.squares[5]} onClick={() => props.onClick(5)}/>
      </div>
      <div className="board-row">
        <Square value= {props.squares[6]} onClick={() => props.onClick(6)}/>
        <Square value= {props.squares[7]} onClick={() => props.onClick(7)}/>
        <Square value= {props.squares[8]} onClick={() => props.onClick(8)}/>
      </div>
    </div>
  );
}

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>{props.value}</button>
  );
}

const Game = (props) => {

  const [history, setHistory] = useState(Array(9).fill(null));
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [stat, setStat] = useState("");
  const [current, setCurrent] = useState(history.length-1);
  
  
  function updateMoves() {
    history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
     }  )
  }

  const[moves, setMoves] = useState(updateMoves());

  function handleClick(i) {
    const histArr = history;
    const squareArr = squares.slice();
    if(squareArr[i] || stat === "Winner: X" || stat === "Winner: O" ) {
      return;
    }
    squareArr[i] = xIsNext ? 'X' : 'O';
    setSquares(squareArr);
    setXIsNext(!xIsNext);
    setHistory(histArr.concat([squares]));
  }

  useEffect(() => {
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
    
    const winner = calculateWinner(squares);
    let stat = "";
    if (winner) {
      setStat('Winner: ' + winner);
    } else {
      let nextMove = xIsNext ? 'X' : 'O'
      setStat('Next player: ' + nextMove);
    }
  })

  useEffect(() => {
    function updateBoard() {
      setCurrent(history[history.length - 1]);
    }
    updateBoard();
  })

  useEffect(() => {
    setMoves(updateMoves());
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i) => handleClick(i)}  />
      </div>
      <div className="game-info">
        <div className="stat">{stat}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


export default App;
