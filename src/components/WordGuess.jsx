import { useContext } from "react"
import LetterGuess from "./LetterGuess"
import { GridColourContext } from "../App";


function WordGuess({ letterGuesses, row }) {
  const gridColours = useContext(GridColourContext);

  return (
    <div className='text-white flex gap-[.35rem]' id={gridColours[row].some((item) => item !== 'blank') ? 'row' : ''}>
        {letterGuesses.map((letter, col) => (
          <LetterGuess letter={letter} key={col} letterState={gridColours[row][col]}/>
        ))}
    </div>
  )
}

export default WordGuess