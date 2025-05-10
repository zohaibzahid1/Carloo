import React from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { format } from 'date-fns';

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/blogs')}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blogs
          </button>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                  {blog.category}
                </span>
                <time className="text-sm text-gray-500">
                  {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                </time>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>

              <div className="prose max-w-none text-gray-700">
                {blog.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail; 