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
    const [isBotOn, setIsBotOn] = useState(true);

    function handleClick(i) {
        if(squares[i] || calcWinner(squares)) return;

        const newSquares = squares.slice();
        newSquares[i] = (isXNow)? 'X' : 'O' ;
        onPlay(newSquares);
        //This goes back to the App component and executes handlePlay()
    }

    const toggleBot = () => {
        resetBoard();
        setIsBotOn(x => !x);
    }
          
    const triggerBot = () => {
        if( !isXNow && !calcWinner(squares) && isBotOn ){
            const emptyIndices = squares.map((sq,i) => (sq === null ? i : null))
                                        .filter((sq) => sq !== null);
            if (emptyIndices.length === 0) return;

            const randomIndex = emptyIndices[
                Math.floor(Math.random() * emptyIndices.length)
            ]
            const timer = setTimeout(() => handleClick(randomIndex), 750);
            return () => clearTimeout(timer);
        }
         
    }

    const moves = history.map((_, moveNum) => {
        return( (moveNum !== 0) ?
                            <li key={moveNum} className="w-full">
                                <button 
                                        onClick={() => jumpTo(moveNum)}
                                        className="
                                 bg-purple-700 hover:bg-purple-500 
                                 px-2 md:px-6 py-1 md:py-2
                                 transition duration-100 ease-in-out cursor-pointer hover:scale-105  
                                 rounded-md md:rounded-lg w-full
                                 text-lg md:text-xl font-semibold shadow
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
            setStatus(`${(isXNow)? 'X' : (isBotOn? 'Bot' : 'O')}'s turn`);

        } else {
            setStatus("Tie!");
        }

    } , [squares, isXNow]);

    useEffect( triggerBot , [isXNow , squares]);
    

    return(
        <div className="flex flex-col justify-start items-center gap-6
                        min-[600px]:flex-row min-[600px]:justify-center 
                        min-[600px]:items-start min-[600px]:gap-0
                        bg-gray-900 text-white p-4">
        {/* Game Board */}
        <div className="min-[600px]:flex-[3] flex flex-col justify-center items-center">
            
            <div className="flex flex-col border border-[#ddd] mt-5 min-[600px]:mt-20">
            {/* Row 1 */}
            <div className="flex">
                <Box value={squares[0]} onSquareClick={() => handleClick(0)} isGreen={winLine.includes(0)} />
                <Box value={squares[1]} onSquareClick={() => handleClick(1)} isGreen={winLine.includes(1)} />
                <Box value={squares[2]} onSquareClick={() => handleClick(2)} isGreen={winLine.includes(2)} />
            </div>
            {/* Row 2 */}
            <div className="flex">
                <Box value={squares[3]} onSquareClick={() => handleClick(3)} isGreen={winLine.includes(3)} />
                <Box value={squares[4]} onSquareClick={() => handleClick(4)} isGreen={winLine.includes(4)} />
                <Box value={squares[5]} onSquareClick={() => handleClick(5)} isGreen={winLine.includes(5)} />
            </div>
            {/* Row 3 */}
            <div className="flex">
                <Box value={squares[6]} onSquareClick={() => handleClick(6)} isGreen={winLine.includes(6)} />
                <Box value={squares[7]} onSquareClick={() => handleClick(7)} isGreen={winLine.includes(7)} />
                <Box value={squares[8]} onSquareClick={() => handleClick(8)} isGreen={winLine.includes(8)} />
            </div>
            </div>
        </div>

        {/* Sidebar */}
        <div className="min-[600px]:flex-[2] flex flex-col justify-start items-center gap-4
                        min-[600px]:gap-6 w-7/8 min-[600px]:w-auto">
            <p className={`text-2xl lg:text-3xl
                          w-full min-[925px]:w-2/3 
                          text-center text-[#33ff33] font-semibold presspixel
                          bg-gray-900 px-6 py-4 rounded-sm`}>
            {status}
            </p>

        <div className="flex justify-center items-center gap-4 flex-wrap w-full">
            <button
                onClick={resetBoard} //Goes back to App
                className="
                bg-red-700 hover:bg-red-500 transition duration-300 ease-in-out cursor-pointer
                hover:text-black hover:scale-105 px-8 py-2 
                rounded-full text-2xl font-extrabold md:font-bold shadow
                ">
                {calcWinner(squares) ? 'Play Again' : 'Reset'}
            </button>

            {!(squares.includes(null)) && !calcWinner(squares) && (
                <button
                    onClick={continueGame} //Goes back to App
                    className="
                bg-green-700 hover:bg-green-500 transition duration-300 ease-in-out cursor-pointer
                hover:text-black hover:scale-105 px-6 py-2 
                rounded-full text-2xl font-extrabold md:font-bold shadow
                ">
                    Continue
                </button>
            )}

            <button
                onClick={toggleBot} //Goes back to App
                className={`
                ${ isBotOn ? 
                    'bg-orange-600 hover:bg-orange-400' :
                    'bg-yellow-600 hover:bg-yellow-400'}
                
                transition duration-300 ease-in-out cursor-pointer
                hover:text-black hover:scale-105 px-8 py-2 
                rounded-lg text-2xl font-extrabold md:font-bold shadow
                `}>
                {isBotOn ? '🤖 DumBot Mode' : '👥 2Player Mode'}
            </button>

        </div>
            
            (Scroll below for Moves check)

            <div className="overflow-auto w-7/8 min-[925px]:w-2/3 h-75 scroll-thin bg-gray-800 
                            border-2 border-gray-600 p-4">
                <ol className="flex flex-col flex-wrap items-center gap-4 w-full">
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