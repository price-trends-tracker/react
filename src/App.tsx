import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const items = ["DRAM", "NAND", "SSD", "TFT-LCD", "PV"];

  const [item, setItem] = useState("");

  return (
    <>
      <div>
        <Navbar items={items} onSelectItem={setItem} />
      </div>
      <div>
        {item}
      </div>
    </>
  );
}

export default App;
