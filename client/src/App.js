import React, {useState} from "react";
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import './reset.css';


function App() {
  const [user, setUser] = useState(null);
  return (
    <Router history={history}>
    <Switch>
      <Route path='/' exact >
        <Home setUser={setUser} />
      </Route>
      <Route path='/messenger'>
        <Dashboard/>
      </Route>
    </Switch>
     </Router>
  );
}

export default App;
