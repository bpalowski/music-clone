import { combineReducers } from 'redux';

import userReducer from './userReducer'
import musicReducer from './musicReducer'


const rootReducer = combineReducers({
  userData: userReducer,
  musicData: musicReducer
});

export default rootReducer


