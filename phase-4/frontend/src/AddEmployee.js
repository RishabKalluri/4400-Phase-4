import React, { useState } from 'react';
import axios from 'axios';
import './addemployee.css'; 

function AddEmployee() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    address: '',
    birthdate: '',
    taxID: '',
    hired: '',
    experience: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      ...formData,
      experience: parseInt(formData.experience),
      salary: parseInt(formData.salary)
    };

    if (isNaN(formDataToSubmit.experience) || formDataToSubmit.experience < 0) {
      alert('Experience must be greater than 0');
      return;
    }
    if (isNaN(formDataToSubmit.salary) || formDataToSubmit.salary <= 0) {
      alert('Salary must be greater than 0');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/add_employee', formDataToSubmit);
      if (response.data.success) {
        alert('Employee added successfully');
        setFormData({ 
          username: '',
          first_name: '',
          last_name: '',
          address: '',
          birthdate: '',
          taxID: '',
          hired: '',
          experience: '',
          salary: ''
        });
      } else {
        alert('Cannot add employee');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="AddEmployee">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="AddEmployee-form">
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Birthdate:
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
        </label>
        <label>
          Tax ID:
          <input type="text" name="taxID" value={formData.taxID} onChange={handleChange} required />
        </label>
        <label>
          Hired Date:
          <input type="date" name="hired" value={formData.hired} onChange={handleChange} required />
        </label>
        <label>
          Experience (years):
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
        </label>
        <label>
          Salary:
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </label>
        <button type="submit" className="AddEmployee-button">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
