import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../../store/slices/blogSlice';

const BlogForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,error } = useSelector(state => state.blogs);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  useEffect(() => {
      if (error) {
        toast.error(error);
      }
    }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

  //   try {
  //     await axiosInstance.post('/blogs/add', formData);
  //     toast.success('Blog created successfully!');
  //     navigate('/blogs/myblogs');
  //   } catch (err) {

  //    const firstError = err.response?.data?.errors?.[0]?.msg;
  //    toast.error(firstError || "Failed to create blog");
  //   } finally {
  //     setLoading(false);
  //   }
    dispatch(addBlog(formData)).then(navigate('/blogs/myblogs'))
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