import {
  compose,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';
import { createLogger } from 'redux-logger';
import customMiddlewares from '@/middlewares';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
  key: 'root',
  blacklist: ['form'],
  storage: AsyncStorage,
  debug: true, // to get useful logging
};

const middlewares = [...customMiddlewares];

middlewares.push(thunk);

// if (__DEV__) {
//   middlewares.push(createLogger({ timestamps: true, duration: true }));
// }

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

persistor.purge();

const configureStore = () => ({ persistor, store });

export default configureStore;
