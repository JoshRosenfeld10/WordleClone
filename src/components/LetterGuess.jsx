/* 
letterState = green, yellow, grey, blank
*/

const letterClasses = {
  green:
    "greenLetter xs:w-14 xs:h-14 h-12 w-12 text-white font-bold text-4xl  flex justify-center items-center cursor-default letter-reveal",
  yellow:
    "yellowLetter xs:w-14 xs:h-14 h-12 w-12 text-white font-bold text-4xl flex justify-center items-center cursor-default letter-reveal",
  grey: "greyLetter xs:w-14 xs:h-14 h-12 w-12 text-white font-bold text-4xl flex justify-center items-center cursor-default letter-reveal",
  blank:
    "border-2 border-[#3a3a3c] xs:w-14 xs:h-14 h-12 w-12 text-white font-bold text-4xl flex justify-center items-center cursor-default",
};

function LetterGuess({ letter, letterState }) {
  return (
    <div
      className={letterClasses[letterState]}
      id={letter && letterState === "blank" ? "letter-filled" : ""}
    >
      {letter}
    </div>
  );
}

export default LetterGuess;
