import Link from 'next/link';
import React from 'react';

const emailTemplate = (props) => {
  // console.log('props',props);
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Your New Password</h1>
      <p style={{ color: '#555', textAlign: 'center', marginBottom: '20px' }}>Hello {props.name},</p>
      <p style={{ color: '#555', textAlign: 'center', marginBottom: '20px' }}>Here is your new password:</p>
      <p style={{ color: '#007bff', fontSize: '24px', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>{props.randNum}</p>
      <p style={{ color: '#555', textAlign: 'center', marginBottom: '20px' }}>Please remember to change it after logging in for security reasons.</p>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link href="http://localhost:3000/admin" style={{ backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px', display: 'inline-block' }}>Login Now</Link>
      </div>
      <p style={{ color: '#555', textAlign: 'center', marginBottom: '20px' }}>Thank you!</p>
    </div>
  );
};

export default emailTemplate;
