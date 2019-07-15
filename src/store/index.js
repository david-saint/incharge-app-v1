import {
  compose,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';
import { createLogger } from 'redux-logger';
import login from '@/features/login/middlewares';
import profiling from '@/features/profiling/middlewares';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import passwordreset from '@/features/password_reset/middlewares';
import auth from '@/features/authentication/middlewares/authCheck';

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true, // to get useful logging
};

const customMiddlewares = [auth, login, passwordreset, profiling];

const middlewares = [...customMiddlewares];

middlewares.push(thunk);

if (__DEV__) {
  middlewares.push(createLogger({ timestamps: true, duration: true }));
}

// TODO: define an initial state.
const initialState = {};

const reducers = persistReducer(config, rootReducer);

const enhancers = [applyMiddleware(...middlewares)];

const persistConfig = { enhancers };

/* eslint-disable no-undef */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(reducers, initialState, composeEnhancers(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  // console.log('Test', store.getState());
});

const configureStore = () => ({ persistor, store });

export default configureStore;
