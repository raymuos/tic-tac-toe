function Box({ value , onSquareClick , isGreen }){

    return(
        <div onClick={onSquareClick} 
             className={`text-6xl font-bold
                        ${(isGreen)? 
                            'bg-green-500 text-[#222]' :
                            'bg-gray-800 transition ease-in-out duration-300 hover:bg-gray-700'}
                        w-25 h-25 md:w-30 md:h-30 
                        border-[1px] border-[#ddd]
                        flex justify-center items-center
                        cursor-pointer`}>
                            <span className={`transition duration-300 
                                                ${value ? 
                                                'scale-100 opacity-100' : 
                                                'scale-0 opacity-0'}`}> {value} </span>
        </div>
    )
}

export default Box;