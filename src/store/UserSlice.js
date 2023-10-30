import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser=createAsyncThunk(
    'user/login',
    async(userCridentials) => {
        const request = await axios.post('http://localhost:3000/api/login', userCridentials);
        const reponse = await request.data;

        console.log("Response =");
        console.log(request.data);
        localStorage.setItem('user', JSON.stringify(reponse));

        return reponse
    }
);
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers:(builder)=>{
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true,
                state.user = null,
                state.error = null
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false,
                state.user = action.payload,
                state.error = null
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                state.error = action.error.message
            })
    }
});


export default userSlice.reducer