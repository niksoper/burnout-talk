import { createStore, combineReducers, compose, applyMiddleware, Reducer, Store, GenericStoreEnhancer, StoreEnhancerStoreCreator, ReducersMapObject, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { hashHistory, createMemoryHistory } from "react-router";
import { routerMiddleware, syncHistoryWithStore, routerReducer } from "react-router-redux";

function getHistory() {
  if (typeof window === "undefined") {
    return createMemoryHistory();
  }

  return hashHistory;
}

function getWindowValue(key: string) {
  if (typeof window === "undefined") {
    return;
  }

  return window[key];
}

type ReduxSaga = () => Iterator<any>;

function configureStore<TState>(initialState: TState, useDevTools: boolean, history, sagaMiddleware, reducers: ReducersMapObject, middlewares: Middleware[]) {
  const devTools = (useDevTools && getWindowValue("devToolsExtension")) || (() => f => f);
  const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware, ...middlewares);
  const composed = compose<StoreEnhancerStoreCreator<TState>>(middleware, devTools());
  return createStore<TState>(combineReducers<TState>({ ...reducers, routing: routerReducer }), initialState, composed);
}

export const defaultStateVariable = "__REDUX_STATE__";
function createReduxStoreAndHistory<TState>(useDevTools: boolean, reduxStateWindowVariable: string, reducers: ReducersMapObject, middlewares: Middleware[], sagas: ReduxSaga[]) {
  const sagaMiddleware = createSagaMiddleware();
  const initialState = getWindowValue(reduxStateWindowVariable) as TState;
  const history = getHistory();
  const store = configureStore<TState>(initialState, useDevTools, history, sagaMiddleware, reducers, middlewares);
  sagas && sagas.forEach(s => sagaMiddleware.run(s));
  const syncedHistory = syncHistoryWithStore(history, store);
  return { store, history: syncedHistory };
}

export interface IStoreFactoryInit {
  useDevTools?: boolean;
  reduxStateWindowVariable?: string;
  reducers: ReducersMapObject;
  sagas: ReduxSaga[];
  middlewares?: Middleware[];
}

export class StoreFactory<TState> {
  constructor(private init: IStoreFactoryInit) {}
  createStoreAndHistory = () => {
    return createReduxStoreAndHistory<TState>(this.init.useDevTools, this.init.reduxStateWindowVariable || defaultStateVariable, this.init.reducers, this.init.middlewares, this.init.sagas);
  };

  createStore = () => {
    return this.createStoreAndHistory().store;
  };
}
