import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/login.css';

const AgencyDashboard = () => {
  const [agency, setAgency] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    projects: 0,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/agency/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgency(res.data);
        setFormData({
          name: res.data.agencyDetails.name,
          address: res.data.agencyDetails.address,
          contact: res.data.agencyDetails.contact,
          projects: res.data.agencyDetails.projects,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);  // Toggle editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        'http://localhost:5000/api/agency/profile',
        { agencyDetails: formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);  // Exit editing mode
      alert('Profile updated successfully');
      window.location.reload();  // Reloads the page after clicking OK
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (!agency) return <p>Loading...</p>;

  return (
    <div className="login-form">
    <div className="main-container">
      <h2>Company Profile and Project Managed Dashboard</h2>
      {isEditing ? (
        
        <form onSubmit={handleSave}>
          
          <div>
            <label>Agency Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Projects Managed:</label>
            <input
              type="number"
              name="projects"
              value={formData.projects}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div >
          <p>Agency Name: {agency.agencyDetails.name}</p>
          <p>Address: {agency.agencyDetails.address}</p>
          <p>Contact: {agency.agencyDetails.contact}</p>
          <p>Projects Managed: {agency.agencyDetails.projects}</p>
        </div>
      )}
      <button onClick={handleEditToggle}>
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
    </div></div>
  );
};

export default AgencyDashboard;