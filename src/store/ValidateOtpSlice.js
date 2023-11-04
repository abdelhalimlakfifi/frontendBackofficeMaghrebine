import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const validateOTP = createAsyncThunk('otp/validate', async (otp, email) => {
    try {

      const response = await axios.post('http://localhost:3000/api/validate-otp', { otp, email });
      return response.data;

    } catch (error) {
      throw error;
    }
  });


  const otpReducerSlice = createSlice({
    name: 'otp',
    
    initialState: {
        loading: false,
        success: false,
        error: null,
    },

    extraReducers: (builder) => {
      builder
        .addCase(validateOTP.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        })
        .addCase(validateOTP.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        })
        .addCase(validateOTP.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.error.message;
        });
    },
  });
  
export default otpReducerSlice.reducer;