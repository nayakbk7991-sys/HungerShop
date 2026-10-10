
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchUsers = useCallback(async () => {
    if (!user?.token) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/users', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch users');
      }

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (selectedUser) => {
    if (selectedUser._id === user?._id || selectedUser._id === user?.id) {
      setError('You cannot delete your own account while logged in.');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedUser.name} (${selectedUser.email})? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(selectedUser._id);
    setError('');
    setMessage('');

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/users/${selectedUser._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }

      setUsers((currentUsers) =>
        currentUsers.filter((u) => u._id !== selectedUser._id)
      );
      setMessage(data.message || 'User deleted successfully.');
    } catch (err) {
      setError(err.message || 'Error deleting user');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#f97316', marginBottom: '20px' }}>
        User Directory
      </h2>

      {error && (
        <p role="alert" style={errorStyle}>
          {error}
        </p>
      )}

      {message && (
        <p role="status" style={successStyle}>
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={rowStyle}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>NAME</th>
                <th style={thStyle}>EMAIL</th>
                <th style={thStyle}>ROLE</th>
                <th style={thStyle}>JOINED</th>
                <th style={thStyle}>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                const isCurrentUser =
                  u._id === user?._id || u._id === user?.id;

                return (
                  <tr key={u._id} style={rowStyle}>
                    <td style={tdStyle}>{u._id?.substring(0, 8)}...</td>
                    <td style={tdStyle}>{u.name}</td>
                    <td style={tdStyle}>{u.email}</td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background:
                            u.role === 'admin'
                              ? 'rgba(234,88,12,0.2)'
                              : 'rgba(16,185,129,0.2)',
                          color: u.role === 'admin' ? '#f97316' : '#10b981',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {(u.role || 'user').toUpperCase()}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      {u.createdAt &&
                      !isNaN(new Date(u.createdAt).getTime())
                        ? new Date(u.createdAt).toLocaleDateString('en-IN')
                        : u._id && /^[a-f\d]{24}$/i.test(u._id)
                          ? new Date(
                              parseInt(u._id.substring(0, 8), 16) * 1000
                            ).toLocaleDateString('en-IN')
                          : 'Date not recorded'}
                    </td>

                    <td style={tdStyle}>
                      <button
                        type="button"
                        disabled={isCurrentUser || deletingId === u._id}
                        onClick={() => handleDelete(u)}
                        style={{
                          ...deleteButtonStyle,
                          opacity:
                            isCurrentUser || deletingId === u._id ? 0.5 : 1,
                          cursor:
                            isCurrentUser || deletingId === u._id
                              ? 'not-allowed'
                              : 'pointer'
                        }}
                        title={
                          isCurrentUser
                            ? 'You cannot delete your own account'
                            : 'Delete user'
                        }
                      >
                        {deletingId === u._id
                          ? 'Deleting...'
                          : isCurrentUser
                            ? 'Current Admin'
                            : 'Delete'}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && !loading && (
                <tr>
                  <td style={tdStyle} colSpan={6}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '40px auto',
  padding: '30px',
  background: '#18181b',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.05)',
  color: '#fafafa'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const rowStyle = {
  borderBottom: '1px solid rgba(255,255,255,0.1)'
};

const thStyle = {
  padding: '15px',
  textAlign: 'left',
  color: '#a1a1aa',
  fontSize: '0.9rem'
};

const tdStyle = {
  padding: '15px',
  textAlign: 'left'
};

const deleteButtonStyle = {
  background: '#dc2626',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 12px',
  fontWeight: 'bold'
};

const errorStyle = {
  color: '#fca5a5',
  marginBottom: '15px'
};

const successStyle = {
  color: '#86efac',
  marginBottom: '15px'
};

export default AdminUsers;