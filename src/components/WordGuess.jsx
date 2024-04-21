import { useContext } from "react"
import LetterGuess from "./LetterGuess"
import { GridColourContext } from "../App";


function WordGuess({ letterGuesses, row, invalidWordMessage, currentRow }) {
  const gridColours = useContext(GridColourContext);

  return (
    <div 
    className={(invalidWordMessage && currentRow === row) ? 'text-white flex gap-[.35rem] row-shake' : 'text-white flex gap-[.35rem]'}
    id={gridColours[row].some((item) => item !== 'blank') ? 'row' : ''}
    >
        {letterGuesses.map((letter, col) => (
          <LetterGuess letter={letter} key={col} letterState={gridColours[row][col]}/>
        ))}
    </div>
  )
}

export default WordGuess