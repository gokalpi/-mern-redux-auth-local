import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from './auth.api';

// Actions
export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const { email, password } = data;
    return await authApi.loginUser(email, password);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return await authApi.logoutUser();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const { email, password, name, role, avatar } = data;
    return await authApi.registerUser(email, password, name, role, avatar);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  error: null,
  user: null,
};

// Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const { reset } = authSlice.actions;

// Selectors
export const userSelector = (state) => state.auth.user;
export const isAuthenticatedSelector = (state) => state.auth.isAuthenticated;
export const isLoadingSelector = (state) => state.auth.isLoading;
export const errorSelector = (state) => state.auth.error;

export default authSlice.reducer;
