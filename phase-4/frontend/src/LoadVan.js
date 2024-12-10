import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function LoadVan() {
  const [formData, setFormData] = useState({
    ip_id: '',
    ip_tag: '',
    ip_barcode: '',
    ip_more_packages: '',
    ip_price: ''
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
      ip_more_packages: parseInt(formData.ip_more_packages, 10),
      ip_price: parseInt(formData.ip_price, 10)
    };

    if (
      !formDataToSubmit.ip_id ||
      isNaN(formDataToSubmit.ip_tag) ||
      !formDataToSubmit.ip_barcode ||
      isNaN(formDataToSubmit.ip_more_packages) ||
      formDataToSubmit.ip_more_packages <= 0 ||
      isNaN(formDataToSubmit.ip_price) ||
      formDataToSubmit.ip_price <= 0
    ) {
      alert('All fields are required and numeric values must be positive.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/load_van',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Van loaded successfully!');
        setFormData({
          ip_id: '',
          ip_tag: '',
          ip_barcode: '',
          ip_more_packages: '',
          ip_price: ''
        });
      } else {
        alert('Error loading van');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Load Van</h3>
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
          <span>Product Barcode:</span>
          <input
            type="text"
            name="ip_barcode"
            value={formData.ip_barcode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Additional Packages:</span>
          <input
            type="number"
            name="ip_more_packages"
            value={formData.ip_more_packages}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Price per Package:</span>
          <input
            type="number"
            name="ip_price"
            value={formData.ip_price}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Load Van
        </button>
      </form>
    </div>
  );
}

export default LoadVan;