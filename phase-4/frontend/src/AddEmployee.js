import React, { useState } from 'react';
import axios from 'axios';
import './addowner.css'; // Using the same styles as AddOwner

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      ...formData,
      experience: parseInt(formData.experience, 10),
      salary: parseInt(formData.salary, 10)
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
    <div className="AddOwner"> {/* Using the same className as AddOwner for styling */}
      <div className="AddOwner-link">
        <h3>Add an Employee</h3>
      </div>
      <form className="AddOwner-form" onSubmit={handleSubmit}>
        <label>
          <span>Username:</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>First Name:</span>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Last Name:</span>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Address:</span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Birthdate:</span>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Tax ID:</span>
          <input
            type="text"
            name="taxID"
            value={formData.taxID}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Hired Date:</span>
          <input
            type="date"
            name="hired"
            value={formData.hired}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Experience (years):</span>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Salary:</span>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="AddOwner-button"> {/* Using the same button style */}
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;

