/* 
letterState = green, yellow, grey, blank
*/

const letterClasses = {
  green: "bg-[#538d4e] w-14 h-14 text-white font-bold text-4xl flex justify-center items-center cursor-default",
  yellow: "bg-[#b49f3a] w-14 h-14 text-white font-bold text-4xl flex justify-center items-center cursor-default",
  grey: "bg-[#3a3a3c] w-14 h-14 text-white font-bold text-4xl flex justify-center items-center cursor-default",
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