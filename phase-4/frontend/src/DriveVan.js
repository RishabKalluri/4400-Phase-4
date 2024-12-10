import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function DriveVan() {
  const [formData, setFormData] = useState({
    ip_id: '',
    ip_tag: '',
    ip_destination: ''
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
      ip_tag: parseInt(formData.ip_tag, 10)
    };

    if (!formDataToSubmit.ip_id || isNaN(formDataToSubmit.ip_tag) || !formDataToSubmit.ip_destination) {
      alert('All fields are required and numeric values must be valid.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/drive_van',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Van moved to new destination successfully!');
        setFormData({
          ip_id: '',
          ip_tag: '',
          ip_destination: ''
        });
      } else {
        alert('Error moving van to destination');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Drive Van</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
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

        <label>
          <span>Van Tag:</span>
          <input
            type="number"
            name="ip_tag"
            value={formData.ip_tag}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Destination:</span>
          <input
            type="text"
            name="ip_destination"
            value={formData.ip_destination}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Drive Van
        </button>
      </form>
    </div>
  );
}

export default DriveVan;