import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import axios from 'axios';


export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (email, {rejectWithValue}) => {
        try {
            // Send a request to initiate the password reset process.
            const response = await axios.post('http://localhost:3000/api/forgotpassword/check-email', {email});

            return response.data; // Assuming you want to return the response data
        } catch (error) {
            if (!error.response) {
                // This is a network error
                return rejectWithValue({
                    message: 'Network error occurred'
                });
            }
            

            return rejectWithValue({ data: error.response.data, status: error.response.status} ); // Return the response data from the error
        }
    }, {
        serializeError: (error) => {
            if (error.message) {
                
                return error.message; // Return a message for network errors
            } else {
                return error; // Return the serialized error response data
            }
        },
    }
);

export const resendOtp = createAsyncThunk(
    'user/resendOtp',
    async (email) => {
        try {
            // Send a request to the server to resend the OTP.
            const response = await axios.post('http://localhost:3000/api/login/resend-otp', {
                email
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',

    initialState: {
        loading: false,
        success: false,
        error: null,
        //state properties to resendOtp
        resendLoading: false,
        resendSuccess: false,
        resendError: null,
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
                state.error = action;

            })


            .addCase(resendOtp.pending, (state) => {
                state.resendLoading = true;
                state.resendSuccess = false;
                state.resendError = null;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.resendLoading = false;
                state.resendSuccess = true;
                state.resendError = null;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.resendLoading = false;
                state.resendSuccess = false;
                state.resendError = action.error.message;
            });
    },
});

export default forgotPasswordSlice.reducer;