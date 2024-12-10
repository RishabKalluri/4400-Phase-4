import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function StartFunding() {
  const [formData, setFormData] = useState({
    ip_owner: '',
    ip_amount: '',
    ip_long_name: '',
    ip_fund_date: ''
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
      ip_amount: parseInt(formData.ip_amount, 10)
    };

    if (
      !formDataToSubmit.ip_owner ||
      isNaN(formDataToSubmit.ip_amount) ||
      formDataToSubmit.ip_amount <= 0 ||
      !formDataToSubmit.ip_long_name ||
      !formDataToSubmit.ip_fund_date
    ) {
      alert('All fields are required and amount must be a positive number.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/start_funding',
        formDataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Funding started successfully!');
        setFormData({
          ip_owner: '',
          ip_amount: '',
          ip_long_name: '',
          ip_fund_date: ''
        });
      } else {
        alert('Error starting funding');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Start Funding</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
        <label>
          <span>Owner Username:</span>
          <input
            type="text"
            name="ip_owner"
            value={formData.ip_owner}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Amount:</span>
          <input
            type="number"
            name="ip_amount"
            value={formData.ip_amount}
            onChange={handleChange}
            required
          />
        </label>

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
          <span>Fund Date:</span>
          <input
            type="date"
            name="ip_fund_date"
            value={formData.ip_fund_date}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Start Funding
        </button>
      </form>
    </div>
  );
}

export default StartFunding;