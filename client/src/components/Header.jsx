import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <Link to="/about-us" style={styles.logo}>
        Shikshak Mandali
      </Link>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#4CAF50',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: '1.5rem',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Header;