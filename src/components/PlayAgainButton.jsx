import ReplayIcon from "@mui/icons-material/Replay";

const styles = {
  big: "bg-green-600 py-2 px-5 rounded-lg font-bold text-lg text-white flex justify-center items-center hover:bg-green-700 transition-all ease-linear duration-100",
  small:
    "bg-green-600 py-2 px-3 rounded-lg font-[600] text-sm text-white flex justify-center items-center hover:bg-green-700 transition-all ease-linear duration-100",
};

function PlayAgainButton({ size }) {
  return (
    <a href="https://josh-rosenfeld-wordle-clone.vercel.app/">
      <button className={styles[size]}>
        PLAY AGAIN
        <ReplayIcon fontSize="" className="ml-1" />
      </button>
    </a>
  );
}

export default PlayAgainButton;
