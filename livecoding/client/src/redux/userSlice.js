import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./API";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    error: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const register = createAsyncThunk(
  "/user/register",
  async (user, { rejectwithvalue }) => {
    try {
      const res = await API.post("/register", user, {
        headers: {
          "Content-Type": "application/json",
          
        },
      });
      const data = await res.json();
      if (res.status === 400) {
        return rejectwithvalue(data.msg);
      }
      return data;
    } catch (err) {
      return rejectwithvalue(err.message);
    }
  }
);

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
