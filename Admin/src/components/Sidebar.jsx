import React from 'react';
import { Car, Star, Users, DollarSign, BarChart, ShoppingCart } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'reviews', label: 'Reviews', icon: <Star size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'todaysProfit', label: "Today's Profit", icon: <DollarSign size={20} /> },
    { id: 'overallProfit', label: 'Overall Profit', icon: <BarChart size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <ShoppingCart size={20} /> },
    { id: 'cars', label: 'Cars', icon: <Car size={20} /> },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white h-full flex flex-col">
      <div className="p-5 border-b border-blue-800">
        <div className="flex items-center space-x-2">
          <Car size={24} className="text-blue-300" />
          <h1 className="text-xl font-bold">Carloo</h1>
        </div>
        <p className="text-sm text-blue-300 mt-1">Admin Dashboard</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                  activePage === item.id
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-800 text-sm text-blue-300">
        <p>© 2025 Carloo Admin</p>
      </div>
    </div>
  );
};

export default Sidebar;