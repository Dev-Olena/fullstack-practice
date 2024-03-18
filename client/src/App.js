import React, {useState} from "react";
import {unstable_HistoryRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserContext from './contexts/UserContext';
import history from './history';
import './reset.css';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router history={history}>
      <UserContext.Provider value = {user}>
        <Routes>
          <Route path='/' exact element={<Home setUser={setUser} />}/>
          <Route path='/messenger' element={<Dashboard />} />
        </Routes>
      </UserContext.Provider>
     </Router>
  );
}

export default App;
