import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function RemoveVan() {
  const [formData, setFormData] = useState({
    ip_id: '',
    ip_tag: ''
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

    if (!formDataToSubmit.ip_id || isNaN(formDataToSubmit.ip_tag)) {
      alert('All fields are required, and Van Tag must be a valid number.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/remove_van',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Van removed successfully!');
        setFormData({
          ip_id: '',
          ip_tag: ''
        });
      } else {
        alert('Error removing van');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Remove Van</h3>
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

        <button type="submit" className="GeneralForm-button">
          Remove Van
        </button>
      </form>
    </div>
  );
}

export default RemoveVan;