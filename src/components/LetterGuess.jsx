/* 
letterState = green, yellow, grey, blank
*/

const letterClasses = {
  green: "greenLetter sm:w-14 sm:h-14 w-12 h-12 text-white font-bold sm:text-4xl text-3xl  flex justify-center items-center cursor-default letter-reveal",
  yellow: "yellowLetter sm:w-14 sm:h-14 w-12 h-12 text-white font-bold sm:text-4xl text-3xl flex justify-center items-center cursor-default letter-reveal",
  grey: "greyLetter sm:w-14 sm:h-14 w-12 h-12 text-white font-bold sm:text-4xl text-3xl flex justify-center items-center cursor-default letter-reveal",
  blank: "border-2 border-[#3a3a3c] sm:w-14 sm:h-14 w-12 h-12 text-white font-bold sm:text-4xl text-3xl flex justify-center items-center cursor-default"
}

function LetterGuess({ letter, letterState }) {
  return (
    <div className={letterClasses[letterState]} id={(letter && letterState === 'blank') ? "letter-filled" : ""}>
      {letter}
    </div>
  )
}

export default LetterGuess