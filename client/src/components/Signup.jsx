import React, { useState } from 'react';
import { signup } from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    loanAmount: '',
    schoolName: '',
    reasonForLoan: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, loanAmount, schoolName, reasonForLoan } = formData;
    const portfolio = {
      loanDetails: {
        loanAmount: Number(loanAmount),
        schoolName,
        reasonForLoan,
      },
    };
    try {
      await signup({ name, email, password, portfolio });
      alert('User registered successfully');
    } catch (error) {
      alert('Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      {/* <textarea name="bio" placeholder="Bio" onChange={handleChange}></textarea>
      <input type="text" name="projects" placeholder="Projects (comma separated)" onChange={handleChange} /> */}
      <input type="number" name="loanAmount" placeholder="Loan Amount" onChange={handleChange} required />
      <input type="text" name="schoolName" placeholder="School Name" onChange={handleChange} required />
      <input type="text" name="reasonForLoan" placeholder="Reason for Loan" onChange={handleChange} required />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
