import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Tube from "./Tube";
import Penis from "./Penis";
import Intro from "./flatstuff/intro";

export default function App() {
  const [penisPosition, setPenisPosition] = useState([0, -5, 0]);
  const [penisRotation, setPenisRotation] = useState([0, 0, 0]);

  const [state, setState] = useState(0);

  return (
    <>
      <Intro setState={setState} state={state} />

      <Canvas camera={{ position: [0, 0, 5] }} style={{pointerEvents: "none"}}>
        <directionalLight position={[-1, 0.5, 2]} intensity={4} />
        <Tube setPenisPosition={setPenisPosition} setPenisRotation={setPenisRotation} state={state} />
        <Penis position={penisPosition} rotation={penisRotation} />
      </Canvas>
      <Canvas camera={{ position: [0, 0, 5] }} className="shadow-layer">
        <Tube setPenisPosition={setPenisPosition} setPenisRotation={setPenisRotation} state={state} />
        <Penis position={penisPosition} rotation={penisRotation} />
      </Canvas>
    </>
  );
}
