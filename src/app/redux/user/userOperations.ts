import { API } from '@/app/helpers/API/API';
import { createAsyncThunk } from '@reduxjs/toolkit';

const registerUser = createAsyncThunk(
  'registerUser',
  async (credentials: IUser, { rejectWithValue }) => {
    try {
      const response = await API.register(credentials).then(data =>
        data?.json()
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const loginUser = createAsyncThunk(
  'loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.login(credentials).then(data => data?.json());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { registerUser, loginUser };
