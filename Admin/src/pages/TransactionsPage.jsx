import React, { useState, useEffect } from 'react';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/admin/checkouts');
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();

      // Map API data to expected structure based on the provided response
      const transactionsFromApi = data.map((item) => ({
        id: item.id || item._id,
        customer: item.username, // No customer in response
        car: item.car || 'Unknown',
        amount: item.amount || 0,
        date: item.time,
        paymentMethod: 'Credit Card',
      }));

      setTransactions(transactionsFromApi);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  if (loading && !transactions.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Today's Transactions</h2>
          <p className="text-sm text-gray-500">
            {transactions.length} transactions - ${totalAmount.toFixed(2)} total
          </p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.car}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Credit Card</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {transactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;