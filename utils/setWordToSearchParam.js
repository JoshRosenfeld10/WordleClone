const setWordToSearchParam = (setWord) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const word = urlParams.get("word");
  const decodedWord = atob(word);
  setWord(decodedWord);
};

export default setWordToSearchParam;
