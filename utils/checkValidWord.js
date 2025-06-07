import axios from "axios";

const checkValidWord = async (word, actualWord) => {
  const combinedWord = word.join("").toLowerCase();
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${combinedWord}`;

  if (combinedWord === actualWord) return true;

  try {
    await axios.get(url);
    return true;
  } catch (err) {
    return false;
  }
};

export default checkValidWord;
