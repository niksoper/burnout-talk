import { Reducer } from "redux";
import { UserState } from "./state";
import { createUserReducer } from "./core/userReducer";
import { LoginDux } from "./dux/login";

// used to ensure (at compile time) each dataReduce item is matched with UserState
const reducersMap: Record<keyof UserState, Reducer<UserState[keyof UserState]>> = {
  token: LoginDux.reducer
};

export const reducers = createUserReducer(reducersMap, "RESET-USER-DATA");
