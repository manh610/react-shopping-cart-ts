import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store