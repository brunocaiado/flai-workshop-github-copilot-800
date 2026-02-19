import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const baseUrl = process.env.REACT_APP_CODESPACE_NAME 
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        
        const apiUrl = `${baseUrl}/api/users/`;
        console.log('Fetching users from:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Processed users data:', usersData);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info">Loading users...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-5">
      <h1 className="display-4 page-header">🦇 Gotham Heroes</h1>
      <div className="mb-3">
        <span className="badge bg-primary">Total Heroes: {users.length}</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  <div className="alert alert-info mb-0">No heroes found</div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id || user._id}>
                  <td><strong>🦸 {user.name || user.username || 'N/A'}</strong></td>
                  <td>{user.email}</td>
                  <td>📅 {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
