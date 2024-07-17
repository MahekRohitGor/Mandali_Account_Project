import React from 'react';
import Header from './Header';

const AboutUs = () => {
  return (
    <>
    <Header/>
    <div style={styles.container}>
      <h2 style={styles.heading}>About Us</h2>
      <p style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac sapien quis libero pretium
        tincidunt. Nulla facilisi.
      </p>
    </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    width: '90%',
    margin: 'auto',
    padding: '20px',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333333',
    textAlign: 'center',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555555',
  },
};

export default AboutUs;