import React from 'react';
import Layout from '../components/layout/Layout';
import BlogForm from '../components/blogs/BlogForm';

const AddBlog = () => {
  console.log('AddBlog component rendered');
  console.log('----------------------------');
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8">Add New Blog</h1>
        <BlogForm />
      </div>
    </Layout>
  );
};

export default AddBlog; 