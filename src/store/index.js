import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
// import watchFetchGit from '../sagas/fetchGitSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  
  const store = createStore(
    rootReducer,
    enhancer
  );
  // sagaMiddleware.run(watchFetchGit);
  return store;
};


export default configureStore;
