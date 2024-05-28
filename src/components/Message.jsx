import { useRef, useState } from "react";
import Confetti from "./Confetti";
import "../index.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ReplayIcon from "@mui/icons-material/Replay";

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

function Message({ winner, word }) {
  const winnerEmoji = useRef(randomItem(winnerEmojis));
  const winnerMessage = useRef(randomItem(winnerMessages));
  const loserEmoji = useRef(randomItem(loserEmojis));
  const loserMessage = useRef(randomItem(loserMessages));

  const [visible, setVisible] = useState(true);

  return (
    <div className="flex justify-center items-center absolute z-10">
      {winner && <Confetti />}
      {visible && (
        <div className="flex flex-col justify-center items-center absolute bg-white/90 sm:w-[500px] w-[365px] py-6 rounded-xl shadow-xl z-10">
          <button onClick={() => setVisible(false)}>
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
          <a href="https://josh-rosenfeld-wordle-clone.vercel.app/">
            <button className="mt-4 bg-green-600 py-2 px-5 rounded-lg font-bold text-lg text-white flex justify-center items-center hover:bg-green-700 transition-all ease-linear duration-100">
              PLAY AGAIN
              <ReplayIcon fontSize="small" className="ml-1" />
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Message;
