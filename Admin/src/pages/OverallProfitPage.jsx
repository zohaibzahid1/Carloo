import React, { useState, useEffect } from 'react';


const OverallProfitPage = () => {
  const [profit, setProfit] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverallProfit = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/admin/overallprofit');
        
        if (!response.ok) throw new Error('Failed to fetch overall profit');
        const data = await response.json();
        console.log(data);
        
        setProfit(data.totalProfit || 0);
        
        setLoading(false);
      } catch (error) {
        setProfit(0);
        
        setLoading(false);
      }
    };
    fetchOverallProfit();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Overall Profit</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col items-center">
        <span className="text-gray-500 mb-2">Total Profit</span>
        <span className="text-4xl font-bold text-green-600">${profit.toLocaleString()}</span>
      </div>
     
    </div>
  );
};

export default OverallProfitPage;