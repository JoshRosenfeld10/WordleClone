// Add react-confetti-explosion

import Confetti from "./Confetti";

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
    'Better luck next time!'
];

function Message({ winner, word }) {

  return (
    <div className="flex flex-col justify-center items-center absolute bg-white w-[500px] py-6 rounded-xl shadow-xl">
        {winner && <Confetti />}
        <h1 className="text-7xl">{winner ? randomItem(winnerEmojis) : randomItem(loserEmojis)}</h1>
        <h1 className="text-2xl font-[600] mt-2">{winner ? randomItem(winnerMessages) : randomItem(loserMessages)}</h1>
        <h1>{winner ? 'You win!' : 'You lose.'}</h1>
        {!winner && <h1 >The word was <span className="font-bold text-lg">{word.toUpperCase()}</span></h1>}
    </div>
  )
}

export default Message