import React, {useState} from "react";

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/' exact >
        <Home setUser={setUser} />
      </Route>
      <Route path='/messenger'>
        <Dashboard/>
      </Route>
    </Switch>
     </BrowserRouter>
  );
}

export default App;
