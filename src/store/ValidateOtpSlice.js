import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const validateOTP = createAsyncThunk('otp/validate', async ({email, stringCode}, {rejectWithValue}) => {
    try {

        const response = await axios.post('http://localhost:3000/api/forgotpassword/check-otp', { email: email, otpCode:stringCode });
        return response.data;
    } catch (error) 
    {
        return rejectWithValue({ data: error.response.data, status: error.response.status} ); // Return the response data from the error
        throw error;
    }
},{
    serializeError: (error) => {
        if (error.message) {
            
            return error.message; // Return a message for network errors
        } else {
            return error; // Return the serialized error response data
        }
    },
}

);


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
                state.success = false; /// I want this have the response value
                state.error = null;
            })
            .addCase(validateOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
                state.error = null;
            })
            .addCase(validateOTP.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action;
            });
        },
    });

export default otpReducerSlice.reducer;