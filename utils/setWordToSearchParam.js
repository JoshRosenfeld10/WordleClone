const setWordToSearchParam = (setWord, setName) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const word = urlParams.get("word");
  const decodedWord = atob(word);
  setWord(decodedWord);

  const name = urlParams.get("name").replace("_", " ");
  setName(name);
};

export default setWordToSearchParam;
