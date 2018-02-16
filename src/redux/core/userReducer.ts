import { combineReducers, Reducer, ReducersMapObject, AnyAction } from "redux";

export function createUserReducer(userMap: ReducersMapObject, resetUserAction: string): ReducersMapObject {
  const users = combineReducers(userMap)
  return {
    user: (s, a: AnyAction) => {
      return users(a.type === resetUserAction ? undefined : s, a)
    }
  }
}