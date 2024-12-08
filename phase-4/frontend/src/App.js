import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddOwner from './addowner.js';
import DisplayOwner from './displayowner.js'; 
import './App.css'; 
import AddEmployee from './AddEmployee.js'; 


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Business Supply</h1>
          <nav>
            <ul className="App-nav">
              <li>
                <Link className="App-link" to="/addowner">Add Owner</Link>
              </li>
              <li>
                <Link className="App-link" to="/displayowner">Display Owners</Link>
              </li>
              <li>
                <Link className="App-link" to="/AddEmployee">Add Employee</Link> 
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/addowner" element={<AddOwner />} />
            <Route path="/displayowner" element={<DisplayOwner />} />
            <Route path="/AddEmployee" element={<AddEmployee />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
