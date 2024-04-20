import { useRef, useState } from "react";
import Confetti from "./Confetti";
import { CSSTransition } from "react-transition-group";
import '../index.css';

const randomItem = (items) => {
    return items[Math.floor(Math.random() * items.length)]
}

const winnerEmojis = ['🥳', '🤗', '😁', '👏🏻'];
const loserEmojis = ['💩', '🤮', '👹', '🤬'];

const winnerMessages = [
    'Nice one!',
    'Yeehaw!',
    'Boom shakalaka!',
    'Great work!'
];
const loserMessages = [
    'Idiot!',
    'What the hell are you doing?',
    'Are you stupid?',
    'That was embarrassing...'
];

function Message({ winner, word }) {
    const winnerEmoji = useRef(randomItem(winnerEmojis));
    const winnerMessage = useRef(randomItem(winnerMessages));
    const loserEmoji = useRef(randomItem(loserEmojis));
    const loserMessage = useRef(randomItem(loserMessages));

  return (
    <div className="flex flex-col justify-center items-center absolute bg-white/90 w-[500px] py-6 rounded-xl shadow-xl z-10">
        {winner && <Confetti />}
        <h1 className="text-7xl">{winner ? winnerEmoji.current : loserEmoji.current}</h1>
        <h1 className="text-2xl font-[600] mt-2">{winner ? winnerMessage.current : loserMessage.current}</h1>
        <h1>{winner ? 'You win!' : 'You lose.'}</h1>
        {!winner && <h1 >The word was <span className="font-bold text-lg">{word.toUpperCase()}</span></h1>}
    </div>
  )
}

export default Message