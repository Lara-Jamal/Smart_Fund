import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>SmartFund</h1>
      <p>Welcome to SmartFund React demo.</p>
      {user ? (
        <>
          <p>You are logged in as {user.email}.</p>
          <Link to="/profile">Go to Profile</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
