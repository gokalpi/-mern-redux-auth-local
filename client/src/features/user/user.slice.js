import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from './user.api';

// Actions
export const createUser = createAsyncThunk('users/create', async (data, { rejectWithValue }) => {
  try {
    const { email, password, name, role, avatar } = data;
    return await userApi.createUser(email, password, name, role, avatar);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteUser = createAsyncThunk('users/delete', async (id, { rejectWithValue }) => {
  try {
    return await userApi.deleteUser(id);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getUser = createAsyncThunk('users/get', async (id, { rejectWithValue }) => {
  try {
    return await userApi.getUser(id);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getUsers = createAsyncThunk('users/all', async (_, { rejectWithValue }) => {
  try {
    return await userApi.getAllUsers();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('users/update', async (data, { rejectWithValue }) => {
  try {
    const { id, email, password, name, role, avatar } = data;
    return await userApi.updateUser(id, email, password, name, role, avatar);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  users: [],
};

// Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },
    [createUser.rejected]: (state, { payload, error, meta }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      const { id, ...rest } = payload;
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== id);
    },
    [deleteUser.rejected]: (state, { payload, error, meta }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },
    [getUser.rejected]: (state, { payload, error, meta }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload.result;
    },
    [getUsers.rejected]: (state, { payload, error, meta }) => {
      state.isLoading = false;
      state.error = error.message;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { id, ...rest } = payload;
      const index = state.users.findIndex((user) => user.id === id);

      if (index >= 0) {
        state.users[index] = { id, ...rest };
      }
    },
    [updateUser.rejected]: (state, { payload, error, meta }) => {
      state.isLoading = false;
      state.error = error.message;
    },
  },
});

export const { reset } = userSlice.actions;

// Selectors
export const userSelector = (state) => state.user.user;
export const usersSelector = (state) => state.user.users;
export const isLoadingSelector = (state) => state.user.isLoading;
export const errorSelector = (state) => state.user.error;

export default userSlice.reducer;
