// authSlice.js
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axiosClient from '../axios-client';


export const loginAdmin = createAsyncThunk('auth/loginAdmin', async ({ email, password }) => {
    try {
        const response = await axiosClient.post('/login', { email, password });
        // console.log(response.data);
        return response.data;
      } 
      catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Unauthorized: Invalid credentials');
        }
        throw new Error('Failed to log in');
      }
});
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (  token ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(config);
    const response = await axiosClient.get('/user/profile', config);
    // console.log('profile',response.data);
    return response.data;
  });
  export const logoutAdmin = createAsyncThunk('auth/logoutAdmin', async (  token ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(config);
    const response = await axiosClient.get('/logout', config);
    // console.log('profile',response.data);
    return response.data;
  });
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data:[],
    message:null,
    adminToken: null,
    role: null,
    profile: [],
    error: null,
    loading:false
  },

  reducers: {
    // Không cần thiết khi sử dụng createAsyncThunk
  },
  extraReducers: {
    [loginAdmin.pending]:( state) => {
        state.loading = true;
        state.error = null;
      },
      [loginAdmin.fulfilled]:(state,{payload})=>{

        state.adminToken = payload.data.access_token; // Change here to access the token correctly
        // localStorage.setItem('adminToken', state.adminToken)
        state.role = payload.data.role;
        state.data = payload.data;
        state.loading = false;
        state.message= payload.message
        // fetchUserProfile(state.adminToken)
      },
      [loginAdmin.rejected]: (state, action) => {
        state.loading = false;   
        state.adminToken = null;
        state.role = null;
        state.error = action.error.message;
        state.message= action.payload.message

      },
      [fetchUserProfile.pending]: (state) => {
        state.profile = 'loading';
        state.loading = false;
        state.error = null;
      },
      [fetchUserProfile.fulfilled]: (state, { payload }) => {
        state.profile = payload.data;
        state.role=payload.data.role
        if (payload.data.role === 'admin') {
            localStorage.setItem('adminToken', state.adminToken);
            
          }else{
            state.message='ko phải admin!!!'
          }
        state.loading = false;
      },
      [fetchUserProfile.rejected]: (state, action) => {
        state.profile = 'null';
        state.loading = false;
        state.error = action.error.message;

      },
      // [logoutAdmin.pending]:( state) => {
      //   state.loading = true;
      //   state.error = null;
      // },
      // [logoutAdmin.fulfilled]:(state,{payload})=>{

      //   // state.adminToken = payload.data.access_token; // Change here to access the token correctly
      //   localStorage.removeItem('adminToken', state.adminToken)
      //   state.role = payload.data.role;
      //   state.data = payload.data;
      //   state.loading = false;
      //   state.message= payload.message
      //   // fetchUserProfile(state.adminToken)
      // },
      // [logoutAdmin.rejected]: (state, action) => {
      //   state.loading = false;   
      //   state.adminToken = null;
      //   state.role = null;
      //   state.error = action.error.message;
      //   state.message= action.payload.message

      // },
  },
});

export default authSlice.reducer;
