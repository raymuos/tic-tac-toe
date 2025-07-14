import { useState } from "react";

function Square({value, onSquareClick, isGreen}){

    return(
        <button className={`w-30 h-30 border-[1px] border-[#ddd] text-5xl font-[700] 
                            ${(isGreen)? 'bg-green-800':'bg-[#1c1c1c] hover:bg-[#2c2c2c]'}`}
                         onClick={onSquareClick} >{value}</button>
    )
}

export default Square;