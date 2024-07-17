import React, { useState, useEffect } from 'react';
import { getPortfolio, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio();
        setPortfolio(data);
      } catch (error) {
        alert('Error fetching portfolio');
      }
    };

    fetchPortfolio();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Loan Details</h2>
      <p><strong>Loan Amount:</strong> {portfolio.loanDetails.loanAmount}</p>
      <p><strong>School Name:</strong> {portfolio.loanDetails.schoolName}</p>
      <p><strong>Reason for Loan:</strong> {portfolio.loanDetails.reasonForLoan}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Portfolio;