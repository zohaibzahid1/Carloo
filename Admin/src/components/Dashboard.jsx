import React from 'react';

const Dashboard = ({ children }) => {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your Carloo car rental platform</p>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default Dashboard;