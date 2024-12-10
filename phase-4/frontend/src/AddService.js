import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function AddService() {
  const [formData, setFormData] = useState({
    ip_id: '',
    ip_long_name: '',
    ip_home_base: '',
    ip_manager: ''
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

    if (
      !formData.ip_id ||
      !formData.ip_long_name ||
      !formData.ip_home_base ||
      !formData.ip_manager
    ) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/add_service',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Service added successfully!');
        setFormData({
          ip_id: '',
          ip_long_name: '',
          ip_home_base: '',
          ip_manager: ''
        });
      } else {
        alert('Error adding service');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Add Delivery Service</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
        <label>
          <span>Service ID:</span>
          <input
            type="text"
            name="ip_id"
            value={formData.ip_id}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Service Name:</span>
          <input
            type="text"
            name="ip_long_name"
            value={formData.ip_long_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Home Base:</span>
          <input
            type="text"
            name="ip_home_base"
            value={formData.ip_home_base}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Manager Username:</span>
          <input
            type="text"
            name="ip_manager"
            value={formData.ip_manager}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Add Service
        </button>
      </form>
    </div>
  );
}

export default AddService;
