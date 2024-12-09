import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function AddDriverRole() {
  const [formData, setFormData] = useState({
    ip_username: '',
    ip_licenseID: '',
    ip_license_type: '',
    ip_driver_experience: ''
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

    const formDataToSubmit = {
      ...formData,
      ip_driver_experience: parseInt(formData.ip_driver_experience, 10)
    };

    if (
      isNaN(formDataToSubmit.ip_driver_experience) ||
      formDataToSubmit.ip_driver_experience < 0
    ) {
      alert('Driver experience must be a non-negative integer');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/add_driver_role',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Driver role added successfully!');
        setFormData({
          ip_username: '',
          ip_licenseID: '',
          ip_license_type: '',
          ip_driver_experience: ''
        });
      } else {
        alert('Error adding driver role');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Add Driver Role</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
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
          <span>License ID:</span>
          <input
            type="text"
            name="ip_licenseID"
            value={formData.ip_licenseID}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>License Type:</span>
          <input
            type="text"
            name="ip_license_type"
            value={formData.ip_license_type}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Driver Experience (successful trips):</span>
          <input
            type="number"
            name="ip_driver_experience"
            value={formData.ip_driver_experience}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Add Driver Role
        </button>
      </form>
    </div>
  );
}

export default AddDriverRole;