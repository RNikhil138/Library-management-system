import React, { useState } from 'react';
import {
  Users, BookOpen, Activity, FileText, UserCircle, Plus, Settings, BarChart2, Trash2, KeyRound, Bell, Database, ClipboardList, SunMoon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [successMessage, setSuccessMessage] = useState('');

  const [showRemoveUserForm, setShowRemoveUserForm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [removeUserData, setRemoveUserData] = useState({
    username: '',
    email: '',
    userId: '',
    reason: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const stats = [
    { title: 'Total Users', value: '150', icon: Users },
    { title: 'Total Books', value: '1,240', icon: BookOpen },
    { title: 'Active Loans', value: '45', icon: Activity },
    { title: 'Overdue Books', value: '12', icon: FileText },
  ];

  const handleAddBook = (e) => {
    e.preventDefault();
    setSuccessMessage('Book added successfully!');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setSuccessMessage('User added successfully!');
  };

  const handleRemoveUser = (e) => {
    e.preventDefault();
    setSuccessMessage(`User "${removeUserData.username}" removed successfully!`);
    setRemoveUserData({ username: '', email: '', userId: '', reason: '' });
    setShowRemoveUserForm(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSuccessMessage('Passwords do not match.');
      return;
    }
    setSuccessMessage('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowChangePassword(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'addBook':
        return (
          <form onSubmit={handleAddBook} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold">Add New Book</h3>
            <input type="number" placeholder="Book ID" className="w-full p-2 border rounded" required />
            <input type="text" pattern="[A-Za-z ]+" title="Only letters allowed" placeholder="Book Name" className="w-full p-2 border rounded" required />
            <input type="number" placeholder="ISBN Number" className="w-full p-2 border rounded" required />
            <input type="text" pattern="[A-Za-z ]+" title="Only letters allowed" placeholder="Author Name" className="w-full p-2 border rounded" required />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Book</button>
          </form>
        );

      case 'manageUsers':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User Statistics</h3>
              <ul className="space-y-2">
                <li>Total Users: 150</li>
                <li>Active Users: 120</li>
                <li>Inactive Users: 30</li>
                <li>New Signups (This Month): 20</li>
              </ul>
            </div>
            <form onSubmit={handleAddUser} className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h3 className="text-xl font-semibold">Add New User</h3>
              <input placeholder="Username" className="w-full p-2 border rounded" required />
              <input placeholder="Email" type="email" className="w-full p-2 border rounded" required />
              <input placeholder="Default Password" type="password" className="w-full p-2 border rounded" required />
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add User</button>
            </form>
          </div>
        );

      case 'viewReports':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Book Reports</h3>
            <ul className="space-y-2">
              <li>Books Loaned: 300</li>
              <li>Books Returned: 270</li>
              <li>Currently Issued: 30</li>
              <li>Overdue: 12</li>
            </ul>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>

            <div>
              <button
                onClick={() => setShowRemoveUserForm(!showRemoveUserForm)}
                className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md"
              >
                <Trash2 className="mr-2" size={18} />
                {showRemoveUserForm ? 'Hide Remove User Form' : 'Remove User'}
              </button>
              {showRemoveUserForm && (
                <form onSubmit={handleRemoveUser} className="space-y-3 mt-4">
                  <input placeholder="Username" className="w-full p-2 border rounded" value={removeUserData.username} onChange={(e) => setRemoveUserData({ ...removeUserData, username: e.target.value })} required />
                  <input placeholder="Email" type="email" className="w-full p-2 border rounded" value={removeUserData.email} onChange={(e) => setRemoveUserData({ ...removeUserData, email: e.target.value })} required />
                  <input placeholder="User ID" className="w-full p-2 border rounded" value={removeUserData.userId} onChange={(e) => setRemoveUserData({ ...removeUserData, userId: e.target.value })} required />
                  <input placeholder="Reason for removal" className="w-full p-2 border rounded" value={removeUserData.reason} onChange={(e) => setRemoveUserData({ ...removeUserData, reason: e.target.value })} required />
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">Remove User</button>
                </form>
              )}
            </div>

            <div>
              <button
                onClick={() => setShowChangePassword(!showChangePassword)}
                className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md"
              >
                <KeyRound className="mr-2" size={18} />
                {showChangePassword ? 'Hide Change Password' : 'Change Password'}
              </button>
              {showChangePassword && (
                <form onSubmit={handleChangePassword} className="space-y-3 mt-4">
                  <input type="password" placeholder="Current Password" className="w-full p-2 border rounded" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required />
                  <input type="password" placeholder="New Password" className="w-full p-2 border rounded" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
                  <input type="password" placeholder="Confirm New Password" className="w-full p-2 border rounded" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required />
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update Password</button>
                </form>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gray-100 rounded shadow">
                <Bell className="mr-3 text-gray-600" />
                <div>
                  <h4 className="font-semibold">Notification Preferences</h4>
                  <p className="text-sm text-gray-600">Manage email and SMS alerts</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-100 rounded shadow">
                <ClipboardList className="mr-3 text-gray-600" />
                <div>
                  <h4 className="font-semibold">System Logs</h4>
                  <p className="text-sm text-gray-600">Access recent activity logs</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-100 rounded shadow">
                <Database className="mr-3 text-gray-600" />
                <div>
                  <h4 className="font-semibold">Database Backup</h4>
                  <p className="text-sm text-gray-600">Download latest backup files</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-100 rounded shadow">
                <SunMoon className="mr-3 text-gray-600" />
                <div>
                  <h4 className="font-semibold">Theme Settings</h4>
                  <p className="text-sm text-gray-600">Toggle light/dark mode</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="text-blue-600" size={24} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Welcome to the Admin Dashboard</h3>
              <p className="text-gray-600 mt-2">Use the quick actions to manage books, users, and view reports.</p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={() => navigate('/profile')} className="flex items-center text-blue-600 hover:text-blue-800">
          <UserCircle className="mr-2" size={24} />
          Profile
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button onClick={() => { setActiveTab('addBook'); setSuccessMessage(''); }} className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200">
          <Plus className="inline-block mr-2" /> Add New Book
        </button>
        <button onClick={() => { setActiveTab('manageUsers'); setSuccessMessage(''); }} className="p-4 bg-green-100 rounded-lg hover:bg-green-200">
          <Users className="inline-block mr-2" /> Manage Users
        </button>
        <button onClick={() => { setActiveTab('viewReports'); setSuccessMessage(''); }} className="p-4 bg-purple-100 rounded-lg hover:bg-purple-200">
          <BarChart2 className="inline-block mr-2" /> View Reports
        </button>
        <button onClick={() => { setActiveTab('settings'); setSuccessMessage(''); }} className="p-4 bg-orange-100 rounded-lg hover:bg-orange-200">
          <Settings className="inline-block mr-2" /> Settings
        </button>
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow">
          {successMessage}
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
