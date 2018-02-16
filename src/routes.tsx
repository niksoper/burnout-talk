import * as React from "react";
import { Store } from "redux";
import { Shell } from "./views/shell";
import { HomeView } from "./views/home/home";
import { LoginView } from "./views/auth/login";
import { State } from "./redux/state";
import { RouterState, hashHistory, Route, IndexRoute } from "react-router";

export interface IRenderStore<TState> {
  store: Store<TState>
  waitForRender?: boolean
}

async function checkLoggedIn(rs: RouterState, s: IRenderStore<State>) {
  let userState = s.store.getState().user;
  if (!localStorage.getItem("accessToken")) {
    hashHistory.replace(`/login?returnUrl=${encodeURI(rs.location.pathname)}`)
  }
}

export function routesFactory(renderStore: IRenderStore<State>) {
  return (
    <Route path="/">
      <Route path="login" component={LoginView} />
      <Route component={Shell} onEnter={rs => checkLoggedIn(rs, renderStore)}>
        <IndexRoute component={HomeView} />
      </Route>
    </Route>
  )
}