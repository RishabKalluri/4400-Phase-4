import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function PurchaseProduct() {
  const [formData, setFormData] = useState({
    ip_long_name: '',
    ip_id: '',
    ip_tag: '',
    ip_barcode: '',
    ip_quantity: ''
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
      ip_quantity: parseInt(formData.ip_quantity, 10)
    };

    if (
      !formDataToSubmit.ip_long_name ||
      !formDataToSubmit.ip_id ||
      isNaN(formDataToSubmit.ip_tag) ||
      !formDataToSubmit.ip_barcode ||
      isNaN(formDataToSubmit.ip_quantity) ||
      formDataToSubmit.ip_quantity <= 0
    ) {
      alert('All fields are required, and numeric values must be positive.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/purchase_product',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Product purchased successfully!');
        setFormData({
          ip_long_name: '',
          ip_id: '',
          ip_tag: '',
          ip_barcode: '',
          ip_quantity: ''
        });
      } else {
        alert('Error purchasing product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Purchase Product</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
        <label>
          <span>Business Name:</span>
          <input
            type="text"
            name="ip_long_name"
            value={formData.ip_long_name}
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
          <span>Quantity:</span>
          <input
            type="number"
            name="ip_quantity"
            value={formData.ip_quantity}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Purchase Product
        </button>
      </form>
    </div>
  );
}

export default PurchaseProduct;