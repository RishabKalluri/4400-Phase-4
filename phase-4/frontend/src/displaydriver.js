import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './views.css';

function DisplayDriver() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/view/display_driver_view');
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
      <h2>Driver Data</h2>
      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>License ID</th>
                <th>Successful Trips</th>
                <th>Number of Vans</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.licenseID}</td>
                  <td>{item.successful_trips}</td>
                  <td>{item.num_vans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DisplayDriver;