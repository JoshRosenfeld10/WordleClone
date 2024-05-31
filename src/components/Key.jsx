import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import { KeyboardContext } from "../App";
import { useContext, useEffect, useState } from "react";

const backgroundStyle = {
  light_grey: {
    backgroundColor: "#808384",
  },
  dark_grey: {
    backgroundColor: "#3a3a3c",
  },
  green: {
    backgroundColor: "#538d4e",
  },
  yellow: {
    backgroundColor: "#b49f3a",
  },
};

function Key({ character, handleKeyDown }) {
  const keyboardColours = useContext(KeyboardContext);
  const [colour, setColour] = useState("light_grey");
  const lowercaseCharacter = character.toLowerCase();

  useEffect(() => {
    if (!keyboardColours[lowercaseCharacter]) {
      setColour("light_grey");
    } else if (keyboardColours[lowercaseCharacter] == "dark_grey") {
      setColour("dark_grey");
    } else if (keyboardColours[lowercaseCharacter] == "green") {
      setColour("green");
    } else if (keyboardColours[lowercaseCharacter] == "yellow") {
      setColour("yellow");
    }
  }, [keyboardColours]);

  return (
    <button
      className={
        character === "ENTER" || character === "BACKSPACE"
          ? "text-white sm:h-[58px] sm:w-[68px] xs:w-[50.5px] xs:h-[42px] h-[38px] w-[45px] rounded-[4px] flex justify-center items-center text-xs font-[600]"
          : "text-white sm:h-[58px] sm:w-11 xs:w-8 xs:h-[42px] w-7 h-[38px] rounded-[4px] flex justify-center items-center sm:text-xl text-base font-[600]"
      }
      style={backgroundStyle[colour]}
      onClick={handleKeyDown}
      id={character}
    >
      {character === "BACKSPACE" ? (
        <BackspaceOutlinedIcon
          fontSize="small"
          className="pointer-events-none"
        />
      ) : (
        character
      )}
    </button>
  );
}

export default Key;
