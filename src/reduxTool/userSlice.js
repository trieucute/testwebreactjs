import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../axios-client";
export  const fetchuserAdmin = createAsyncThunk("user/fecthusers", async () => {
  try {
      const user = await axiosClient.get("/user")
      return user.data
  } catch (error) {
      console.log(error);
  }
})


const userAdminSlice=createSlice({
  name: "userAdminSlice",
  initialState:[],
  reducers:{
    getAllUser:(state,action)=>{
     return state = action.payload;
    },
   
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      // const proId = action.payload;
      return state.filter((p) => p.id !== action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const UserId = updatedUser.id;

      return state.map((User) => {
        if (User.id === UserId) {
          return { ...User, ...updatedUser };
        }
        return User;
      });
    }
  }
})
export const { getAllUser,addUser, deleteUser, updateUser } =  userAdminSlice.actions;

export default  userAdminSlice.reducer;
