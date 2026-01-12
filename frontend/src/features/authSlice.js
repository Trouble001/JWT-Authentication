import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axios";


// Login User
export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8000/accounts/login/", data, { withCredentials: true });
    thunkAPI.dispatch(fetchUser());
    return res.data.message || "Login Successful!";
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
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
    const res = await axios.post("http://localhost:8000/accounts/register/", data);
    return res.data.message || "Registration Successfully!";
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
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
    const res = await axiosInstance.get("accounts/user/", { withCredentials: true });
    return res.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    } else if (err.response?.status === 401) {
      try {
        await axiosInstance.post("accounts/refresh/", {}, { withCredentials: true });
        const retry = await axiosInstance.get("accounts/user/", { withCredentials: true });
        return retry.data;
      } catch (refreshErr) {
        return thunkAPI.rejectWithValue(refreshErr.response?.data?.error || "Login Required");
      }
    }
    return thunkAPI.rejectWithValue("Server error");
  }
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (formData, thunkAPI) => {
  try {
    const res = await axiosInstance.patch("accounts/user/", formData, { 
      withCredentials: true,
      headers: { 
        "Content-Type": "multipart/form-data",
      }
    });
    return res.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
})

// Fetch All Users Admin
export const fetchAllUsers = createAsyncThunk("auth/fetchAllUsers", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/accounts/users/");
    return res.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch Single User Details Admin
export const fetchUserDetail = createAsyncThunk("auth/fetchUserDetail", async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/accounts/users/${id}`);
    return res.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Update User Admin
export const updateUser = createAsyncThunk("auth/updateUser", async ({id, userData}, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/accounts/users/${id}/`, userData);
    return res.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete User
export const deleteUser = createAsyncThunk('auth/deleteUser', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/accounts/users/${id}/`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    const errorData = err.response?.data;
    let message;
    if (typeof errorData === "object") {
      const field = Object.keys(errorData)[0];
      message = errorData[field];
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8000/accounts/logout/", {}, { withCredentials: true });
    return res.data.message || "Logged out";
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Logout failed");
  }
});


// Forgot Password
export const forgotPassword = createAsyncThunk("auth/forgot", async (email, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8000/accounts/forgot-password/", {email});
    return res.data.message || "Reset link sent to your email!";
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to sent reset link")
  }
});

// Reset Password
export const resetPassword = createAsyncThunk("auth/reset", async ({uid, token, password}, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8000/accounts/reset-password/", {uid, token, password});
    return res.data.message || "Password reset successful!";
  } catch (err) {
    if (!err.response) {
      return thunkAPI.rejectWithValue("No internet connection");
    }
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Password reset failed");
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userDetail: null,
    users: [],
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
    clearAuthMessages: (state) => {
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

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message || "Profile Updated";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Detail
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User Detail
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "User Updated";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "User Deleted";
        
        const deletedUserId = action.meta.arg;
        if (state.users) {
          state.users = state.users.filter((u) => u.id !== deletedUserId);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

export const { clearUser, clearAuthMessages } = authSlice.actions;
export default authSlice.reducer;
