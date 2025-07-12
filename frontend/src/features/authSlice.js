import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";


// Login User
export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axios.post("login/", data, { withCredentials: true });
    thunkAPI.dispatch(fetchUser());
    return res.data.message || "Login Successful!";
  } catch (err) {
      const errorData = err.response?.data;
      let message = "Login failed. Please try again.";
      if (errorData?.error) {
        message = errorData.error;
      } else if (typeof errorData === "string") {
        message = errorData;
      }
      return thunkAPI.rejectWithValue(message);
  }
});

// Register User
export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const res = await axios.post("register/", data);
    return res.data.message || "Registration Successfully!";
  } catch (err) {
    const errorData = err.response?.data;
    let message = "Registration failed.";
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field][0];
    }
    return thunkAPI.rejectWithValue(message);
  }
})

// Fetch User
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get("user/", { withCredentials: true });
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      try {
        await axios.post("refresh/", {}, { withCredentials: true });
        const retry = await axios.get("user/", { withCredentials: true });
        return retry.data;
      } catch (refreshErr) {
        return thunkAPI.rejectWithValue(refreshErr.response?.data?.error || "Login Required");
      }
    }
    return thunkAPI.rejectWithValue("Fetch failed");
  }
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post("logout/", {}, { withCredentials: true });
    return res.data.message || "Logged out";
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Logout failed");
  }
});


// Forgot Password
export const forgotPassword = createAsyncThunk("auth/forgot", async (email, thunkAPI) => {
  try {
    const res = await axios.post("forgot-password/", {email});
    return res.data.message || "Reset link sent to your email!";
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to sent reset link")
  }
});

// Reset Password
export const resetPassword = createAsyncThunk("auth/reset", async ({uid, token, password}, thunkAPI) => {
  try {
    const res = await axios.post("reset-password/", {uid, token, password});
    return res.data.message || "Password reset successful!";
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Password reset failed");
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    message: null,
    error: null,
    isAuthChecked: false,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuthChecked = true;
      state.message = null;
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        // state.loading = true;
        state.isAuthChecked = false;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        // state.message = action.payload
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.user = null;
        state.error = action.payload;
        state.message = null;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })
  },
});

export const { clearUser, clearMessage } = authSlice.actions;
export default authSlice.reducer;
