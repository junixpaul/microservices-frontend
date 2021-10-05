import { configureStore } from '@reduxjs/toolkit';
import { dataSlice } from './data/datasSlice'
// import { dataApi } from '../services/dataServices'
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    user: dataSlice.reducer,
    // posts: postReducer,
    // comments: commentReducer,
    // users: userReducer,
  },
})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
