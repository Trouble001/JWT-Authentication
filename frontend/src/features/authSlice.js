import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

let hasRefreshed = false;

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get("user/");
    hasRefreshed = false;
    return res.data;
  } catch (err) {
    if (err.response?.status === 401 && !hasRefreshed) {
      hasRefreshed = true;
      try {
        await axios.post("refresh/");
        const retry = await axios.get("user/");
        return retry.data;
      } catch {
        thunkAPI.dispatch(clearUser());
        return thunkAPI.rejectWithValue("Refresh failed");
      }
    }
    thunkAPI.dispatch(clearUser());
    return thunkAPI.rejectWithValue("Unauthenticated");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    isAuthChecked: false,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuthChecked = true;
      hasRefreshed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.isAuthChecked = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthChecked = true;
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
