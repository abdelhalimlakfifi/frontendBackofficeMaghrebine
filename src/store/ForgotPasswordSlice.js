import {
    createAsyncThunk, createSlice
} from "@reduxjs/toolkit";

import axios from 'axios';


export const forgotPassword = createAsyncThunk(
'user/forgotPassword',
async (email) => {
    try {
    // Send a request to initiate the password reset process.
    const response = await axios.post('http://localhost:3000/api/login/forgot-password', {email});
    return response.data;

    } catch (error) {
        throw error;
    }
})

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',

    initialState: {
        loading: false,
        success: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
          .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
          })
          .addCase(forgotPassword.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
          })
          .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error.message;
          });
      },
});

export default forgotPasswordSlice.reducer;