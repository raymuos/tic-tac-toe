import { useEffect, useState } from "react";
import Box from "./Box";

function Sheet({
                squares, 
                isXNow, 
                onPlay, 
                resetBoard, 
                continueGame, 
                winLine, 
                setWinLine, 
                history, 
                jumpTo
            }){

    const [status, setStatus] = useState('');
    function handleMove(i) {
        if(squares[i] || calcWinner(squares)) return;

        const newSquares = squares.slice();
        newSquares[i] = (isXNow)? 'X' : 'O' ;
        onPlay(newSquares);
        //This goes back to the App component and executes handlePlay()
    }

    const moves = history.map((_, moveNum) => {
        return( (moveNum !== 0) ?
                            <li key={moveNum}>
                                <button 
                                        onClick={() => jumpTo(moveNum)}
                                        className="
                                 bg-purple-700 hover:bg-purple-500 px-8 py-2
                                 transition duration-100 ease-in-out cursor-pointer hover:scale-105  
                                 rounded-lg text-xl font-semibold shadow
                                "> 
                                    Go to Move #{moveNum} 
                                </button>
                            </li> : null)
    })
                            

    
    //updates when squares or isXNow changes 
    useEffect( () => {
        const result = calcWinner(squares);
        if (result){
            setStatus('Winner: ' + result.winner);
            setWinLine(result.line);

        } else if(squares.includes(null) && squares){
            setStatus(`${(isXNow)? 'X' : 'O'}'s turn`);

        } else {
            setStatus("It's a Draw!");
        }

    } , [squares, isXNow]);


    

    return(
        <div className="flex justify-center items-start  bg-gray-900 text-white p-4">
        {/* Game Board */}
        <div className="flex-[3] flex flex-col justify-center items-center">
            
            <div className="flex flex-col border border-[#ddd] mt-20">
            {/* Row 1 */}
            <div className="flex">
                <Box value={squares[0]} onSquareClick={() => handleMove(0)} isGreen={winLine.includes(0)} />
                <Box value={squares[1]} onSquareClick={() => handleMove(1)} isGreen={winLine.includes(1)} />
                <Box value={squares[2]} onSquareClick={() => handleMove(2)} isGreen={winLine.includes(2)} />
            </div>
            {/* Row 2 */}
            <div className="flex">
                <Box value={squares[3]} onSquareClick={() => handleMove(3)} isGreen={winLine.includes(3)} />
                <Box value={squares[4]} onSquareClick={() => handleMove(4)} isGreen={winLine.includes(4)} />
                <Box value={squares[5]} onSquareClick={() => handleMove(5)} isGreen={winLine.includes(5)} />
            </div>
            {/* Row 3 */}
            <div className="flex">
                <Box value={squares[6]} onSquareClick={() => handleMove(6)} isGreen={winLine.includes(6)} />
                <Box value={squares[7]} onSquareClick={() => handleMove(7)} isGreen={winLine.includes(7)} />
                <Box value={squares[8]} onSquareClick={() => handleMove(8)} isGreen={winLine.includes(8)} />
            </div>
            </div>
        </div>

        {/* Sidebar */}
        <div className="flex-[2] flex flex-col justify-start items-center gap-8">
            <p className="w-2/3 text-center text-4xl font-bold bg-cyan-700 px-6 py-4 rounded-xl shadow-md">
            {status}
            </p>

        <div className="flex items-center gap-4">
            <button
                onClick={resetBoard} //Goes back to App
                className="
                bg-red-700 hover:bg-red-500 transition duration-300 ease-in-out cursor-pointer
                hover:text-black hover:scale-105 px-6 py-2 rounded-full text-2xl font-bold shadow
                ">
                {calcWinner(squares) ? 'Play Again' : 'Reset'}
            </button>

            {!(squares.includes(null)) && !calcWinner(squares) && (
                <button
                    onClick={continueGame} //Goes back to App
                    className="
                    bg-green-700 hover:bg-green-500 transition duration-300 ease-in-out cursor-pointer
                    hover:text-black hover:scale-105 px-6 py-2 rounded-full text-2xl font-bold shadow
                    ">
                    Continue
                </button>
            )}
        </div>
            

            <div className="overflow-auto w-2/3 h-85 scroll-thin bg-gray-800 
                            border-2 border-gray-600 p-4">
                <ol className="flex flex-col flex-wrap items-center gap-4">
                    {moves}
                </ol>
            </div>

        </div>

        </div>
    )
}

function calcWinner(sqs){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]

    for(let i=0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(sqs[a] && sqs[a] === sqs[b] && sqs[a] === sqs[c]){
            return {winner: sqs[a], line: [a,b,c]};
        }
    }

    return null;
}

export default Sheet;