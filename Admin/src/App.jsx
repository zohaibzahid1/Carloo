import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ReviewsPage from './pages/ReviewsPage';
import UsersPage from './pages/UsersPage';
import TodaysProfitPage from './pages/TodaysProfitPage';
import OverallProfitPage from './pages/OverallProfitPage';
import TransactionsPage from './pages/TransactionsPage';
import CarsPage from './pages/CarsPage';

function App() {
  const [activePage, setActivePage] = useState('reviews');

  const renderPage = () => {
    switch (activePage) {
      case 'users':
        return <UsersPage />;
      case 'todaysProfit':
        return <TodaysProfitPage />;
      case 'overallProfit':
        return <OverallProfitPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'cars':
        return <CarsPage />;
      default:
        return <ReviewsPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <Dashboard>{renderPage()}</Dashboard>
    </div>
  );
}

export default App;