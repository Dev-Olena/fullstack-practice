import React, {useState} from "react";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Home setUser={setUser}/>
  );
}

export default App;
