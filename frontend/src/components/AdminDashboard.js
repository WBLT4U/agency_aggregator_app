import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/table.css';
import '../styles/login.css';

const AdminDashboard = () => {
  const [agencies, setAgencies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAgencyId, setSelectedAgencyId] = useState(null);
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
        // Handle error (e.g., show a notification)
      }
    };

    fetchAgencies();
  }, []);

  // Fetch the selected agency data by ID when editing
  const handleEditToggle = async (agencyId) => {
    if (agencyId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/admin/agency/${agencyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          name: response.data.agencyDetails.name,
          address: response.data.agencyDetails.address,
          contact: response.data.agencyDetails.contact,
          projects: response.data.agencyDetails.projects,
        });

        setSelectedAgencyId(agencyId);
        setIsEditing(true);
      } catch (error) {
        console.error('Error fetching agency data:', error);
        // Handle error (e.g., show a notification)
      }
    } else {
      setIsEditing(false);
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
      const response = await axios.put(
        `http://localhost:5000/api/admin/agency/${selectedAgencyId}`,
        { agencyDetails: formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setAgencies((prevAgencies) =>
          prevAgencies.map((agency) =>
            agency._id === selectedAgencyId ? { ...agency, agencyDetails: formData } : agency
          )
        );
        setFormData({ name: '', address: '', contact: '', projects: 0 });
        setIsEditing(false);
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (e.g., show a notification)
    }
  };

  const handleDelete = async (agencyId) => {
    console.log('Initiating delete request for agency ID:', agencyId); // Log the agency ID
  
    const confirmDelete = window.confirm('Are you sure you want to delete this agency?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:5000/api/admin/agency/${agencyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log('Delete response:', response.data); // Log the response
        if (response.data.message === 'Agency removed successfully') {
          alert('Agency deleted successfully');
          window.location.reload();
          // Optionally update state here to reflect deleted agency
        } else {
          alert('Failed to delete agency');
        }
      } catch (error) {
        console.error('Error during delete:', error.response?.data || error.message); // Log the error details
        alert('An error occurred while deleting the agency.');
      }
    }
  };


  // Toggle agency activation status
const handleToggleActivation = async (agencyId) => {
  try {
    const token = localStorage.getItem('token');
    const agency = agencies.find((agency) => agency._id === agencyId);
    const newStatus = !agency.isActive; // Toggle the status

    const response = await axios.put(
      `http://localhost:5000/api/admin/agency/${agencyId}/toggle`, // Use the toggle endpoint
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data) {
      setAgencies((prevAgencies) =>
        prevAgencies.map((agency) =>
          agency._id === agencyId ? { ...agency, isActive: newStatus } : agency
        )
      );
      alert(`Agency ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } else {
      alert('Failed to change agency status');
    }
  } catch (error) {
    console.error('Error toggling activation status:', error);
    // Handle error (e.g., show a notification)
  }
};

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
                        <button onClick={() => handleEditToggle(agency._id)}>Edit</button>
                        <button onClick={() => handleDelete(agency._id)}>Delete</button>
                        <button onClick={() => handleToggleActivation(agency._id)}>
                          {agency.isActive ? 'Deactivate' : 'Activate'}
                        </button>
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
