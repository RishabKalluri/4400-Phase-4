import React, { useState } from 'react';
import axios from 'axios';
import './addowner.css'; 

function AddOwner() {
  const [formData, setFormData] = useState({
    ip_username: '',
    ip_first_name: '',
    ip_last_name: '',
    ip_address: '',
    ip_birthdate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/add_owner',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Owner added successfully!');
        setFormData({
          ip_username: '',
          ip_first_name: '',
          ip_last_name: '',
          ip_address: '',
          ip_birthdate: '',
        });
      } else {
        alert('Error adding owner');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="AddOwner">
      <h2>Business Supply</h2>
      <div className="AddOwner-link">
        <h3>Add a Business Owner</h3>
      </div>
      <form className="AddOwner-form" onSubmit={handleSubmit}>
        <label>
          <span>Username:</span>
          <input
            type="text"
            name="ip_username"
            value={formData.ip_username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>First Name:</span>
          <input
            type="text"
            name="ip_first_name"
            value={formData.ip_first_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Last Name:</span>
          <input
            type="text"
            name="ip_last_name"
            value={formData.ip_last_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Address:</span>
          <input
            type="text"
            name="ip_address"
            value={formData.ip_address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Birthdate:</span>
          <input
            type="date"
            name="ip_birthdate"
            value={formData.ip_birthdate}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="AddOwner-button">
          Add Owner
        </button>
      </form>
    </div>
  );
}

export default AddOwner;
