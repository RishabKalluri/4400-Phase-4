import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function AddVan() {
  const [formData, setFormData] = useState({
    ip_id: '',
    ip_tag: '',
    ip_fuel: '',
    ip_capacity: '',
    ip_sales: '',
    ip_driven_by: ''
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
      ip_tag: parseInt(formData.ip_tag, 10),
      ip_fuel: parseInt(formData.ip_fuel, 10),
      ip_capacity: parseInt(formData.ip_capacity, 10),
      ip_sales: parseInt(formData.ip_sales, 10)
    };

    if (
      !formDataToSubmit.ip_id ||
      isNaN(formDataToSubmit.ip_tag) ||
      isNaN(formDataToSubmit.ip_fuel) ||
      isNaN(formDataToSubmit.ip_capacity) ||
      isNaN(formDataToSubmit.ip_sales) ||
      !formDataToSubmit.ip_driven_by ||
      formDataToSubmit.ip_tag <= 0 ||
      formDataToSubmit.ip_fuel < 0 ||
      formDataToSubmit.ip_capacity <= 0 ||
      formDataToSubmit.ip_sales < 0
    ) {
      alert('All fields are required and numeric values must be positive');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/add_van',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Van added successfully!');
        setFormData({
          ip_id: '',
          ip_tag: '',
          ip_fuel: '',
          ip_capacity: '',
          ip_sales: '',
          ip_driven_by: ''
        });
      } else {
        alert('Error adding van');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Add Van</h3>
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
          <span>Tag:</span>
          <input
            type="number"
            name="ip_tag"
            value={formData.ip_tag}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Fuel:</span>
          <input
            type="number"
            name="ip_fuel"
            value={formData.ip_fuel}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Capacity:</span>
          <input
            type="number"
            name="ip_capacity"
            value={formData.ip_capacity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Sales:</span>
          <input
            type="number"
            name="ip_sales"
            value={formData.ip_sales}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Driven By (Driver Username):</span>
          <input
            type="text"
            name="ip_driven_by"
            value={formData.ip_driven_by}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Add Van
        </button>
      </form>
    </div>
  );
}

export default AddVan;
