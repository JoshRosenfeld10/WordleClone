import WordGuess from "./components/WordGuess";
import getWord from "../utils/getRandomWord"
import enterKey from "../utils/enterKey";
import checkAlphabetic from "../utils/checkAlphabetic"
import { createContext, useCallback, useEffect, useState } from "react";
import wordInput from "../utils/wordInput";
import Keyboard from "./components/Keyboard";
import Message from "./components/Message";
import './index.css'
import { CSSTransition } from "react-transition-group";

export const GridColourContext = createContext();
export const KeyboardContext = createContext();

function App() {
  const [word, setWord] = useState("");
  const [wordGuesses, setWordGuesses] = useState({
    grid: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ],
    row: 0,
    col: 0
  })
  const [gridColours, setGridColours] = useState([
    ['blank', 'blank', 'blank', 'blank', 'blank'],
    ['blank', 'blank', 'blank', 'blank', 'blank'],
    ['blank', 'blank', 'blank', 'blank', 'blank'],
    ['blank', 'blank', 'blank', 'blank', 'blank'],
    ['blank', 'blank', 'blank', 'blank', 'blank'],
    ['blank', 'blank', 'blank', 'blank', 'blank'],
  ])
  const [keyboardColours, setKeyboardColours] = useState({});
  const [isValidWord, setIsValidWord] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);

  // Handle valid word check
  useEffect(() => {
    wordInput(isValidWord, wordGuesses, setWordGuesses, word, setGridColours, setKeyboardColours, keyboardColours);
  }, [isValidWord])

  const handleKeyDown = useCallback((event) => {

    const key = event.key ? event.key.toUpperCase() : event.target.id

    if (!checkAlphabetic(key)) return

    setIsValidWord(false);

    setWordGuesses((prev) => {
      let grid = [ ...prev.grid ];
      let row = prev.row;
      let col = prev.col;

      enterKey(key, grid, row, col, setIsValidWord);
      
      if (key === 'BACKSPACE' && col !== 0) {
        col--;
        grid[row][col] = '';
        return {
          ...prev,
          grid,
          col
        }
      }

      if (col !== 5 && key !== 'BACKSPACE' && key !== 'ENTER') {
        grid[row][col] = key;
        col++;
      }

      return {
        ...prev,
        grid: grid,
        row: row,
        col: col
      }
    })
  }, [setGameOver])

  // Handle keyboard inputs
  useEffect(() => {
    if (!gameOver) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, gameOver])

  // Fetch random 5 letter word
  useEffect(() => {
  const fetchData = async () => {
    const data = await getWord();
    setWord(data);
  }

    fetchData();
  }, [])

  // Check game over
  useEffect(() => {
    if (wordGuesses.row === 6) {
      setGameOver(true);
      return;
    }

    gridColours.forEach(row => {
      let solved = true;
      for (let colour of row) {
        if (colour != 'green') {
          solved = false;
          break;
        }
      }
      if (solved){
        setGameOver(true);
        setWinner(true);
      }
    })
  }, [gridColours])


  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#121213]" >
      <CSSTransition timeout={500} in={gameOver} classNames="message" unmountOnExit>
        <Message word={word} winner={winner}/>
      </CSSTransition>
      <h1 className="font-extrabold sm:text-6xl text-4xl text-white">WORDLE CLONE</h1>
      <GridColourContext.Provider value={gridColours}>
        <div className="gap-[.35rem] flex flex-col mt-8 mb-4">
          {wordGuesses.grid.map((word, idx) => (
            <WordGuess letterGuesses={word} row={idx} key={idx}/>
          ))}
        </div>
      </GridColourContext.Provider>
      <div id="keyboard" className="">
        <KeyboardContext.Provider value={keyboardColours}>
          <Keyboard handleKeyDown={handleKeyDown}/>
        </KeyboardContext.Provider>
      </div>
    </div>
  )
}

export default App