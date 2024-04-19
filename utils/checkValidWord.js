import axios from "axios";

const checkValidWord = async (word) => {
    const combinedWord = word.join('').toLowerCase();
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${combinedWord}`;
    
    try {
        await axios.get(url);
        return true
    } catch (err) {
        return false
    }
}

export default checkValidWord;