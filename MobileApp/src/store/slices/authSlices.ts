import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthState, LoginPayload, RegisterPayload} from '../../types/user';
import {authApi} from '../../api/authApi';

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  token: null,
};
// Thunk: gọi API login
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: LoginPayload) => {
    const res = await authApi.login(data);
    // Kiểm tra API trả về lỗi
    if ('isError' in res && res.isError) {
      // Throw error trực tiếp
      throw new Error(res.message || 'Đăng nhập thất bại');
    }
    return res.data; // AuthResponse
  },
);

// Thunk: gọi API register
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: RegisterPayload, {rejectWithValue}) => {
    try {
      const res = await authApi.register(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Đăng ký thất bại');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // register
      .addCase(registerThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
