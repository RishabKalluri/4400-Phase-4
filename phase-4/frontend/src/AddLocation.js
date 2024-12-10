import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function AddLocation() {
  const [formData, setFormData] = useState({
    ip_label: '',
    ip_x_coord: '',
    ip_y_coord: '',
    ip_space: ''
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
      ip_x_coord: parseInt(formData.ip_x_coord, 10),
      ip_y_coord: parseInt(formData.ip_y_coord, 10),
      ip_space: parseInt(formData.ip_space, 10)
    };

    if (
      !formDataToSubmit.ip_label ||
      isNaN(formDataToSubmit.ip_x_coord) ||
      isNaN(formDataToSubmit.ip_y_coord) ||
      isNaN(formDataToSubmit.ip_space) ||
      formDataToSubmit.ip_space < 0
    ) {
      alert('All fields are required and numeric values must be valid.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/add_location',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Location added successfully!');
        setFormData({
          ip_label: '',
          ip_x_coord: '',
          ip_y_coord: '',
          ip_space: ''
        });
      } else {
        alert('Error adding location');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Add Location</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
        <label>
          <span>Label:</span>
          <input
            type="text"
            name="ip_label"
            value={formData.ip_label}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>X Coordinate:</span>
          <input
            type="number"
            name="ip_x_coord"
            value={formData.ip_x_coord}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Y Coordinate:</span>
          <input
            type="number"
            name="ip_y_coord"
            value={formData.ip_y_coord}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Space:</span>
          <input
            type="number"
            name="ip_space"
            value={formData.ip_space}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Add Location
        </button>
      </form>
    </div>
  );
}

export default AddLocation;