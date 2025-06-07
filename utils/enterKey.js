import checkValidWord from "./checkValidWord";

const enterKey = (
  key,
  grid,
  row,
  col,
  setIsValidWord,
  setInvalidWordMessage,
  actualWord
) => {
  if (key === "ENTER" && col === 5) {
    const fetchValid = async () => {
      const data = await checkValidWord(grid[row], actualWord);
      setIsValidWord(data);
      setInvalidWordMessage(!data);
    };
    fetchValid();
  }
};

export default enterKey;
