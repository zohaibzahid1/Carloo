import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import axiosInstance from '../services/AxiosInterceptor';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await axiosInstance.get('/blogs/getuserblogs');
        setBlogs(response.data);
      } catch (err) {
        toast.error('Failed to fetch your blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axiosInstance.delete(`/blogs/del/${blogId}`);
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        toast.success('Blog deleted successfully');
      } catch (err) {
        toast.error('Failed to delete blog');
      }
    }
  };

  const handleReadMore = (blog) => {
    navigate(`/blog/${blog._id}`, { state: { blog } });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Blogs</h1>
          <div className="flex gap-4">
            <Link
              to="/blogs"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              All Blogs
            </Link>
            <Link
              to="/blogs/addblog"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Blog
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {blog.category}
                  </span>
                  <time className="text-sm text-gray-500">
                    {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                  </time>
                </div>
                
                <h2 className="text-xl font-semibold mb-3 line-clamp-2 text-blue-600">
                  {blog.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleReadMore(blog)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read More
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You haven't written any blogs yet.</p>
            <Link
              to="/blogs/myblogs"
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Write your first blog
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBlogs; 