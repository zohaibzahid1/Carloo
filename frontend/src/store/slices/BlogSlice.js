import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/AxiosInterceptor';
import { toast } from 'react-toastify';

// Thunk to fetch all blogs
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/blogs/getallblogs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);
// Thunk to fetch blogs by the logged-in user
export const fetchMyBlogs = createAsyncThunk(
  'blogs/fetchMyBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/blogs/getuserblogs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your blogs');
    }
  }
);
// Thunk to delete a blog
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/blogs/del/${blogId}`);
      return blogId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete blog');
    }
  }
);
// add blog
export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/blogs/add', blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add blog');
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    myBlogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Fetch all blogs  
    .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // My blogs
      .addCase(fetchMyBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.myBlogs = action.payload;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.myBlogs = state.myBlogs.filter(blog => blog._id !== action.payload);
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
        toast.success('Blog deleted successfully');
        fetchBlogs();
        fetchMyBlogs();
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // Add blog
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.myBlogs.unshift(action.payload);
        state.blogs.unshift(action.payload);
        toast.success('Blog added successfully');
        fetchBlogs();
        fetchMyBlogs();
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default blogSlice.reducer;