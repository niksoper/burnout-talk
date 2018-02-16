import { Reducer } from "redux";

export namespace ActionsFactory {
  export type ActionIndicator<TType> = { type: TType };
  export type TypedAction<TAction, TType> = TAction & ActionIndicator<TType>;

  export type TypedActionCreator<TAction, TType> = { (action: TAction): TypedAction<TAction, TType> };

  export class ActionCreator<TAction, TType> {
    typeRef: TypedAction<TAction, TType>;
    constructor(public type: TType) {}

    create: TypedActionCreator<TAction, TType> = action => {
      return { type: this.type, ...action as any };
    };
  }

  export type Actions<T> = { [P in keyof T]: ActionCreator<T[P], P> };

  // export function getTypeFromCreator<A, B>(a: ActionCreators.TypedActionCreator<A, B>) {
  //   return {
  //     typeRef: undefined as ActionCreators.TypedAction<A, B>,
  //     type: a["_mapped_"] as B
  //   }
  // }

  interface IActionTypeRef<T> {
    /** only use to obtain the type of the action */
    ref: T[keyof T];
  }

  type TypedActions<TActions> = { [J in keyof TActions]: TypedAction<TActions[J], J> };

  type KeysToTypes<T> = { [key: string]: keyof T };

  class Action<TActions> {
    actionTypes: IActionTypeRef<TypedActions<TActions>>;
    //actionTypes1: IActionTypeRef<TypedActions<TActions>>["ref"]
    constructor(public actions: Actions<TActions>) {}
    creatorsFor = <F extends KeysToTypes<TActions>>(map: F) => {
      const pa = {} as { [J in keyof F]: TypedActionCreator<TActions[F[J]], F[J]> };
      Object.keys(map).map((k: keyof F) => {
        pa[k] = this.actions[map[k]].create;
        pa[k]["_mapped_"] = map[k];
      });
      return pa;
    };
  }

  export function create<TActions>(actions: (ofType: <T>() => T) => TActions) {
    return createAction(actions(actionTypeRef));
  }

  function createAction<TActions, A extends keyof TActions>(actions: TActions) {
    const dux: Actions<TActions> = {} as any;
    Object.keys(actions).map((k: A) => {
      dux[k] = new ActionCreator<TActions[A], A>(k);
    });
    return new Action(dux);
  }

  function actionTypeRef<T>(): T {
    return undefined as T;
  }
}
