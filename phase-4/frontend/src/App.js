import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddOwner from './addowner.js';
import DisplayOwner from './displayowner.js'; 
import './App.css'; 
import AddEmployee from './AddEmployee.js'; 
import DisplayEmployee from './displayemployee.js';
import DisplayDriver from './displaydriver.js';
import DisplayLocation from './displaylocation.js';
import DisplayProduct from './displayproduct.js';
import DisplayService from './displayservice.js';

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
                <Link className="App-link" to="/AddEmployee">Add Employee</Link> 
              </li>
              <li>
                <Link className="App-link" to="/displayowner">Display Owners</Link>
              </li>
              <li>
                <Link className="App-link" to="/displayemployee">Display Employees</Link>
              </li>
              <li>
                <Link className="App-link" to="/displaydriver">Display Drivers</Link>
              </li>
              <li>
                <Link className="App-link" to="/displaylocation">Display Locations</Link>
              </li>
              <li>
                <Link className="App-link" to="/displayproduct">Display Products</Link>
              </li>
              <li>
                <Link className="App-link" to="/displayservice">Display Services</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/addowner" element={<AddOwner />} />
            <Route path="/AddEmployee" element={<AddEmployee />} /> 
            <Route path="/displayowner" element={<DisplayOwner />} />
            <Route path="/displayemployee" element={<DisplayEmployee />} />
            <Route path="/displaydriver" element={<DisplayDriver />} />
            <Route path="/displaylocation" element={<DisplayLocation />} />
            <Route path="/displayproduct" element={<DisplayProduct />} />
            <Route path="/displayservice" element={<DisplayService />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
