import ConfettiExplosion from "react-confetti-explosion"
import ReactConfetti from "react-confetti"
import { useWindowSize } from "@react-hook/window-size"


function Confetti() {
    const { width, height } = useWindowSize();

  return ( 
    <>
        <ConfettiExplosion duration={3000} particleCount={200}/>
        <div className="fixed left-0 top-0">
            <ReactConfetti width={width} height={height} numberOfPieces={150} gravity={0.02}/>
        </div>
    </>
  )
}

export default Confetti