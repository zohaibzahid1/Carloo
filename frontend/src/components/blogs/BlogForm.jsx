import React, { useState } from 'react';
import axiosInstance from '../../services/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/blogs/add', formData);
      toast.success('Blog created successfully!');
      navigate('/blogs/myblogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Create New Blog</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter blog title"
          className="w-full px-3 py-2 bg-white border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-white border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        >
          <option value="">Select a category</option>
          <option value="Travel">Travel</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Automotive">Automotive</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-900 mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          placeholder="Write your blog content here..."
          rows="6"
          className="w-full px-3 py-2 bg-white border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Blog'}
      </button>
    </form>
  );
};

export default BlogForm; 