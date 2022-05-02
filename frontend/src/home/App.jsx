import { useState } from "react";
import Dark from "./modes/dark";
import Light from "./modes/light";
import Toggle from "./switch";

function App(){
  const [mode,changeMode] = useState("Dark");

  function switchMode(){
      if( mode === "Dark") changeMode("Light");
      else changeMode("Dark");
  }

  return (
    <>
        <Toggle handleEvent={switchMode} Mode={mode} />
        {
            (mode === "Dark")?<Dark/>:<Light/>
        }
    </>
  )
}

export default App