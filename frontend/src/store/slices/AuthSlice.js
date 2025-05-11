import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/AxiosInterceptor';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



// is used for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/authentication/login', credentials);
      // Store token in sessionStorage
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Let the component handle toast notifications
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: 'No response from server' });
      } else {
        return rejectWithValue({ message: 'Something went wrong' });
      }
    }
  }
);
// is used for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/authentication/register', userData);
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: 'No response from server' });
      } else {
        return rejectWithValue({ message: 'Something went wrong' });
      }
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: sessionStorage.getItem('token'),
  isAuthenticated: !!sessionStorage.getItem('token'),
  loading: false,
  error: null
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearErrors: (state) => {
      state.error = null;
    }
    
  },
  extraReducers: (builder) => {
    // Handle login actions
    builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user || {};
        
        toast.success('Login successful!');
    })
      .addCase(loginUser.rejected, (state, action) => {
       
        state.loading = false;
        state.error = action.payload;
      })
      // Handle registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user || {};
        toast.success('Registration successful!');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;