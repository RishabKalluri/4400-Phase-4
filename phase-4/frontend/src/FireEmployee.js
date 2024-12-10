import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function FireEmployee() {
  const [formData, setFormData] = useState({
    ip_username: '',
    ip_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ip_username || !formData.ip_id) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/fire_employee',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Employee fired successfully!');
        setFormData({
          ip_username: '',
          ip_id: ''
        });
      } else {
        alert('Error firing employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Fire Employee</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
        <label>
          <span>Employee Username:</span>
          <input
            type="text"
            name="ip_username"
            value={formData.ip_username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Delivery Service ID:</span>
          <input
            type="text"
            name="ip_id"
            value={formData.ip_id}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Fire Employee
        </button>
      </form>
    </div>
  );
}

export default FireEmployee;