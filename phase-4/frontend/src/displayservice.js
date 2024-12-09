import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './views.css';

function DisplayService() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/view/display_service_view');
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
      <h2>Business Owner Data</h2>
      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Service Name</th>
                <th>Home Base</th>
                <th>Manager</th>
                <th>Revenue</th>
                <th>Products Carried</th>
                <th>Price Carried</th>
                <th>Weight Carried</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.long_name}</td>
                  <td>{item.home_base}</td>
                  <td>{item.manager}</td>
                  <td>{item.revenue}</td>
                  <td>{item.products_carried}</td>
                  <td>{item.price_carried}</td>
                  <td>{item.weight_carried}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DisplayService;