import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function AddBusiness() {
  const [formData, setFormData] = useState({
    ip_long_name: '',
    ip_rating: '',
    ip_spent: '',
    ip_location: ''
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
      ip_rating: parseInt(formData.ip_rating, 10),
      ip_spent: parseInt(formData.ip_spent, 10)
    };

    if (
      !formDataToSubmit.ip_long_name ||
      isNaN(formDataToSubmit.ip_rating) ||
      formDataToSubmit.ip_rating < 1 ||
      formDataToSubmit.ip_rating > 5 ||
      isNaN(formDataToSubmit.ip_spent) ||
      formDataToSubmit.ip_spent < 0 ||
      !formDataToSubmit.ip_location
    ) {
      alert('All fields are required. Rating must be between 1 and 5, and spent must be a non-negative number.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/add_business',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Business added successfully!');
        setFormData({
          ip_long_name: '',
          ip_rating: '',
          ip_spent: '',
          ip_location: ''
        });
      } else {
        alert('Error adding business');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Add Business</h3>
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
          <span>Rating (1-5):</span>
          <input
            type="number"
            name="ip_rating"
            value={formData.ip_rating}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Spent:</span>
          <input
            type="number"
            name="ip_spent"
            value={formData.ip_spent}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Location:</span>
          <input
            type="text"
            name="ip_location"
            value={formData.ip_location}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Add Business
        </button>
      </form>
    </div>
  );
}

export default AddBusiness;
