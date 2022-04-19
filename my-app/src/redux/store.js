// import rootSlice from './reducer';
// import { RootState } from './root-reducer';
// import { createEpicMiddleware } from 'redux-observable';
// import { AnyAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { useDispatch, useSelector } from 'react-redux';
// import { useCallback } from 'react';

// const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

// const store = configureStore({
//   reducer: {
//     root : rootSlice,
//   },
//   middleware: [
//       ...getDefaultMiddleware({
//           //Turn-off warning immutableCheck, serializableCheck
//           immutableCheck: false,
//           serializableCheck: false
//       }),
//       epicMiddleware
//   ]
// });

// epicMiddleware.run(rootEpic);

// const AppDispatch = typeof store.dispatch;

// export const useDispatchRoot = () => {
//     const dispatch = useDispatch();
//     const funcMemo = useCallback((event) => {
//         dispatch(event);
//       }, [dispatch])
//     return funcMemo;
// }

// export const useSelectorRoot = (store) =>  {
//     return useSelector(store);
// }

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'

export default configureStore({
  reducer: {
    root: rootReducer,
  },
});
