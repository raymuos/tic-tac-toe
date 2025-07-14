import { useState } from 'react'
import './App.css'
import Sheet from './Sheet';

function App() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXNow, setIsXNow] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const [winLine, setWinLine] = useState([]);
  const currentSquares = history[currentMove];

  function handlePlay(nextSqs){
    const nextHistory = [...history.slice(0 , currentMove + 1), nextSqs]
    setHistory(nextHistory);
    setCurrentMove( nextHistory.length - 1);
    setIsXNow(x => !(x));
  }

  function resetBoard(){
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsXNow(true);
    setWinLine([]);
  }

  function continueGame(){
    const nextHistory =  [...history , Array(9).fill(null)];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo( index ){
    setCurrentMove(index);
    setIsXNow(index % 2 === 0);
    setWinLine([]);
  }

  return (
    <>
    <p className="w-full text-center text-amber-500 text-3xl md:text-5xl mt-8 presspixel">Tic-Tac-Toe</p>
    <p className="w-full text-center text-yellow-200 font-bold text-lg my-2 ">By raymuos ❤️</p>
    <Sheet squares={currentSquares} 
           onPlay={handlePlay} 
           isXNow={isXNow} 
           resetBoard={resetBoard} 
           continueGame={continueGame}
           history={history} 
           jumpTo={jumpTo} 
           winLine={winLine} 
           setWinLine={setWinLine}/>
    </>
  )
}

export default App
