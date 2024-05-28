import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import getWord from "../../utils/getRandomWord";
import MenuButton from "./MenuButton";

function PlayWithFriendsPopUp({ visible }) {
  const [gameLink, setGameLink] = useState("");
  const [linkGenerated, setLinkGenerated] = useState(false);

  const handleGenerateLink = () => {
    const fetchData = async () => {
      const data = await getWord();
      setGameLink(`http://localhost:5173/?word=${btoa(data)}`); // TODO: Change from localhost to actual domain
    };

    fetchData();
    setLinkGenerated(true);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(gameLink);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white/90 absolute sm:w-[500px] w-[365px] py-6 rounded-xl shadow-xl z-10">
      <button onClick={() => visible(false)}>
        <HighlightOffIcon className="absolute right-3 top-3 text-[#817e7e] hover:text-black cursor-pointer" />
      </button>
      <h1 className="text-2xl font-[600]">Make Random Wordle Game</h1>
      <h1 className=" text-center text-sm">
        Generate a game link with a random word for you and your friends!
      </h1>
      {!linkGenerated ? (
        <button
          className="bg-blue-600 hover:bg-blue-700 flex justify-center items-center gap-1 py-2 px-5 rounded-lg text-white transition-all ease-linear duration-100 font-[600] mt-4"
          onClick={handleGenerateLink}
        >
          Generate Link
        </button>
      ) : (
        <>
          <a
            href={gameLink}
            className=" underline font-[600] text-blue-600 mt-4"
          >
            {gameLink}
          </a>
          <div className="flex gap-2 mt-2">
            <MenuButton type="Copy Link" onClick={handleCopyClick} />
            <a href={gameLink}>
              <MenuButton type="Play" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default PlayWithFriendsPopUp;
