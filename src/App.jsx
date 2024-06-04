import WordGuess from "./components/WordGuess";
import getWord from "../utils/getRandomWord";
import enterKey from "../utils/enterKey";
import checkAlphabetic from "../utils/checkAlphabetic";
import { createContext, useCallback, useEffect, useState } from "react";
import wordInput from "../utils/wordInput";
import Keyboard from "./components/Keyboard";
import Message from "./components/Message";
import "./index.css";
import { CSSTransition } from "react-transition-group";
import checkSearchParams from "../utils/checkSearchParams";
import setWordToSearchParam from "../utils/setWordToSearchParam";
import PlayWithFriendsPopUp from "./components/PlayWithFriendsPopUp";
import GroupIcon from "@mui/icons-material/Group";
import PlayAgainButton from "./components/PlayAgainButton";
import Header from "./components/Header";

export const GridColourContext = createContext();
export const KeyboardContext = createContext();

function App() {
  const [word, setWord] = useState("");
  const [wordGuesses, setWordGuesses] = useState({
    grid: [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    row: 0,
    col: 0,
  });
  const [gridColours, setGridColours] = useState([
    ["blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank"],
  ]);
  const [keyboardColours, setKeyboardColours] = useState({});
  const [isValidWord, setIsValidWord] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [invalidWordMessage, setInvalidWordMessage] = useState(false);
  const [playWithFriendsPopUp, setPlayWithFriendsPopUp] = useState(false);
  const [name, setName] = useState("");
  const [areSearchParams, setAreSearchParams] = useState(false);
  const [gameOverMessageVisible, setGameOverMessageVisible] = useState(false);

  // Handle valid word check
  useEffect(() => {
    wordInput(
      isValidWord,
      wordGuesses,
      setWordGuesses,
      word,
      setGridColours,
      setKeyboardColours,
      keyboardColours
    );
  }, [isValidWord]);

  const handleKeyDown = useCallback(
    (event) => {
      const key = event.key ? event.key.toUpperCase() : event.target.id;

      if (!checkAlphabetic(key)) return;

      setIsValidWord(false);

      setWordGuesses((prev) => {
        let grid = [...prev.grid];
        let row = prev.row;
        let col = prev.col;

        enterKey(key, grid, row, col, setIsValidWord, setInvalidWordMessage);

        if (key === "BACKSPACE" && col !== 0) {
          col--;
          grid[row][col] = "";
          return {
            ...prev,
            grid,
            col,
          };
        }

        if (col !== 5 && key !== "BACKSPACE" && key !== "ENTER") {
          grid[row][col] = key;
          col++;
        }

        return {
          ...prev,
          grid: grid,
          row: row,
          col: col,
        };
      });
    },
    [setGameOver]
  );

  // Handle keyboard inputs
  useEffect(() => {
    if (!gameOver && !playWithFriendsPopUp) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, gameOver, playWithFriendsPopUp]);

  // Fetch random 5 letter word
  useEffect(() => {
    if (checkSearchParams()) {
      setAreSearchParams(true);
      setWordToSearchParam(setWord, setName);
    } else {
      const fetchData = async () => {
        const data = await getWord();
        setWord(data);
      };

      fetchData();
    }
  }, []);

  // Check game over
  useEffect(() => {
    gridColours.forEach((row) => {
      let solved = true;
      for (let colour of row) {
        if (colour != "green") {
          solved = false;
          break;
        }
      }
      if (solved) {
        setGameOver(true);
        setGameOverMessageVisible(true);
        setWinner(true);
      }
    });

    if (wordGuesses.row === 6) {
      setGameOver(true);
      setGameOverMessageVisible(true);
      return;
    }
  }, [gridColours]);

  return (
    <div className="flex flex-col justify-center items-center h-svh w-svh bg-[#121213]">
      <GridColourContext.Provider value={gridColours}>
        <Message
          word={word}
          winner={winner}
          gameOverMessageVisible={gameOverMessageVisible}
          setGameOverMessageVisible={setGameOverMessageVisible}
        />
      </GridColourContext.Provider>

      <CSSTransition
        timeout={500}
        in={playWithFriendsPopUp}
        classNames="message"
        unmountOnExit
      >
        <PlayWithFriendsPopUp visible={setPlayWithFriendsPopUp} />
      </CSSTransition>
      <CSSTransition
        timeout={200}
        in={invalidWordMessage}
        classNames="invalid"
        onEntered={() =>
          setTimeout(() => {
            setInvalidWordMessage(false);
          }, 1500)
        }
        unmountOnExit
      >
        <div className="text-black bg-white absolute text-lg font-bold p-2 rounded-lg shadow-lg sm:top-[15%] xs:top-[20%] top-[15%] z-10">
          Invalid Word 🤔
        </div>
      </CSSTransition>
      <Header />
      {areSearchParams && (
        <h1 className="text-white uppercase font-[600] text-sm">
          Sent from <span className="text-blue-500">{name}</span>
        </h1>
      )}
      {gameOver && !gameOverMessageVisible && <PlayAgainButton size="small" />}
      <GridColourContext.Provider value={gridColours}>
        <div
          className={
            gameOver && !gameOverMessageVisible
              ? "gap-[.35rem] flex flex-col xs:mt-2 mt-1 mb-4"
              : areSearchParams
              ? "gap-[.35rem] flex flex-col xs:mt-3 mt-2 mb-4"
              : "gap-[.35rem] flex flex-col xs:mt-8 mt-4 mb-4"
          }
        >
          {wordGuesses.grid.map((word, idx) => (
            <WordGuess
              letterGuesses={word}
              row={idx}
              key={idx}
              invalidWordMessage={invalidWordMessage}
              currentRow={wordGuesses.row}
            />
          ))}
        </div>
      </GridColourContext.Provider>
      <div id="keyboard" className="">
        <KeyboardContext.Provider value={keyboardColours}>
          <Keyboard
            handleKeyDown={
              !gameOver && !playWithFriendsPopUp ? handleKeyDown : () => {}
            }
          />
        </KeyboardContext.Provider>
      </div>
      <div className="mt-5 flex justify-center items-center sm:gap-20 gap-10">
        <h1 className="text-[#565758] xs:text-base text-sm">
          © Josh Rosenfeld
        </h1>
        <button
          className={
            !gameOverMessageVisible
              ? "text-white bg-blue-600 hover:bg-blue-700 xs:py-2 px-3 py-1.5 rounded-xl flex justify-center items-center gap-1 transition-all ease-linear duration-100 xs:text-sm text-xs cursor-pointer"
              : "text-white bg-blue-600 opacity-20 py-2 px-3 rounded-xl flex justify-center items-center gap-1 transition-all ease-linear duration-100 xs:text-sm text-xs cursor-not-allowed"
          }
          onClick={
            !gameOverMessageVisible
              ? () => setPlayWithFriendsPopUp(true)
              : () => {}
          }
        >
          Play With Friends
          <GroupIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

export default App;
