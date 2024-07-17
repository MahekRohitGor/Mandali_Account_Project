import React, { useState, useEffect } from 'react';
import { getPortfolio, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      const doc = new jsPDF();
      const content = document.getElementById('portfolio-content');

      // Use html2canvas to capture the content as an image
      const canvas = await html2canvas(content);
      const imageData = canvas.toDataURL('image/png');

      // Calculate PDF dimensions
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add image to PDF
      doc.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Download the PDF
      doc.save('portfolio.pdf');
    } catch (error) {
      console.error('Error creating PDF:', error);
      alert('Error creating PDF');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#F3F4F6',
      padding: '20px',
    },
    content: {
      maxWidth: '600px',
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      marginBottom: '20px',
      boxSizing: 'border-box',
    },
    heading: {
      textAlign: 'center',
      fontSize: '1.5rem',
      marginBottom: '20px',
      color: '#333333',
    },
    detail: {
      marginBottom: '10px',
    },
    logoutButton: {
      padding: '10px 20px',
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
      marginRight: '10px',
    },
    actionButton: {
      padding: '10px 20px',
      marginLeft: '20px',
      backgroundColor: '#6B7280',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    },
  };

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content} id="portfolio-content">
        <h2 style={styles.heading}>Loan Details</h2>
        <p style={styles.detail}><strong>Loan Amount:</strong> {portfolio.loanDetails.loanAmount}</p>
        <p style={styles.detail}><strong>School Name:</strong> {portfolio.loanDetails.schoolName}</p>
        <p style={styles.detail}><strong>Reason for Loan:</strong> {portfolio.loanDetails.reasonForLoan}</p>
        <div>
          <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
          <button style={styles.actionButton} onClick={handlePrint}>Print</button>
          <button style={styles.actionButton} onClick={handleDownloadPDF}>Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;