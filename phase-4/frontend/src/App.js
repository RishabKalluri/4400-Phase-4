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
import AddDriverRole from './AddDriverRole.js';
import AddWorkerRole from './AddWorkerRole.js';
import AddProduct from './AddProduct.js';
import AddVan from './AddVan.js';
import AddBusiness from './AddBusiness.js';
import AddService from './AddService.js';
import AddLocation from './AddLocation.js';
import StartFunding from './StartFunding.js';
import HireEmployee from './HireEmployee.js';
import FireEmployee from './FireEmployee.js';
import ManageService from './ManageService.js';
import TakeoverVan from './TakeoverVan.js';
import LoadVan from './LoadVan.js';
import RefuelVan from './RefuelVan.js';
import DriveVan from './DriveVan.js';
import PurchaseProduct from './PurchaseProduct.js';
import RemoveProduct from './RemoveProduct.js';
import RemoveVan from './RemoveVan.js';
import RemoveDriverRole from './RemoveDriverRole.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Business Supply</h1>
          <nav>
            <div className="App-nav-group">
              <h3>Actions</h3>
              <ul className="App-nav">
                <li><Link className="App-link" to="/addowner">Add Owner</Link></li>
                <li><Link className="App-link" to="/AddEmployee">Add Employee</Link></li>
                <li><Link className="App-link" to="/adddriverrole">Add Driver Role</Link></li>
                <li><Link className="App-link" to="/addworkerrole">Add Worker Role</Link></li>
                <li><Link className="App-link" to="/addproduct">Add Product</Link></li>
                <li><Link className="App-link" to="/addvan">Add Van</Link></li>
                <li><Link className="App-link" to="/addbusiness">Add Business</Link></li>
                <li><Link className="App-link" to="/addservice">Add Service</Link></li>
                <li><Link className="App-link" to="/addlocation">Add Location</Link></li>
              </ul>
            </div>
            <div className="App-nav-group">
              <h3>Management</h3>
              <ul className="App-nav">
                <li><Link className="App-link" to="/startfunding">Start Funding</Link></li>
                <li><Link className="App-link" to="/hireemployee">Hire Employee</Link></li>
                <li><Link className="App-link" to="/fireemployee">Fire Employee</Link></li>
                <li><Link className="App-link" to="/manageservice">Manage Service</Link></li>
                <li><Link className="App-link" to="/takeovervan">Takeover Van</Link></li>
                <li><Link className="App-link" to="/loadvan">Load Van</Link></li>
                <li><Link className="App-link" to="/refuelvan">Refuel Van</Link></li>
                <li><Link className="App-link" to="/drivevan">Drive Van</Link></li>
                <li><Link className="App-link" to="/purchaseproduct">Purchase Product</Link></li>
              </ul>
            </div>
            <div className="App-nav-group">
              <h3>Removals</h3>
              <ul className="App-nav">
                <li><Link className="App-link" to="/removeproduct">Remove Product</Link></li>
                <li><Link className="App-link" to="/removevan">Remove Van</Link></li>
                <li><Link className="App-link" to="/removedriverrole">Remove Driver Role</Link></li>
              </ul>
            </div>
            <div className="App-nav-group">
              <h3>Display</h3>
              <ul className="App-nav">
                <li><Link className="App-link" to="/displayowner">Display Owners</Link></li>
                <li><Link className="App-link" to="/displayemployee">Display Employees</Link></li>
                <li><Link className="App-link" to="/displaydriver">Display Drivers</Link></li>
                <li><Link className="App-link" to="/displaylocation">Display Locations</Link></li>
                <li><Link className="App-link" to="/displayproduct">Display Products</Link></li>
                <li><Link className="App-link" to="/displayservice">Display Services</Link></li>
              </ul>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/addowner" element={<AddOwner />} />
            <Route path="/AddEmployee" element={<AddEmployee />} /> 
            <Route path="/adddriverrole" element={<AddDriverRole />} />
            <Route path="/addworkerrole" element={<AddWorkerRole />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/addvan" element={<AddVan />} />
            <Route path="/addbusiness" element={<AddBusiness />} />
            <Route path="/addservice" element={<AddService />} />
            <Route path="/addlocation" element={<AddLocation />} />
            <Route path="/startfunding" element={<StartFunding />} />
            <Route path="/hireemployee" element={<HireEmployee />} />
            <Route path="/fireemployee" element={<FireEmployee />} />
            <Route path="/manageservice" element={<ManageService />} />
            <Route path="/takeovervan" element={<TakeoverVan />} />
            <Route path="/loadvan" element={<LoadVan />} />
            <Route path="/refuelvan" element={<RefuelVan />} />
            <Route path="/drivevan" element={<DriveVan />} />
            <Route path="/purchaseproduct" element={<PurchaseProduct />} />
            <Route path="/removeproduct" element={<RemoveProduct />} />
            <Route path="/removevan" element={<RemoveVan />} />
            <Route path="/removedriverrole" element={<RemoveDriverRole />} />
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




