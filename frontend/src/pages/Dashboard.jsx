// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { FiMessageSquare, FiTrendingUp, FiUsers, FiClipboard } from 'react-icons/fi';
import { fetchDashboardData } from '../api/mockApi';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const posts = await fetchDashboardData();
        setData(posts);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const cardData = [
    { title: 'Total Posts', value: data ? data.length : 0, icon: <FiClipboard className="w-6 h-6" />, className: 'bg-white border-l-4 border-indigo-500' },
    { title: 'New Users', value: '124', icon: <FiUsers className="w-6 h-6" />, className: 'bg-white border-l-4 border-green-500' },
    { title: 'Avg. Engagement', value: '45%', icon: <FiTrendingUp className="w-6 h-6" />, className: 'bg-white border-l-4 border-yellow-500' },
    { title: 'Pending Comments', value: '8', icon: <FiMessageSquare className="w-6 h-6" />, className: 'bg-white border-l-4 border-red-500' },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Stats Cards (Data Visualization Widgets) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>

      {/* Data Table Widget (using fetched data) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Recent Posts (Mock API)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body Snippet</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.slice(0, 5).map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{post.body.substring(0, 70)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-500">Source: jsonplaceholder.typicode.com/posts</p>
      </div>
    </div>
  );
};

export default Dashboard;