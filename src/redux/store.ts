import { Store } from "redux";
import { State } from "./state";

let store: Store<State>;

export function getStore(): Store<State> {
  return store;
}

export function setStore(s: Store<State>) {
  store = s;
}
