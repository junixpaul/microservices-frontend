import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { UserServiceImpl } from '../../domain/usecases/UserService';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';

import { DataServiceImpl } from '../../domain/usecases/DataService';
import { DataRepositoryImpl } from '../../data/repositories/DataRepositoryImpl';

// import { Data } from '../../domain/entities/data';
// import { User } from '../../domain/entities/user';
// Define a type for the slice state
interface CounterState {
  loading: boolean;
  // data: Data[];
  user: Array<any>;
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  loading: false,
  // data: [],
  user: [],
  value: 0,
};

export const fetchList = createAsyncThunk('dataList/fetchList', async () => {

  const dataRepo = new DataRepositoryImpl();
  const dataService = new DataServiceImpl(dataRepo);
  const data = await dataService.GetData();
  return data;
});

export const register = createAsyncThunk('dataList/register', async (payload: any) => {
  const userRepo = new UserRepositoryImpl();
  const dataService = new UserServiceImpl(userRepo);
  const users = await dataService.Register(payload);
  return users;
});

export const login = createAsyncThunk('dataList/login', async (payload: any) => {
  const userRepo = new UserRepositoryImpl();
  const dataService = new UserServiceImpl(userRepo);
  const users = await dataService.Login(payload);
  return users;
});

export const forgotPassword = createAsyncThunk('dataList/forgotPassword', async (payload: any) => {
  const userRepo = new UserRepositoryImpl();
  const dataService = new UserServiceImpl(userRepo);
  const users = await dataService.ForgotPassword(payload);
  return users;
});

export const resetPassword = createAsyncThunk('dataList/resetPassword', async (payload: any) => {
  const userRepo = new UserRepositoryImpl();
  const dataService = new UserServiceImpl(userRepo);
  const users = await dataService.ResetPassword(payload);
  return users;
});

export const socialLogin = createAsyncThunk('dataList/socialLogin', async (payload: any) => {
  const userRepo = new UserRepositoryImpl();
  const dataService = new UserServiceImpl(userRepo);
  const users = await dataService.SocialLogin(payload);
  return users;
});



export const dataSlice = createSlice({
  name: 'dataList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    });
    builder.addCase(register.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(register.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    });
    builder.addCase(login.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(login.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    })

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    });
    builder.addCase(forgotPassword.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    })
  },
});

// Other code such as selectors can use the imported `RootState` type
export const data = (state: RootState) => state.user.user;

export default dataSlice.reducer;

// export const { increment, decrement, incrementByAmount } = dataSlice.actions
