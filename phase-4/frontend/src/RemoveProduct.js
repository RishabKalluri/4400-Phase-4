import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function RemoveProduct() {
  const [formData, setFormData] = useState({
    ip_barcode: ''
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

    if (!formData.ip_barcode) {
      alert('Product barcode is required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/remove_product',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Product removed successfully!');
        setFormData({
          ip_barcode: ''
        });
      } else {
        alert('Error removing product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Remove Product</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="GeneralForm-button">
          Remove Product
        </button>
      </form>
    </div>
  );
}

export default RemoveProduct;