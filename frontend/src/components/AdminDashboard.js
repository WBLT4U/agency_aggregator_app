import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [agencies, setAgencies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the list of agencies when the component is mounted
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/agencies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgencies(response.data); // Set the list of agencies to state
      } catch (err) {
        setError('Failed to fetch agencies.');
        console.error(err);
      }
    };

    fetchAgencies();
  }, []);

  // Handle toggling the activation status of an agency
  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/admin/agency/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgencies((prevAgencies) =>
        prevAgencies.map((agency) =>
          agency._id === id ? { ...agency, isActive: !agency.isActive } : agency
        )
      );
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert('Failed to toggle agency status.');
    }
  };

  // Handle deleting an agency
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/agency/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgencies(agencies.filter((agency) => agency._id !== id));
      alert('Agency deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to delete agency.');
    }
  };

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // If an error occurred while fetching agencies
  if (error) {
    return <p>{error}</p>;
  }

  // Render the list of agencies in a table
  return (
    <div className="main-container">
      <header>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
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
              <td>{agency.agencyDetails.name}</td>
              <td>{agency.agencyDetails.address}</td>
              <td>{agency.agencyDetails.contact}</td>
              <td>{agency.agencyDetails.projects}</td>
              <td>{agency.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleToggleStatus(agency._id)}>
                  {agency.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDelete(agency._id)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
