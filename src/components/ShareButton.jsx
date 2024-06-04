import React, { useContext } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { GridColourContext } from "../App";

const emojiMap = {
  green: "🟩",
  yellow: "🟨",
  grey: "⬜️",
};

function ShareButton({ winner }) {
  const gridColours = useContext(GridColourContext);

  const createMessage = () => {
    let text = "";

    for (let row = 0; row < gridColours.length; row++) {
      if (gridColours[row][0] === "blank") {
        text = `Wordle Clone - ${row}/6\n\n`.concat(text);
        break;
      }

      gridColours[row].forEach((colour) => {
        text += emojiMap[colour];
      });

      text += "\n";
    }

    if (text.charAt(0) !== "W") {
      if (winner) {
        text = "Wordle Clone - 6/6\n\n".concat(text);
      } else {
        text = "Wordle Clone - X/6\n\n".concat(text);
      }
    }

    return text;
  };

  const message = createMessage();

  const handleClick = () => {
    navigator.share({
      text: message,
      title: "Wordle Clone",
    });
  };
  return (
    <button
      className="bg-blue-600 py-2 w-[167.87px] rounded-lg font-bold text-lg text-white flex justify-center items-center hover:bg-blue-700 transition-all ease-linear duration-100"
      onClick={handleClick}
    >
      SHARE
      <ShareIcon fontSize="" className="ml-1" />
    </button>
  );
}

export default ShareButton;
