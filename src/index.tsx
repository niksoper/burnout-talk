import "./theme/theme.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, applyRouterMiddleware } from "react-router";
import { routesFactory } from "./routes";
import { Provider } from 'react-redux';
import { CoreSettings } from "./redux/coreSettings";
import { storeFactory } from "./redux/storeFactory";
import { setStore } from "./redux/store";

const storeAndHistory = storeFactory.createStoreAndHistory();
setStore(storeAndHistory.store);

const routerAttrs = { render: applyRouterMiddleware() }
ReactDOM.render((
  <Provider store={storeAndHistory.store}>
    <Router {...routerAttrs} history={storeAndHistory.history} routes={routesFactory({ store: storeAndHistory.store })} />
  </Provider>
), document.getElementById(CoreSettings.hostDomElementId));
