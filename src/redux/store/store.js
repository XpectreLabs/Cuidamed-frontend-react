import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { LoginReducer, UserReducer, LoadingReducer } from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  loading: LoadingReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
