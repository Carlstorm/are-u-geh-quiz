import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import song from "/geh.mp3"; // Import the file
import Tube from "./Tube";
import Penis from "./Penis";
import Intro from "./flatstuff/intro";
import './index.css';
import Preload from "./flatstuff/preload/Preload";
import Question from "./flatstuff/Question/Question";

export default function App() {
  const [penisPosition, setPenisPosition] = useState([0, -5, 0]);
  const [penisRotation, setPenisRotation] = useState([0, 0, 0]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [state, setState] = useState(0);
  const [progress, setProgress] = useState(0)

  const audioRef = useRef(new Audio(song))

  useEffect(() => {
    if (isLoaded)
      audioRef.current.play();
  }, [isLoaded])

  const AddProgress = () => {
    let nextStage = progress+1
    setProgress(nextStage)
  }

  const Answer = (res) => {
    if (res) {
      // LOOSE
    } else {
      let newProg = progress+1
      let newState = state+1
      setState(newState)
      setProgress(newProg)
    }
    console.log(res)
  }

  const questions = [
    "",
    "Are you geh?",
    "Would you massage your homie?",
    "Would you massage your homie if a third homie was looking?",
  ]

  return (
    <>
      {isLoaded ? 
        <div onClick={() => audioRef.current.play()} style={{height: "100%", width: "100%"}}>
          {progress < 1 ? null : <span>{progress}/{questions.length-1}</span>}
          {progress < 1 ? <Intro AddProgress={AddProgress}/> : <Question Answer={Answer} Question={questions[progress]}/>}
          <Canvas camera={{ position: [0, 0, 5] }} style={{pointerEvents: "none"}}>
            <directionalLight position={[-1, 0.5, 2]} intensity={4} />
            <Tube setPenisPosition={setPenisPosition} setPenisRotation={setPenisRotation} state={state} />
            <Penis position={penisPosition} rotation={penisRotation} />
          </Canvas>
          <Canvas camera={{ position: [0, 0, 5] }} className="shadow-layer">
            <Tube setPenisPosition={setPenisPosition} setPenisRotation={setPenisRotation} state={state} />
            <Penis position={penisPosition} rotation={penisRotation} />
          </Canvas>
        </div>
        : <Preload setIsLoaded={setIsLoaded} />}
      </>
    );
}
