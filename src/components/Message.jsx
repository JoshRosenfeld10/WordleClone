import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "../index.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PlayAgainButton from "./PlayAgainButton";
import { CSSTransition } from "react-transition-group";

const randomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const winnerEmojis = ["🥳", "🤗", "😁", "👏🏻"];
const loserEmojis = ["💩", "🤮", "👹", "🤬"];

const winnerMessages = [
  "Nice one!",
  "Yeehaw!",
  "Boom shakalaka!",
  "Great work!",
];
const loserMessages = [
  "Uhh...",
  "That was awful.",
  "Good effort, I guess.",
  "That was embarrassing...",
];

function Message({
  winner,
  word,
  gameOverMessageVisible,
  setGameOverMessageVisible,
}) {
  const winnerEmoji = useRef(randomItem(winnerEmojis));
  const winnerMessage = useRef(randomItem(winnerMessages));
  const loserEmoji = useRef(randomItem(loserEmojis));
  const loserMessage = useRef(randomItem(loserMessages));

  const handleCloseClick = () => {
    setGameOverMessageVisible(false);
  };

  return (
    <div className="flex justify-center items-center absolute z-10">
      {winner && <Confetti />}
      <CSSTransition
        timeout={500}
        in={gameOverMessageVisible}
        classNames="message"
        unmountOnExit
      >
        <div className="flex flex-col justify-center items-center absolute bg-white/90 sm:w-[500px] w-[365px] py-8 rounded-xl shadow-xl z-10">
          <button onClick={handleCloseClick}>
            <HighlightOffIcon className="absolute right-3 top-3 text-[#817e7e] hover:text-black cursor-pointer" />
          </button>
          <h1 className="text-7xl">
            {winner ? winnerEmoji.current : loserEmoji.current}
          </h1>
          <h1 className="text-2xl font-[600] mt-2">
            {winner ? winnerMessage.current : loserMessage.current}
          </h1>
          <h1>{winner ? "You win!" : "You lose."}</h1>
          {!winner && (
            <h1>
              The word was{" "}
              <span className="font-bold text-lg">{word.toUpperCase()}</span>
            </h1>
          )}
          <div className="mt-4">
            <PlayAgainButton size="big" />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Message;
