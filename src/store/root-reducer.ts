import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/store/slices/auth/auth-slice';
import userReducer from '@/store/slices/user/user-slice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;