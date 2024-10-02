// src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import '../styles/signup.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('agency');  // Default to agency
  const [agencyName, setAgencyName] = useState('');
  const [agencyAddress, setAgencyAddress] = useState('');
  const [agencyContact, setAgencyContact] = useState('');
  const [agencyProjects, setAgencyProjects] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare agencyDetails only if role is 'agency'
      const agencyDetails = role === 'agency' ? {
        name: agencyName,
        address: agencyAddress,
        contact: agencyContact,
        projects: agencyProjects
      } : null;

      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
        agencyDetails
      });

      // Store token and navigate to dashboard
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div><Navbar />
    <div className="register-form">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Common Fields */}
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="agency">Agency</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Conditional Agency Fields */}
        {role === 'agency' && (
          <>
            <div>
              <label>Agency Name</label>
              <input type="text" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} required />
            </div>
            <div>
              <label>Agency Address</label>
              <input type="text" value={agencyAddress} onChange={(e) => setAgencyAddress(e.target.value)} required />
            </div>
            <div>
              <label>Agency Contact</label>
              <input type="text" value={agencyContact} onChange={(e) => setAgencyContact(e.target.value)} required />
            </div>
            <div>
              <label>Number of Projects</label>
              <input type="number" value={agencyProjects} onChange={(e) => setAgencyProjects(e.target.value)} />
            </div>
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div></div>
  );
};

export default RegisterForm;