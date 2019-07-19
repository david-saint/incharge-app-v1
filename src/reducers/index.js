import { combineReducers } from 'redux';
import reminder from '@/features/pill/reducers';
import { reducer as formReducer } from 'redux-form';
import profile from '@/features/profiling/reducers';
import auth from '@/features/authentication/reducers';
import algorithm from '@/features/algorithm/reducers';

export default combineReducers({
  auth,
  profile,
  reminder,
  algorithm,
  form: formReducer,
});
