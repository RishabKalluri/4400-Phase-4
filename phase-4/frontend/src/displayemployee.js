import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './views.css';

function DisplayEmployee() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/view/display_employee_view');
        if (response.data.success) {
          setData(response.data.data);
        } else {
          alert('Error fetching data');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="view">
      <h2>Employee Data</h2>
      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Tax ID</th>
                <th>Salary</th>
                <th>Hire Date</th>
                <th>Experience</th>
                <th>License ID</th>
                <th>Driving Experience</th>
                <th>Manager Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.taxID}</td>
                  <td>{item.salary}</td>
                  <td>{item.hired}</td>
                  <td>{item.employee_experience}</td>
                  <td>{item.licenseID}</td>
                  <td>{item.driving_experience}</td>
                  <td>{item.manager_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DisplayEmployee;