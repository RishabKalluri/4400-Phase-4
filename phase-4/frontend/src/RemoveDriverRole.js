import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function RemoveDriverRole() {
  const [formData, setFormData] = useState({
    ip_username: ''
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

    if (!formData.ip_username) {
      alert('Driver username is required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/remove_driver_role',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Driver role removed successfully!');
        setFormData({
          ip_username: ''
        });
      } else {
        alert('Error removing driver role');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Remove Driver Role</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
        <label>
          <span>Driver Username:</span>
          <input
            type="text"
            name="ip_username"
            value={formData.ip_username}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Remove Driver Role
        </button>
      </form>
    </div>
  );
}

export default RemoveDriverRole;