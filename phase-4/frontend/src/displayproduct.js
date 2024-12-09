import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './views.css';

function DisplayProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/view/display_product_view');
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
                <th>Product Name</th>
                <th>Van Location</th>
                <th>Amount Available</th>
                <th>Min Price</th>
                <th>Max Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.product_name}</td>
                  <td>{item.location}</td>
                  <td>{item.amount_available}</td>
                  <td>{item.low_price}</td>
                  <td>{item.high_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DisplayProduct;