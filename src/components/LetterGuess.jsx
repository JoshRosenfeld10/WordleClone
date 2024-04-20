/* 
letterState = green, yellow, grey, blank
*/

const letterClasses = {
  green: "greenLetter w-14 h-14 text-white font-bold text-4xl flex justify-center items-center cursor-default letter-reveal",
  yellow: "yellowLetter w-14 h-14 text-white font-bold text-4xl flex justify-center items-center cursor-default letter-reveal",
  grey: "greyLetter w-14 h-14 text-white font-bold text-4xl flex justify-center items-center cursor-default letter-reveal",
  blank: "border-2 border-[#3a3a3c] w-14 h-14 text-white font-bold text-4xl flex justify-center items-center cursor-default"
}

function LetterGuess({ letter, letterState }) {
  return (
    <div className={letterClasses[letterState]}>
      {letter}
    </div>
  )
}

export default LetterGuess