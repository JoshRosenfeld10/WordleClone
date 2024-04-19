const checkLetters = (word, wordGuesses, setGridColours, setKeyboardColours, keyboardColours) => {
    const wordInput = wordGuesses.grid[wordGuesses.row].join('').toLowerCase();

    const row = wordGuesses.row;

    console.log(word);

    let letters = {};

    for (let char of word) {
        letters[char] ? letters[char]++ : letters[char] = 1;
    }

    setGridColours(prev => {
        const gridColours = [ ...prev ];
        
        // Check for greens first
        for (let i=0; i < 6; i++) {
            if (word[i] == wordInput[i] && letters[word[i]] > 0) {
                gridColours[row][i] = 'green';
                letters[word[i]]--;

                setKeyboardColours(prev => {
                    const keyboardColours = { ...prev };
                    keyboardColours[wordInput[i]] = 'green';
                    return keyboardColours;
                })
            } 
        }

        // Then check for yellows 
        for (let i=0; i < 6; i++) {
            if (word.includes(wordInput[i]) && letters[wordInput[i]] > 0 && word[i] != wordInput[i]) {
                gridColours[row][i] = 'yellow';
                letters[wordInput[i]]--;

                setKeyboardColours(prev => {
                    const keyboardColours = { ...prev };
                    
                    if (keyboardColours[wordInput[i]] !== 'green') {
                        keyboardColours[wordInput[i]] = 'yellow';
                    }

                    return keyboardColours;
                })
            } else if (word[i] !== wordInput[i]) {
                gridColours[row][i] = 'grey';

                setKeyboardColours(prev => {
                    const keyboardColours = { ...prev };

                    if (keyboardColours[wordInput[i]] !== 'green' && keyboardColours[wordInput[i]] !== 'yellow') {
                        keyboardColours[wordInput[i]] = 'dark_grey';
                    }

                    return keyboardColours;
                })
            }
        }

        return gridColours;

    })
}

export default checkLetters;