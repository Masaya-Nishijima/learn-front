import { MouseEventHandler, useState } from "react";

type SquareValue = "X" | "O" | null;

function Square({ value, highlight, onSquareClick }: { value: SquareValue, highlight: boolean, onSquareClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      className={highlight ? "square bk-yellow" : "square"}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, currentMove, lastPointedSquareIndex, onPlay }: { xIsNext: boolean, squares: Array<SquareValue>, currentMove: number, lastPointedSquareIndex: number | null, onPlay: (nextSquares: Array<SquareValue>) => void  }) {
  const calcLastSquareTwoDimensionalIndex = lastPointedSquareIndex || lastPointedSquareIndex === 0 ? [Math.floor(lastPointedSquareIndex / 3), lastPointedSquareIndex % 3] : [null, null];

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if(currentMove == 9) {
    // 勝敗が決まらず盤面に置ける場所がない状況を引き分けとする。
    // Memo(検討)↑の状況にしかならない盤面で、事前に引き分け判定をすることもありうる?
    status = "Draw";
  }else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {
        [0, 1 ,2].map((row) => {
          return (
            <div className="board-row">
              {
                [0, 1, 2].map((col) => {
                  const squareIndex = row * 3 + col
                  return<Square value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} highlight={ !!winner && row === calcLastSquareTwoDimensionalIndex[0] && col === calcLastSquareTwoDimensionalIndex[1] } />
                })
              }
            </div>
          )
        })
      }
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [moveDirectionReverse, setMoveDirectionReverse] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<SquareValue>) {

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  // 指定のムーブでどこに指したか判定する関数
  function pointedSquareIndex(move: number): number | null {
    if (move === 0) {
      return null;
    } else {
      return history[move].map((square, index) => {
        return history[move - 1][index] !== square;
      }).indexOf(true);
    }
  }

  const moves = history.map((_, move) => {
    let description;

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {
          (move == currentMove) ?
            <div>You are at move #{currentMove}</div> :
            <button onClick={() => jumpTo(move)}>{description}</button>
        }
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} currentMove={currentMove} lastPointedSquareIndex={pointedSquareIndex(currentMove)} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={()=> {setMoveDirectionReverse(!moveDirectionReverse)}}>reverse</button>
        <ol
          className={moveDirectionReverse ? "reverse" : ""}
        >
          {moves}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: Array<SquareValue>): SquareValue {
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
