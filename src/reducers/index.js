import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import profile from '@/features/profiling/reducers';
import auth from '@/features/authentication/reducers';

export default combineReducers({
  auth,
  profile,
  form: formReducer,
});
