import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import getWord from "../../utils/getRandomWord";
import MenuButton from "./MenuButton";
import { CircularProgress } from "@mui/material";

function PlayWithFriendsPopUp({ visible }) {
  const [gameLink, setGameLink] = useState("");
  const [islinkGenerated, setIsLinkGenerated] = useState(false);
  const [name, setName] = useState("");
  const [invalidClick, setInvalidClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateLink = () => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Extend loading time to at least half a second
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

        const data = await getWord();
        setGameLink(
          `https://josh-rosenfeld-wordle-clone.vercel.app/?word=${btoa(
            data
          )}&name=${name.toLowerCase()}`
        );
        setIsLinkGenerated(true);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  };

  const handleCopyClick = () => {
    if (navigator.share) {
      navigator.share({
        text: `Play ${name.replaceAll("_", " ")} in Wordle!`,
        url: gameLink,
        title: "Wordle Clone",
      });
    } else {
      navigator.clipboard.writeText(gameLink);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value.replaceAll(" ", "_"));

    e.target.value.length <= 25
      ? setInvalidClick(false)
      : setInvalidClick(true);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white/90 absolute xs:w-[365px] sm:w-[500px] w-[340px] h-[238px] py-8 rounded-xl shadow-xl z-10">
      <button onClick={() => visible(false)}>
        <HighlightOffIcon className="absolute right-3 top-3 text-[#817e7e] hover:text-black cursor-pointer" />
      </button>
      <h1 className="text-2xl font-[600]">Make Random Wordle Game</h1>
      <h1 className=" text-center text-sm">
        {!isLoading &&
          (islinkGenerated
            ? "Link Generated!"
            : "Generate a game link with a random word for you and your friends!")}
      </h1>
      {!isLoading && !islinkGenerated ? (
        <>
          <div>
            <input
              className={
                invalidClick
                  ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  : "shadow appearance-none border rounded w-full py-2 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
              type="text"
              placeholder="Your Name"
              id="nameInput"
              onChange={(e) => handleChange(e)}
            />
            {invalidClick && (
              <h1 className="text-red-500 text-xs italic mt-1">
                {name.length === 0
                  ? "Please enter a name."
                  : "Name is too long."}
              </h1>
            )}
          </div>
          <button
            className={
              name && name.length <= 25
                ? "bg-blue-600 hover:bg-blue-700 flex justify-center items-center gap-1 py-2 px-5 rounded-lg text-white transition-all ease-linear duration-100 font-[600] mt-2 uppercase"
                : "bg-gray-300  flex justify-center items-center gap-1 py-2 px-5 rounded-lg text-gray-400 transition-all ease-linear duration-100 font-[600] mt-2 uppercase cursor-not-allowed"
            }
            onClick={
              name && name.length <= 25
                ? handleGenerateLink
                : () => {
                    setInvalidClick(true);
                  }
            }
          >
            Generate Link
          </button>
        </>
      ) : isLoading ? (
        <div className=" my-12">
          <CircularProgress />
        </div>
      ) : (
        <>
          <a
            href={gameLink}
            className=" underline font-[600] text-blue-600 mt-[1.35rem] text-sm text-center"
          >
            {gameLink}
          </a>
          <div className="flex gap-2 mt-5">
            <MenuButton
              type={navigator.share ? "Share Link" : "Copy Link"}
              onClick={handleCopyClick}
            />
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
