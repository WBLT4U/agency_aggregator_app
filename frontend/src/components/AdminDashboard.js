import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/table.css';
import '../styles/login.css';

const AdminDashboard = () => {
  const [agencies, setAgencies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAgencyId, setSelectedAgencyId] = useState(null); // Track the selected agency ID
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    projects: 0,
  });

  // Fetch all agencies when the component mounts
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/agencies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgencies(response.data);
      } catch (error) {
        console.error('Failed to fetch agencies:', error);
        setError('Failed to fetch agencies.');
      }
    };

    fetchAgencies();
  }, []);

  // Fetch the selected agency data by ID when editing
  const handleEditToggle = async (agencyId) => {
    if (agencyId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/admin/agencies/${agencyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          name: response.data.agencyDetails.name,
          address: response.data.agencyDetails.address,
          contact: response.data.agencyDetails.contact,
          projects: response.data.agencyDetails.projects,
        });

        setSelectedAgencyId(agencyId); // Set the selected agency ID
        setIsEditing(true); // Enter editing mode
      } catch (error) {
        console.error('Error fetching agency data:', error);
        alert('Error fetching agency data');
      }
    } else {
      setIsEditing(false); // Exit editing mode
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save the updated agency profile
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/admin/agencies/${selectedAgencyId}`, // Update with the correct agency ID
        { agencyDetails: formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false); // Exit editing mode
      alert('Profile updated successfully');
      window.location.reload(); // Reload the page after update
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={isEditing ? 'login-page' : 'dashboard-page'}>
      <div className={isEditing ? 'login-form' : 'main-container'}>
        <h2>{isEditing ? 'Edit Company Profile' : 'Company Profile and Project Managed Dashboard'}</h2>
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
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <header>
              <h2>Admin Dashboard</h2>
            </header>
            <table>
              <thead>
                <tr>
                  <th>Agency Name</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Projects</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agencies.map((agency) => (
                  <tr key={agency._id}>
                    <td data-label="Agency Name">{agency.agencyDetails.name}</td>
                    <td data-label="Address">{agency.agencyDetails.address}</td>
                    <td data-label="Contact">{agency.agencyDetails.contact}</td>
                    <td data-label="Projects">{agency.agencyDetails.projects}</td>
                    <td data-label="Status">
                      {agency.isActive ? 'Active' : 'Inactive'}
                    </td>
                    <td data-label="Actions">
                      <div className="action-buttons">
                        <button onClick={() => handleEditToggle(agency._id)}>Edit Profile</button>
                        <button className="delete">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
