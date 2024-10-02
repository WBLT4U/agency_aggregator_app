import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../components/AdminDashboard';
import AgencyDashboard from '../components/AgencyDashboard';
import Navbar from '../navbar/agencynavbar'
import '../components/index.css';

const Dashboard = () => {
  const [role, setRole] = useState(null);  // Stores the user role ('admin' or 'agency')
  const [loading, setLoading] = useState(true);  // Tracks the loading state
  const [error, setError] = useState(null);  // Tracks any errors during profile fetch
  const navigate = useNavigate();  // For programmatic navigation

  // Effect that runs on component mount to fetch user role
  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
   
    // If token is missing, redirect to login page
    if (!token) {
      navigate('/login');
    } else {
      const fetchUserProfile = async () => {
        try {
          // Make a request to the backend to fetch the user's profile
          const response = await axios.get('http://localhost:5000/api/agency/profile', {
            headers: { Authorization: `Bearer ${token}` },  // Send the JWT token in the Authorization header
          });
          setRole(response.data.role);  // Set the user's role (either 'admin' or 'agency')
          setLoading(false);  // Stop loading once the role is fetched
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError('Failed to fetch user role. Please try again.');
          setLoading(false);  // Stop loading if there is an error
        }
      };

      fetchUserProfile();  // Invoke the function to fetch profile data
    }
  }, [navigate]);  // Dependency array includes navigate, so this effect runs when component mounts or when navigate changes

  // Logout function to clear the token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    navigate('/login');  // Redirect to login page
  };

  // While fetching profile, show a loading message
  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  // If an error occurred during profile fetch, show the error message
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* Header with logout button */}
      <div><Navbar />
      <header>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {/* Main content area: Render AdminDashboard or AgencyDashboard based on user role */}
      <main>
        {role === 'admin' ? <AdminDashboard /> : <AgencyDashboard />}
      </main>
    </div></div>
  );
};

export default Dashboard;