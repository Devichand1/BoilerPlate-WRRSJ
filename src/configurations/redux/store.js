import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import Api from 'utils/Api';
import combinedReducer from './reducers';

const persistStorage = localForage;
const isPresistanceRequired = false;
const apiInstance = new Api();

const persistConfig = {
  version: 0,
  key: 'ReactApp',
  storage: persistStorage,
  blacklist: [],
};

const persistedReducer = isPresistanceRequired
  ? persistReducer(persistConfig, combinedReducer)
  : combinedReducer;

const middlewares = [
  thunk.withExtraArgument({ apiInstance }), // Argument can be a request object used inside all calls
];

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
      });

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store, {}, () => {
  // This is called fater rehydraete is done.
  console.log('ReactApp store rehydrate done');
});

const purgeData = () => {
  return new Promise((resolve, reject) => {
    persistor
      .purge()
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error(false));
      });
  });
};

const flushData = () => {
  return new Promise((resolve, reject) => {
    persistor
      .flush()
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error(false));
      });
  });
};

const pausePersistance = () => {
  return new Promise((resolve, reject) => {
    persistor
      .pause()
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error(false));
      });
  });
};

const persistData = () => {
  return new Promise((resolve, reject) => {
    persistor
      .persist()
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error(false));
      });
  });
};

if (process.env.NODE_ENV !== 'production') {
  window.persistor = persistor;
}

export {
  store,
  persistor,
  purgeData,
  flushData,
  pausePersistance,
  persistData,
};
