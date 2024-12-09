import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function AddProduct() {
  const [formData, setFormData] = useState({
    ip_barcode: '',
    ip_name: '',
    ip_weight: ''
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
      ip_weight: parseInt(formData.ip_weight, 10)
    };

    if (
      !formDataToSubmit.ip_barcode ||
      !formDataToSubmit.ip_name ||
      isNaN(formDataToSubmit.ip_weight) ||
      formDataToSubmit.ip_weight <= 0
    ) {
      alert('All fields are required and weight must be a positive number');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/add_product',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Product added successfully!');
        setFormData({
          ip_barcode: '',
          ip_name: '',
          ip_weight: ''
        });
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Add Product</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
        <label>
          <span>Barcode:</span>
          <input
            type="text"
            name="ip_barcode"
            value={formData.ip_barcode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Product Name:</span>
          <input
            type="text"
            name="ip_name"
            value={formData.ip_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Weight:</span>
          <input
            type="number"
            name="ip_weight"
            value={formData.ip_weight}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;