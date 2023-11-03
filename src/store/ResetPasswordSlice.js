import {
    createAsyncThunk, createSlice
} from "@reduxjs/toolkit";

import axios from 'axios';

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ email, newPassword }) => {
      try {
        // Send a request to the server to reset the password.
        const response = await axios.post('http://localhost:3000/api/reset-password', { email, newPassword });
        return response.data;
      } catch (error) {
        throw error;
      } 
    }
)

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
      
    },
    extraReducers: (builder) => {
      builder
        
    },
  });
  
  export default resetPasswordSlice.reducer;