import React, { useState } from 'react';
import axios from 'axios';
import './generalized_form_css.css'; // Using the generalized form CSS

function AddWorkerRole() {
  const [formData, setFormData] = useState({
    ip_username: ''
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

    if (!formData.ip_username) {
      alert('Username is required');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/procedure/add_worker_role',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        alert('Worker role added successfully!');
        setFormData({
          ip_username: ''
        });
      } else {
        alert('Error adding worker role');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="GeneralForm"> {/* Using the generalized styling */}
      <div className="GeneralForm-link">
        <h3>Add Worker Role</h3>
      </div>
      <form className="GeneralForm-form" onSubmit={handleSubmit}>
        <label>
          <span>Username:</span>
          <input
            type="text"
            name="ip_username"
            value={formData.ip_username}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="GeneralForm-button">
          Add Worker Role
        </button>
      </form>
    </div>
  );
}

export default AddWorkerRole;