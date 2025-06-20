import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
    </div>
  );
}
