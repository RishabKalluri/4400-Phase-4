import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayOwner.css';

function DisplayOwner() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/view/display_owner_view');
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
    <div className="DisplayOwner">
      <h2>Business Owner Data</h2>
      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Num of Businesses</th>
                <th>Num of Places</th>
                <th>High Rating</th>
                <th>Low Rating</th>
                <th>Total Debt</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.address}</td>
                  <td>{item.num_businesses}</td>
                  <td>{item.num_places}</td>
                  <td>{item.highs}</td>
                  <td>{item.lows}</td>
                  <td>{item.debt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DisplayOwner;