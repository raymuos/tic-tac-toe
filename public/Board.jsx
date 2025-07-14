import { useState } from 'react'
import './App.css'
import Square from './Square';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);
  const [statusGame, setStatusGame] = useState('Welcome to Tix Tax Toe');
  const [winningLine, setWinningLine] = useState([]);

  function handleClick(i){

    if(squares[i] || declareWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = isXNext? 'O' : "X";
    setSquares(nextSquares);
    setIsXNext(x => !(x));
    
    const result = declareWinner(nextSquares);
    // setStatusGame( (winner)? `Winner: ${winner}`: `Next Player: ${(isXNext)? 'X' : 'O'}`);
    if (result) {
      setStatusGame('Winner: ' + result.winner);
      setWinningLine(result.line);
    } else {
      setStatusGame(`Next Player: ${(isXNext)? 'X' : 'O'}`);
    }

  }

  function declareWinner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for( let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return { winner: squares[a] , line: [a,b,c] };
      }
    }

    return null;
  }


  return (
    <div className="flex flex-col justify-baseline items-center min-h-[100vh]" >
      <p className='text-4xl font-semibold text-center my-10 bg-gray-700 px-4 py-1 rounded-lg' > {statusGame} </p>
      <div className="flex flex-col gap-0 border-[1px] border-[#ddd]" >
        <div className="flex gap-0" >
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} isGreen={winningLine.includes(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} isGreen={winningLine.includes(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} isGreen={winningLine.includes(2)} />
        </div>

        <div className="flex gap-0" >
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} isGreen={winningLine.includes(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} isGreen={winningLine.includes(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} isGreen={winningLine.includes(5)} />
        </div>

        <div className="flex gap-0" >
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} isGreen={winningLine.includes(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} isGreen={winningLine.includes(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} isGreen={winningLine.includes(8)} />
        </div>
      </div>
    </div>
  )
}

export default Board;
