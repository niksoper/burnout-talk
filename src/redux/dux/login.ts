import { call, put, takeEvery } from "redux-saga/effects";
import { Reducer } from "redux";
import { ActionsFactory } from "../core/actionsFactory";
import { hashHistory } from "react-router";
import { IData } from "../../api/api";
import { ILoginRequest } from "../../typings/app";

export namespace LoginDux {
  const dux = ActionsFactory.create(actionType => {
    return {
      logoutTry: actionType<{}>(),

      loginTry: actionType<{ data: ILoginRequest; returnUrl?: string }>(),
      loginSuccess: actionType<{ data: string }>(),
      loginFailure: actionType<{ error: any }>()
    };
  });

  export const actions = dux.creatorsFor({
    login: "loginTry",
    logout: "logoutTry"
  });

  function getInitialState() {
    // Check localstorage for token. If we have it, rebuild response state.
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      return { status: "loaded", data: { accessToken } } as any;
    }
    return {};
  }

  export const reducer = (state: IData<string> = getInitialState(), action: typeof dux.actionTypes.ref): IData<string> => {
    switch (action.type) {
      case dux.actions.loginTry.type:
        return { status: "loading" };
      case dux.actions.loginFailure.type:
        return { status: "error", error: action.error };
      case dux.actions.loginSuccess.type:
        return { status: "loaded", data: action.data };
      default:
        return state;
    }
  };

  function* loginSaga(action: typeof dux.actions.loginTry.typeRef) {
    try {
      debugger;
      // Do your get token calls up in here
      let token = "I_AM_A_TEST_TOKEN";
      yield localStorage.setItem("accessToken", token);
      yield put(dux.actions.loginSuccess.create({ data: token }));
      hashHistory.replace(action.returnUrl || "/");
    } catch (e) {
      console.error(e);
      yield put(dux.actions.loginFailure.create({ error: e.response.data.error }));
    }
  }

  function* logoutSaga(action: typeof dux.actions.logoutTry.typeRef) {
    yield localStorage.removeItem("accessToken");
    yield put({ type: "RESET-USER-DATA" });
    hashHistory.push("/login");
  }

  export function* saga() {
    yield takeEvery(dux.actions.loginTry.type, loginSaga);
    yield takeEvery(dux.actions.logoutTry.type, logoutSaga);
  }
}
