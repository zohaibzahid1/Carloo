import Blog from '../models/Blog.js';

// Get all blogs (public)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
    console.error(err);
  }
};

// Add a new blog (auth required)
export const createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    const ownerId = req.user; 
    const newBlog = await Blog.createNewBlog(blogData, ownerId);
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

// Delete a blog (auth required)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const ownerId = req.user; 
    // only delete if the blog belongs to the authenticated user
    if (blog.ownerId.toString() !== ownerId) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog' });
    console.error(err);
  }
};


// Get all blogs by a specific user (auth required)
export const getBlogsByUser = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const blogs = await Blog.find({ ownerId: userId });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs by user' });
    console.error(err);
  }
};
