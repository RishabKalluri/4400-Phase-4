import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './views.css';

function DisplayLocation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/view/display_location_view');
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
      <h2>Location Data</h2>
      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Label</th>
                <th>Location Name</th>
                <th>X Coordinate</th>
                <th>Y Coordinate</th>
                <th>Space</th>
                <th>Number of Vans</th>
                <th>Van IDs</th>
                <th>Remaining Capacity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.label}</td>
                  <td>{item.long_name}</td>
                  <td>{item.x_coord}</td>
                  <td>{item.y_coord}</td>
                  <td>{item.space}</td>
                  <td>{item.num_vans}</td>
                  <td>{item.van_ids}</td>
                  <td>{item.remaining_capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DisplayLocation;