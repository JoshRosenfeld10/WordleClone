import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";

const styles = {
  "Copy Link":
    "bg-blue-600 hover:bg-blue-700 text-white py-2 w-32 rounded-lg font-[600] flex justify-center items-center gap-2 transition-all ease-linear duration-100",
  Play: "bg-green-600 hover:bg-green-700 text-white py-2 w-32 rounded-lg font-[600] flex justify-center items-center gap-2 transition-all ease-linear duration-100",
  Copied:
    "bg-[#808384] text-white py-2 w-32 rounded-lg font-[600] flex justify-center items-center gap-2 transition-all ease-linear duration-100",
};

function MenuButton({ type, onClick }) {
  const [styleState, setStyleState] = useState(type);
  const [text, setText] = useState(type);

  const handleOnClick = () => {
    onClick();
    if (styleState === "Copy Link") {
      setStyleState("Copied");
      setText("Copied ✅");
    }
  };

  return (
    <button
      className={styles[styleState]}
      onClick={styleState === "Copy Link" ? handleOnClick : () => {}}
    >
      {text}
      {type === "Play" && <EastIcon fontSize="small" />}
    </button>
  );
}

export default MenuButton;
