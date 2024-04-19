import checkLetters from "./checkLetters";

const wordInput = (isValidWord, wordGuesses, setWordGuesses, word, setGridColours, setKeyboardColours, keyboardColours) => {
    if (isValidWord) {
      
      checkLetters(word, wordGuesses, setGridColours, setKeyboardColours, keyboardColours);

      setWordGuesses(prev => {
        let {row, col} = prev;

        col = 0;
        row++;
        return {
          ...prev,
          col, 
          row
        }
      }) 
    } 
}

export default wordInput;